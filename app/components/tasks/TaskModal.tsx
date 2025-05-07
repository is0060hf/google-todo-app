'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Chip,
  Stack,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
  SubdirectoryArrowRight as SubdirectoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import ja from 'date-fns/locale/ja';
import { Modal } from '../../components/ui/Modal';
import { useTaskStore, Task, Priority, Tag } from '../../store/taskStore';
import { useApiGet, useApiPost, useApiPatch } from '../../lib/api-hooks';
import { PrioritySelector } from '../custom/PrioritySelector';
import { TagSelector } from '../custom/TagSelector';

interface TaskFormData {
  title: string;
  notes: string;
  due: Date | null;
  status: 'needsAction' | 'completed';
  priorityId: number | null;
  tags: string[];
  parent: string | null;
}

// タスクの深さの最大値（サブタスクのネスト制限）
const MAX_TASK_DEPTH = 5;

/**
 * タスク詳細表示・編集・作成用のモーダルコンポーネント
 */
export function TaskModal() {
  // タスクストアからの状態
  const { 
    isTaskModalOpen, 
    modalMode, 
    selectedTaskId, 
    selectedTaskListId,
    getTaskById,
    closeTaskModal,
    priorities,
    tags,
    tasks,
  } = useTaskStore();

  // フォームの状態
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    notes: '',
    due: null,
    status: 'needsAction',
    priorityId: null,
    tags: [],
    parent: null,
  });

  // サブタスクの状態
  const [subTasks, setSubTasks] = useState<Task[]>([]);

  // API呼び出し用フック
  const { refetch: refetchTasks } = useApiGet<{ tasks: Task[] }>(
    `tasklists/${selectedTaskListId}/tasks`,
    ['tasks', selectedTaskListId ?? ''],
    { enabled: false }
  );

  const { data: taskCustomData, refetch: refetchCustomData } = useApiGet<{ customData: any }>(
    `tasks/custom/${selectedTaskId}`,
    ['taskCustomData', selectedTaskId ?? ''],
    { enabled: !!selectedTaskId }
  );

  // タスク作成・更新のミューテーション
  const createTaskMutation = useApiPost<{ task: Task }, any>(
    `tasklists/${selectedTaskListId}/tasks`,
    {
      onSuccess: () => {
        refetchTasks();
        closeTaskModal();
      }
    }
  );

  const updateTaskMutation = useApiPatch<{ task: Task }, any>(
    `tasklists/${selectedTaskListId}/tasks/${selectedTaskId}`,
    {
      onSuccess: () => {
        refetchTasks();
        closeTaskModal();
      }
    }
  );

  const updateCustomDataMutation = useApiPatch<{ customData: any }, any>(
    `tasks/custom/${selectedTaskId}`,
    {
      onSuccess: () => {
        refetchCustomData();
      }
    }
  );

  // サブタスクの取得・設定
  useEffect(() => {
    if (selectedTaskId && tasks.length > 0) {
      // 選択されたタスクのサブタスクを取得
      const childTasks = tasks.filter(task => task.parent === selectedTaskId);
      setSubTasks(childTasks);
    } else {
      setSubTasks([]);
    }
  }, [selectedTaskId, tasks]);

  // タスクが選択されたとき、そのデータをフォームに設定
  useEffect(() => {
    if (selectedTaskId && modalMode !== 'create') {
      const task = getTaskById(selectedTaskId);
      if (task) {
        setFormData({
          title: task.title || '',
          notes: task.notes || '',
          due: task.due ? new Date(task.due) : null,
          status: task.status as 'needsAction' | 'completed',
          priorityId: null, // カスタムデータから取得
          tags: [], // カスタムデータから取得
          parent: task.parent || null,
        });
      }
    } else {
      // 新規作成モードの場合はフォームをリセット
      setFormData({
        title: '',
        notes: '',
        due: null,
        status: 'needsAction',
        priorityId: null,
        tags: [],
        parent: null,
      });
    }
  }, [selectedTaskId, modalMode, getTaskById]);

  // カスタムデータが取得されたときの処理
  useEffect(() => {
    if (taskCustomData?.customData) {
      setFormData(prevState => ({
        ...prevState,
        priorityId: taskCustomData.customData.priorityId || null,
        tags: taskCustomData.customData.tags || [],
      }));
    }
  }, [taskCustomData]);

  // フォームの入力値変更ハンドラ
  const handleChange = (field: keyof TaskFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // サブタスクの編集
  const handleEditSubTask = (taskId: string) => {
    closeTaskModal();
    setTimeout(() => {
      // 現在のモーダルを閉じた後に、サブタスクのモーダルを開く
      useTaskStore.getState().openTaskModal('edit', taskId);
    }, 100);
  };

  // サブタスクの追加
  const handleAddSubTask = () => {
    closeTaskModal();
    setTimeout(() => {
      // サブタスク作成モードでモーダルを開く
      const state = useTaskStore.getState();
      state.openTaskModal('create');
      
      // 親タスク情報を事前設定
      setFormData(prev => ({
        ...prev,
        parent: selectedTaskId,
      }));
    }, 100);
  };

  // 選択可能な親タスク一覧を取得（ネスト階層制限を考慮）
  const getSelectableParentTasks = () => {
    if (!selectedTaskListId) return [];
    
    // 選択可能な階層を確認する関数
    const getTaskDepth = (taskId: string, depth = 0): number => {
      if (depth >= MAX_TASK_DEPTH) return MAX_TASK_DEPTH;
      
      const task = tasks.find(t => t.id === taskId);
      if (!task || !task.parent) return depth;
      
      return getTaskDepth(task.parent, depth + 1);
    };
    
    // 現在のタスクと同じリストに属するタスク
    const tasksInSameList = tasks.filter(task => 
      task.taskListId === selectedTaskListId && 
      task.id !== selectedTaskId && // 自分自身は除外
      getTaskDepth(task.id) < MAX_TASK_DEPTH - 1 // 深さ制限を超えるタスクは除外
    );
    
    // 循環参照を防ぐ
    // 選択中のタスクの子孫は親として選択できない
    const isDescendantOf = (taskId: string, potentialAncestorId: string): boolean => {
      const task = tasks.find(t => t.id === taskId);
      if (!task || !task.parent) return false;
      if (task.parent === potentialAncestorId) return true;
      
      return isDescendantOf(task.parent, potentialAncestorId);
    };
    
    return tasksInSameList.filter(task => 
      !selectedTaskId || !isDescendantOf(task.id, selectedTaskId)
    );
  };

  // タスクの保存処理
  const handleSaveTask = async () => {
    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title.trim(),
      notes: formData.notes.trim(),
      due: formData.due ? formData.due.toISOString() : null,
      status: formData.status,
      parent: formData.parent,
    };

    const customData = {
      priorityId: formData.priorityId,
      tags: formData.tags,
    };

    try {
      // タスクの作成・更新
      if (modalMode === 'create') {
        const result = await createTaskMutation.mutateAsync(taskData);
        if (result?.task?.id) {
          // 新規作成したタスクのカスタムデータを更新
          await updateCustomDataMutation.mutateAsync(customData);
        }
      } else {
        // タスクの更新
        await updateTaskMutation.mutateAsync(taskData);
        // カスタムデータの更新
        await updateCustomDataMutation.mutateAsync(customData);
      }
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  // モーダルのタイトル
  const modalTitle = {
    create: 'タスクを作成',
    edit: 'タスクを編集',
    view: 'タスクの詳細',
  }[modalMode];

  // 選択可能な親タスク
  const selectableParents = getSelectableParentTasks();

  return (
    <Modal
      open={isTaskModalOpen}
      onClose={closeTaskModal}
      title={modalTitle}
      confirmText={modalMode !== 'view' ? '保存' : undefined}
      onConfirm={modalMode !== 'view' ? handleSaveTask : undefined}
      confirmDisabled={!formData.title.trim()}
      confirmLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
      maxWidth="md"
      description={modalMode === 'create' ? 'タスクを作成して追加します' : modalMode === 'edit' ? 'タスクの詳細を編集します' : ''}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <Box sx={{ p: 1 }}>
          <Grid container spacing={3}>
            {/* タイトル */}
            <Grid item xs={12}>
              <TextField
                label="タイトル"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                disabled={modalMode === 'view'}
                aria-required="true"
                aria-label="タスクのタイトル"
              />
            </Grid>

            {/* メモ */}
            <Grid item xs={12}>
              <TextField
                label="メモ"
                fullWidth
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                disabled={modalMode === 'view'}
                aria-label="タスクのメモ"
              />
            </Grid>

            {/* 期限日 */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="期限日"
                value={formData.due}
                onChange={(date) => handleChange('due', date)}
                disabled={modalMode === 'view'}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    inputProps: {
                      'aria-label': '期限日',
                    }
                  } 
                }}
              />
            </Grid>

            {/* 優先度 */}
            <Grid item xs={12} sm={6}>
              <PrioritySelector
                value={formData.priorityId}
                onChange={(value) => handleChange('priorityId', value)}
                disabled={modalMode === 'view'}
              />
            </Grid>

            {/* 親タスク選択 */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="parent-task-label">親タスク</InputLabel>
                <MuiSelect
                  labelId="parent-task-label"
                  id="parent-task-select"
                  value={formData.parent || ''}
                  onChange={(e) => handleChange('parent', e.target.value === '' ? null : e.target.value)}
                  disabled={modalMode === 'view'}
                  label="親タスク"
                  aria-label="親タスクを選択"
                >
                  <MenuItem value="">なし (最上位タスク)</MenuItem>
                  {selectableParents.map((task) => (
                    <MenuItem key={task.id} value={task.id}>
                      {task.title}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </Grid>

            {/* タグ */}
            <Grid item xs={12}>
              <TagSelector
                value={formData.tags}
                onChange={(value) => handleChange('tags', value)}
                disabled={modalMode === 'view'}
              />
            </Grid>

            {/* 状態 */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.status === 'completed'}
                    onChange={(e) => handleChange('status', e.target.checked ? 'completed' : 'needsAction')}
                    disabled={modalMode === 'view'}
                    aria-label="タスク完了状態"
                  />
                }
                label="完了済み"
              />
            </Grid>

            {/* サブタスク一覧 (編集・表示モードでのみ表示) */}
            {(modalMode === 'edit' || modalMode === 'view') && selectedTaskId && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    サブタスク
                  </Typography>
                  
                  {subTasks.length > 0 ? (
                    <List aria-label="サブタスク一覧">
                      {subTasks.map((subTask) => (
                        <ListItem
                          key={subTask.id}
                          secondaryAction={
                            modalMode !== 'view' && (
                              <Box>
                                <Tooltip title="編集">
                                  <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={() => handleEditSubTask(subTask.id)}
                                    aria-label={`サブタスク「${subTask.title}」を編集`}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )
                          }
                        >
                          <SubdirectoryIcon 
                            fontSize="small" 
                            sx={{ mr: 1, color: 'text.secondary' }} 
                            aria-hidden="true"
                          />
                          <ListItemText
                            primary={subTask.title}
                            primaryTypographyProps={{
                              style: {
                                textDecoration: subTask.status === 'completed' ? 'line-through' : 'none',
                              },
                            }}
                            secondary={subTask.due ? formatDate(subTask.due) : '期限なし'}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary">
                      サブタスクはありません
                    </Typography>
                  )}
                  
                  {modalMode === 'edit' && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="サブタスクを追加">
                        <IconButton 
                          color="primary"
                          onClick={handleAddSubTask}
                          aria-label="サブタスクを追加"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
}

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

export default TaskModal; 