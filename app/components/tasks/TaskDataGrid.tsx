'use client';

import React, { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridSortModel,
  GridToolbar,
  GridFilterModel,
  GridTreeNodeWithRender,
  GridRowParams,
} from '@mui/x-data-grid';
import { 
  Checkbox, 
  Chip, 
  IconButton, 
  Box, 
  Typography,
  Tooltip,
  useTheme,
  Button,
  CircularProgress,
  useMediaQuery,
  Theme,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  SubdirectoryArrowRight as SubdirectoryIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTaskStore, Task, useFilteredTasks } from '../../store/taskStore';
import { useApiGet, useApiPatch, useApiDelete, useApiPost } from '../../lib/api-hooks';
import { Loading, ConfirmDialog } from '../../components/ui';
import TaskCard from './TaskCard';

// 日付をフォーマットする関数
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// 型定義
interface TasksResponse {
  tasks: Task[];
  nextPageToken?: string;
}

interface TaskCustomDataRecord {
  [key: string]: any;
}

/**
 * タスク一覧表示用のDataGridコンポーネント
 * MUI X DataGridを使用してタスクを表形式で表示します
 * モバイル表示時はカード形式に切り替わります
 */
export function TaskDataGrid() {
  // タスクの状態管理
  const { 
    selectedTaskListId, 
    tasks, 
    setTasks, 
    openTaskModal,
    customData,
    setCustomData,
    priorities,
    tags
  } = useTaskStore();
  
  const filteredTasks = useFilteredTasks();
  const theme = useTheme();
  
  // データグリッドの状態
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'due', sort: 'asc' }
  ]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: []
  });
  
  // ページング状態
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadedAllData, setLoadedAllData] = useState(false);

  // 削除確認ダイアログの状態
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // 一度に取得するタスク数
  const maxResults = 50; // 一度に50件ずつ取得（API制限を考慮）

  // モバイル表示の判定
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // タスク一覧のデータ取得
  const { 
    data, 
    isLoading, 
    error: queryError, 
    refetch 
  } = useApiGet<TasksResponse>(
    `tasklists/${selectedTaskListId}/tasks`,
    ['tasks', selectedTaskListId ?? ''],
    { 
      enabled: !!selectedTaskListId,
      queryParams: {
        maxResults,
        pageToken: undefined, // 初期ロードは最初のページから
      },
      onSettled: (response?: TasksResponse, error?: Error) => {
        if (response && !error) {
          // nextPageTokenが存在する場合、まだデータがある
          setHasMoreData(!!response.nextPageToken);
          setNextPageToken(response.nextPageToken);
        }
        if (error) {
          setError(error.message);
        }
      }
    }
  );

  // 追加ページのデータ取得
  const { 
    data: additionalData,
    isLoading: isLoadingAdditional,
    error: additionalError,
    refetch: refetchAdditional
  } = useApiGet<TasksResponse>(
    `tasklists/${selectedTaskListId}/tasks`,
    ['tasks', selectedTaskListId ?? '', 'additional', nextPageToken ?? ''],
    {
      enabled: !!selectedTaskListId && !!nextPageToken && !loadedAllData && hasMoreData,
      queryParams: {
        maxResults,
        pageToken: nextPageToken,
      },
      onSettled: (response?: TasksResponse, error?: Error) => {
        if (response && !error) {
          // 追加データをマージ
          if (response.tasks && response.tasks.length > 0) {
            setTasks(prevTasks => [...prevTasks, ...response.tasks]);
            
            // カスタムデータも取得
            fetchTaskCustomData(response.tasks);
            
            // さらに次のページがあるかチェック
            setHasMoreData(!!response.nextPageToken);
            setNextPageToken(response.nextPageToken);
          } else {
            // もう追加データがない
            setHasMoreData(false);
            setLoadedAllData(true);
          }
        }
        if (error) {
          setError(`追加データの取得中にエラーが発生しました: ${error.message}`);
        }
        setIsLoadingMore(false);
      }
    }
  );

  // タスクの完了状態を更新
  const updateTaskStatusMutation = useApiPatch<{ task: Task }, { status: 'needsAction' | 'completed' }>(
    `tasklists/${selectedTaskListId}/tasks/[taskId]/complete`,
    {
      onSuccess: () => {
        refetch();
        setError(null);
      },
      onError: (error) => {
        setError(`タスクの状態更新に失敗しました: ${error.message}`);
      }
    }
  );

  // タスクを削除
  const deleteTaskMutation = useApiDelete<{ success: boolean }, void>(
    `tasklists/${selectedTaskListId}/tasks/${taskToDelete}`,
    {
      onSuccess: () => {
        refetch();
        setDeleteDialogOpen(false);
        setTaskToDelete(null);
        setError(null);
      },
      onError: (error) => {
        setError(`タスクの削除に失敗しました: ${error.message}`);
        setDeleteDialogOpen(false);
      }
    }
  );

  // タスクを移動（順序変更）
  const moveTaskMutation = useApiPost<{ task: Task }, { direction: 'up' | 'down' }>(
    `tasklists/${selectedTaskListId}/tasks/${taskToDelete}/move`,
    {
      onSuccess: () => {
        refetch();
        setError(null);
      },
      onError: (error) => {
        setError(`タスクの移動に失敗しました: ${error.message}`);
      }
    }
  );

  // タスクのカスタムデータを取得
  const fetchTaskCustomData = async (tasks: Task[]) => {
    try {
      // 並列リクエストを小さなバッチに分割して過負荷を防止
      const batchSize = 10;
      const batches = Array(Math.ceil(tasks.length / batchSize))
        .fill(0)
        .map((_, i) => tasks.slice(i * batchSize, (i + 1) * batchSize));
      
      for (const batch of batches) {
        const customDataPromises = batch.map(task => 
          fetch(`/api/tasks/custom/${task.id}`)
            .then(res => res.ok ? res.json() : { customData: null })
            .catch(() => ({ customData: null }))
        );
        
        const customDataResults = await Promise.all(customDataPromises);
        
        const customDataMap: Record<string, any> = {};
        customDataResults.forEach((result, index) => {
          if (result.customData) {
            customDataMap[batch[index].id] = result.customData;
          }
        });
        
        setCustomData(prevData => ({
          ...prevData,
          ...customDataMap
        } as typeof prevData));
      }
    } catch (err: any) {
      console.error('カスタムデータの取得に失敗しました:', err);
      setError('タスクの追加情報（優先度・タグ）の取得に失敗しました');
    }
  };

  // 追加データのロード処理
  const loadMoreTasks = () => {
    if (hasMoreData && !isLoadingMore && !loadedAllData) {
      setIsLoadingMore(true);
      refetchAdditional();
    }
  };

  // データが更新されたときの処理
  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
      fetchTaskCustomData(data.tasks);
      setLoading(false);
      
      // 最初のロード時に残りのデータがあるか確認
      if (data.nextPageToken) {
        setHasMoreData(true);
        setNextPageToken(data.nextPageToken);
      } else {
        setHasMoreData(false);
        setLoadedAllData(true);
      }
    }
  }, [data, setTasks]);

  // タスクリストIDが変更されたときの処理
  useEffect(() => {
    if (selectedTaskListId) {
      setLoading(true);
      setError(null);
      setHasMoreData(false);
      setNextPageToken(undefined);
      setLoadedAllData(false);
      refetch();
    }
  }, [selectedTaskListId, refetch]);

  // エラーハンドリング
  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
      setLoading(false);
    }
  }, [queryError]);

  // スクロールイベントの監視
  useEffect(() => {
    const handleScroll = () => {
      // 表示領域の下部に近づいたら追加データをロード
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMoreData &&
        !isLoadingMore &&
        !loadedAllData
      ) {
        loadMoreTasks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreData, isLoadingMore, loadedAllData]);

  // タスクの完了状態をトグル
  const toggleTaskStatus = (taskId: string, currentStatus: 'needsAction' | 'completed') => {
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    
    updateTaskStatusMutation.mutate({ status: newStatus }, {
      onSuccess: () => refetch(),
    });
  };

  // タスクを編集
  const handleEditTask = (taskId: string) => {
    openTaskModal('edit', taskId);
  };

  // タスク削除ダイアログを開く
  const openDeleteDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  // タスク削除を実行
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate();
    }
  };

  // タスク削除ダイアログを閉じる
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  // タスクを上に移動
  const moveTaskUp = (taskId: string) => {
    setTaskToDelete(taskId);
    moveTaskMutation.mutate({ direction: 'up' });
  };

  // タスクを下に移動
  const moveTaskDown = (taskId: string) => {
    setTaskToDelete(taskId);
    moveTaskMutation.mutate({ direction: 'down' });
  };

  // 優先度に基づいた表示色を取得
  const getPriorityColor = (priorityId: number | null) => {
    if (!priorityId) return 'default';
    
    const priority = priorities.find(p => p.id === priorityId);
    return priority?.color || 'default';
  };

  // 優先度名を取得
  const getPriorityName = (priorityId: number | null) => {
    if (!priorityId) return '未設定';
    
    const priority = priorities.find(p => p.id === priorityId);
    return priority?.name || '未設定';
  };

  // サブタスクの階層構造を構築
  const buildTaskHierarchy = (tasks: Task[]) => {
    const taskMap = new Map<string, Task & { children: string[] }>();
    
    // 最初にすべてのタスクをマップに追加し、children配列を初期化
    tasks.forEach(task => {
      taskMap.set(task.id, { ...task, children: [] });
    });
    
    // 親子関係を構築
    tasks.forEach(task => {
      if (task.parent) {
        const parentTask = taskMap.get(task.parent);
        if (parentTask) {
          parentTask.children.push(task.id);
        }
      }
    });
    
    // ルートタスク（親を持たないタスク）を取得
    const rootTasks = tasks.filter(task => !task.parent);
    
    // 階層構造を配列に変換
    const result: (Task & { depth: number })[] = [];
    
    // 再帰的にタスクを追加する関数
    const addTaskWithChildren = (taskId: string, depth: number) => {
      const task = taskMap.get(taskId);
      if (!task) return;
      
      result.push({ ...task, depth });
      
      task.children.forEach(childId => {
        addTaskWithChildren(childId, depth + 1);
      });
    };
    
    // ルートタスクから処理を開始
    rootTasks.forEach(task => {
      addTaskWithChildren(task.id, 0);
    });
    
    return result;
  };

  // 階層構造を持つタスクリスト
  const hierarchicalTasks = buildTaskHierarchy(filteredTasks);

  // 行のダブルクリックで編集モードを開く
  const handleRowDoubleClick = (params: GridRowParams) => {
    handleEditTask(params.id as string);
  };

  // データグリッドの列定義
  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: '状態',
      width: 80,
      renderCell: (params: GridRenderCellParams<Task & { depth: number }>) => (
        <Checkbox
          checked={params.row.status === 'completed'}
          onChange={() => toggleTaskStatus(params.row.id, params.row.status)}
          aria-label={params.row.status === 'completed' ? 'タスクを未完了に戻す' : 'タスクを完了にする'}
          inputProps={{ 
            'aria-describedby': `${params.row.id}-status-description` 
          }}
        />
      ),
      sortable: true,
    },
    {
      field: 'title',
      headerName: 'タイトル',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Task & { depth: number }>) => {
        const depth = params.row.depth || 0;
        
        return (
          <Box 
            sx={{ 
              textDecoration: params.row.status === 'completed' ? 'line-through' : 'none',
              color: params.row.status === 'completed' ? 'text.secondary' : 'text.primary',
              display: 'flex',
              alignItems: 'center',
              pl: depth * 2, // インデントでサブタスクを表現
            }}
          >
            {depth > 0 && (
              <SubdirectoryIcon 
                fontSize="small" 
                sx={{ mr: 1, color: 'text.secondary' }} 
                aria-hidden="true"
              />
            )}
            <Typography variant="body1">
              {params.value}
              {depth > 0 && <span className="visually-hidden">（サブタスク、階層レベル{depth}）</span>}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'due',
      headerName: '期限',
      width: 150,
      renderCell: (params: GridRenderCellParams<Task>) => (
        <Typography variant="body2">
          {params.value ? formatDate(params.value as string) : '未設定'}
        </Typography>
      ),
      sortable: true,
    },
    {
      field: 'priority',
      headerName: '優先度',
      width: 120,
      renderCell: (params: GridRenderCellParams<Task>) => {
        const taskCustomData = customData[params.row.id];
        const priorityId = taskCustomData?.priorityId || null;
        
        return (
          <Chip 
            icon={<FlagIcon aria-hidden="true" />} 
            label={getPriorityName(priorityId)} 
            size="small" 
            color={getPriorityColor(priorityId) as any}
            variant="outlined" 
          />
        );
      },
      sortable: true,
    },
    {
      field: 'tags',
      headerName: 'タグ',
      width: 150,
      renderCell: (params: GridRenderCellParams<Task>) => {
        const taskCustomData = customData[params.row.id];
        const tagIds = taskCustomData?.tags || [];
        
        if (tagIds.length === 0) {
          return (
            <Typography variant="body2" color="text.secondary">
              未設定
            </Typography>
          );
        }
        
        // タグIDからタグ名を取得
        const getTagName = (tagId: string) => {
          const tag = tags.find(t => t.id === tagId);
          return tag?.name || '不明なタグ';
        };
        
        // 1つ目のタグのみ表示し、残りは数で表示
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              icon={<LabelIcon aria-hidden="true" />} 
              label={getTagName(tagIds[0])} 
              size="small" 
              variant="outlined" 
            />
            {tagIds.length > 1 && (
              <Typography variant="caption" sx={{ ml: 1 }}>
                +{tagIds.length - 1}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: 'position',
      headerName: '順序',
      width: 80,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Task>) => (
        <Box>
          <Tooltip title="上へ移動 (Ctrl+↑)" placement="top">
            <IconButton 
              size="small" 
              onClick={() => moveTaskUp(params.row.id)}
              aria-label={`タスク「${params.row.title}」を上へ移動`}
              sx={{
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <ArrowUpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="下へ移動 (Ctrl+↓)" placement="top">
            <IconButton 
              size="small" 
              onClick={() => moveTaskDown(params.row.id)}
              aria-label={`タスク「${params.row.title}」を下へ移動`}
              sx={{
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <ArrowDownIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'アクション',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Task & { depth: number }>) => (
        <Box>
          <Tooltip title="編集 (Ctrl+E)" placement="top">
            <IconButton 
              size="small" 
              onClick={() => handleEditTask(params.row.id)}
              aria-label={`タスク「${params.row.title}」を編集`}
              sx={{
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="削除 (Ctrl+Del)" placement="top">
            <IconButton 
              size="small" 
              onClick={() => openDeleteDialog(params.row.id)}
              aria-label={`タスク「${params.row.title}」を削除`}
              sx={{
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // ローディング中
  if (loading || isLoading) {
    return <Loading aria-label="タスクデータを読み込み中" />;
  }

  // エラー表示
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setError(null);
            setLoading(true);
            refetch();
          }}
          sx={{ mt: 2 }}
        >
          再試行
        </Button>
      </Box>
    );
  }

  // タスクリストが選択されていない場合
  if (!selectedTaskListId) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          タスクリストを選択してください
        </Typography>
      </Box>
    );
  }

  // モバイル表示（カード形式）
  if (isMobile) {
    return (
      <>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            タスク一覧 ({hierarchicalTasks.length}件)
          </Typography>
        </Box>
        
        {hierarchicalTasks.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              タスクはありません
            </Typography>
          </Box>
        ) : (
          <Box>
            {hierarchicalTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                customData={customData}
                priorities={priorities}
                tags={tags}
                onStatusChange={toggleTaskStatus}
                onEdit={handleEditTask}
                onDelete={openDeleteDialog}
              />
            ))}
            
            {/* 追加データロード中の表示 */}
            {isLoadingMore && (
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  追加のタスクを読み込み中...
                </Typography>
              </Box>
            )}
            
            {/* もっと読み込むボタン */}
            {hasMoreData && !isLoadingMore && !loadedAllData && (
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={loadMoreTasks}
                  startIcon={<ExpandMoreIcon />}
                  fullWidth
                >
                  さらに読み込む
                </Button>
              </Box>
            )}
            
            {/* 全データ読み込み完了メッセージ */}
            {loadedAllData && tasks.length > maxResults && (
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  すべてのタスクを読み込みました（合計: {tasks.length}件）
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        {/* 削除確認ダイアログ */}
        <ConfirmDialog
          open={deleteDialogOpen}
          title="タスクの削除"
          message="このタスクを削除してもよろしいですか？この操作は元に戻せません。"
          confirmText="削除"
          cancelText="キャンセル"
          onConfirm={confirmDeleteTask}
          onCancel={closeDeleteDialog}
        />
      </>
    );
  }

  // デスクトップ表示（DataGrid）
  return (
    <>
      <div className="visually-hidden" id="keyboard-instructions">
        タスクの操作方法: ダブルクリックでタスクを編集、Tabキーと矢印キーで移動、Spaceキーでチェックボックスを切り替えられます。
      </div>
      <Box sx={{ height: 'calc(100vh - 180px)', width: '100%' }}>
        <DataGrid
          rows={hierarchicalTasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          checkboxSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { 
                debounceMs: 500,
              },
            },
          }}
          getRowId={(row) => row.id}
          aria-label="タスク一覧"
          aria-describedby="keyboard-instructions"
          onRowDoubleClick={handleRowDoubleClick}
          getRowClassName={(params) => {
            const taskCustomData = customData[params.id.toString()];
            const priorityId = taskCustomData?.priorityId || null;
            if (priorityId === 3) return 'task-priority-high';
            if (priorityId === 2) return 'task-priority-medium';
            if (priorityId === 1) return 'task-priority-low';
            return '';
          }}
          sx={{
            // フォーカス時のスタイルを強化
            '& .MuiDataGrid-cell:focus-within': {
              outline: `3px solid ${theme.palette.primary.main}`,
              outlineOffset: '-1px',
            },
            // キーボードナビゲーション時のセルの視認性向上
            '& .MuiDataGrid-cell.MuiDataGrid-cellFocused': {
              backgroundColor: theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.04)' 
                : 'rgba(255, 255, 255, 0.08)',
            },
          }}
          localeText={{
            noRowsLabel: 'タスクはありません',
            footerRowSelected: (count) => `${count}件のタスクを選択中`,
            columnMenuSortAsc: '昇順に並べ替え',
            columnMenuSortDesc: '降順に並べ替え',
            columnMenuUnsort: '並べ替えをクリア',
            columnMenuFilter: 'フィルター',
            columnMenuHideColumn: '列を非表示',
            columnMenuShowColumns: '列の表示を管理',
            toolbarQuickFilterLabel: 'タスクを検索',
            toolbarExport: 'エクスポート',
            toolbarExportCSV: 'CSVダウンロード',
            toolbarExportPrint: '印刷',
            toolbarFilters: 'フィルター',
            toolbarFiltersLabel: 'フィルターを表示',
            toolbarFiltersTooltipHide: 'フィルターを非表示',
            toolbarFiltersTooltipShow: 'フィルターを表示',
            toolbarDensity: '表示密度',
            toolbarDensityLabel: '表示密度',
            toolbarDensityCompact: '省スペース',
            toolbarDensityStandard: '標準',
            toolbarDensityComfortable: '広々',
            toolbarColumns: '列',
            toolbarColumnsLabel: '列の選択',
          }}
        />
        
        {/* 追加データロード中の表示 */}
        {isLoadingMore && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              追加のタスクを読み込み中...
            </Typography>
          </Box>
        )}
        
        {/* もっと読み込むボタン - スクロールで自動読み込みしない場合の手動ロード用 */}
        {hasMoreData && !isLoadingMore && !loadedAllData && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Button 
              variant="outlined" 
              onClick={loadMoreTasks}
              startIcon={<ExpandMoreIcon />}
            >
              さらに読み込む
            </Button>
          </Box>
        )}
        
        {/* 全データ読み込み完了メッセージ */}
        {loadedAllData && tasks.length > maxResults && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              すべてのタスクを読み込みました（合計: {tasks.length}件）
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* 削除確認ダイアログ */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="タスクの削除"
        message="このタスクを削除してもよろしいですか？この操作は元に戻せません。"
        confirmText="削除"
        cancelText="キャンセル"
        onConfirm={confirmDeleteTask}
        onCancel={closeDeleteDialog}
      />
    </>
  );
}

export default TaskDataGrid; 