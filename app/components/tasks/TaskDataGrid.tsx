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
} from '@mui/x-data-grid';
import { 
  Checkbox, 
  Chip, 
  IconButton, 
  Box, 
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  SubdirectoryArrowRight as SubdirectoryIcon,
} from '@mui/icons-material';
import { useTaskStore, Task, useFilteredTasks } from '../../store/taskStore';
import { useApiGet, useApiPatch, useApiDelete, useApiPost } from '../../lib/api-hooks';
import { Loading, ConfirmDialog } from '../../components/ui';

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

/**
 * タスク一覧表示用のDataGridコンポーネント
 * MUI X DataGridを使用してタスクを表形式で表示します
 */
export function TaskDataGrid() {
  // タスクの状態管理
  const { selectedTaskListId, tasks, setTasks, openTaskModal } = useTaskStore();
  const filteredTasks = useFilteredTasks();
  
  // データグリッドの状態
  const [loading, setLoading] = useState(true);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'due', sort: 'asc' }
  ]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: []
  });

  // 削除確認ダイアログの状態
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // カスタムデータの状態
  const [taskCustomData, setTaskCustomData] = useState<Record<string, any>>({});

  // タスク一覧のデータ取得
  const { data, isLoading, refetch } = useApiGet<{ tasks: Task[] }>(
    `tasklists/${selectedTaskListId}/tasks`,
    ['tasks', selectedTaskListId ?? ''],
    { enabled: !!selectedTaskListId }
  );

  // タスクの完了状態を更新
  const updateTaskStatusMutation = useApiPatch<{ task: Task }, { status: 'needsAction' | 'completed' }>(
    `tasklists/${selectedTaskListId}/tasks/[taskId]/complete`,
    {
      onSuccess: () => refetch(),
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
      },
    }
  );

  // タスクを移動（順序変更）
  const moveTaskMutation = useApiPost<{ task: Task }, { direction: 'up' | 'down' }>(
    `tasklists/${selectedTaskListId}/tasks/${taskToDelete}/move`,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  // タスクのカスタムデータを一括取得
  const fetchTaskCustomData = async (tasks: Task[]) => {
    const customDataPromises = tasks.map(task => 
      fetch(`/api/tasks/custom/${task.id}`)
        .then(res => res.ok ? res.json() : { customData: null })
        .catch(() => ({ customData: null }))
    );
    
    const customDataResults = await Promise.all(customDataPromises);
    
    const customDataMap: Record<string, any> = {};
    customDataResults.forEach((result, index) => {
      if (result.customData) {
        customDataMap[tasks[index].id] = result.customData;
      }
    });
    
    setTaskCustomData(customDataMap);
  };

  // データが更新されたときの処理
  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
      fetchTaskCustomData(data.tasks);
      setLoading(false);
    }
  }, [data, setTasks]);

  // タスクリストIDが変更されたときの処理
  useEffect(() => {
    if (selectedTaskListId) {
      setLoading(true);
      refetch();
    }
  }, [selectedTaskListId, refetch]);

  // タスクの完了状態をトグル
  const toggleTaskStatus = (taskId: string, currentStatus: 'needsAction' | 'completed') => {
    const newStatus = currentStatus === 'completed' ? 'needsAction' : 'completed';
    
    // APIエンドポイントのURLを修正
    const url = `tasklists/${selectedTaskListId}/tasks/${taskId}/complete`;
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
    switch (priorityId) {
      case 3: return 'error'; // 高
      case 2: return 'warning'; // 中
      case 1: return 'success'; // 低
      default: return 'default';
    }
  };

  // 優先度名を取得
  const getPriorityName = (priorityId: number | null) => {
    if (!priorityId) return '未設定';
    switch (priorityId) {
      case 3: return '高';
      case 2: return '中';
      case 1: return '低';
      default: return '未設定';
    }
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
              />
            )}
            <Typography variant="body1">{params.value}</Typography>
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
          {params.value ? formatDate(params.value as string) : ''}
        </Typography>
      ),
      sortable: true,
    },
    {
      field: 'priority',
      headerName: '優先度',
      width: 120,
      renderCell: (params: GridRenderCellParams<Task>) => {
        const customData = taskCustomData[params.row.id];
        const priorityId = customData?.priorityId || null;
        
        return (
          <Chip 
            icon={<FlagIcon />} 
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
        const customData = taskCustomData[params.row.id];
        const tags = customData?.tags || [];
        
        if (tags.length === 0) {
          return (
            <Typography variant="body2" color="text.secondary">
              未設定
            </Typography>
          );
        }
        
        // 1つ目のタグのみ表示し、残りは数で表示
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              icon={<LabelIcon />} 
              label={tags[0]?.name || '未設定'} 
              size="small" 
              variant="outlined" 
            />
            {tags.length > 1 && (
              <Typography variant="caption" sx={{ ml: 1 }}>
                +{tags.length - 1}
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
          <Tooltip title="上へ移動">
            <IconButton 
              size="small" 
              onClick={() => moveTaskUp(params.row.id)}
            >
              <ArrowUpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="下へ移動">
            <IconButton 
              size="small" 
              onClick={() => moveTaskDown(params.row.id)}
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
          <Tooltip title="編集">
            <IconButton 
              size="small" 
              onClick={() => handleEditTask(params.row.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="削除">
            <IconButton 
              size="small" 
              onClick={() => openDeleteDialog(params.row.id)}
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
    return <Loading />;
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

  return (
    <>
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
            },
          }}
          getRowId={(row) => row.id}
        />
      </Box>

      {/* タスク削除確認ダイアログ */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteTask}
        title="タスクの削除"
        message="このタスクを削除してもよろしいですか？この操作は元に戻せません。"
        confirmText="削除"
        confirmColor="error"
        confirmLoading={deleteTaskMutation.isPending}
      />
    </>
  );
}

export default TaskDataGrid; 