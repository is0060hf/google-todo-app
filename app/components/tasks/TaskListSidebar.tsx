'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  FormatListBulleted as ListIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useTaskStore, TaskList } from '../../store/taskStore';
import { useApiGet, useApiPost, useApiPatch, useApiDelete } from '../../lib/api-hooks';
import { Loading } from '../../components/ui/Loading';
import { Modal } from '../../components/ui/Modal';

/**
 * タスクリストサイドバーコンポーネント
 * 
 * - タスクリスト一覧の表示
 * - タスクリストの選択
 * - タスクリスト追加・編集・削除機能
 */
export function TaskListSidebar() {
  // タスクリストの状態管理
  const { taskLists, selectedTaskListId, setTaskLists, setSelectedTaskListId } = useTaskStore();
  
  // タスクリスト操作用のモーダル状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentTaskList, setCurrentTaskList] = useState<TaskList | null>(null);
  const [taskListTitle, setTaskListTitle] = useState('');
  
  // コンテキストメニュー状態
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTaskListId, setMenuTaskListId] = useState<string | null>(null);

  // APIフック
  const { data, isLoading, refetch } = useApiGet<{ taskLists: TaskList[] }>('tasklists', ['tasklists']);
  
  const createTaskListMutation = useApiPost<{ taskList: TaskList }, { title: string }>('tasklists', {
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });
  
  const updateTaskListMutation = useApiPatch<{ taskList: TaskList }, { title: string }>(`tasklists/${currentTaskList?.id}`, {
    onSuccess: () => {
      refetch();
      closeModal();
    },
  });
  
  const deleteTaskListMutation = useApiDelete<{ success: boolean }, void>(`tasklists/${menuTaskListId}`, {
    onSuccess: () => {
      refetch();
      // 削除されたタスクリストが選択中だった場合、選択解除
      if (menuTaskListId === selectedTaskListId) {
        setSelectedTaskListId(null);
      }
      handleMenuClose();
    },
  });

  // タスクリストのデータ取得が完了したときの処理
  useEffect(() => {
    if (data?.taskLists) {
      setTaskLists(data.taskLists);
      
      // 選択中のタスクリストがない場合は最初のタスクリストを選択
      if (!selectedTaskListId && data.taskLists.length > 0) {
        setSelectedTaskListId(data.taskLists[0].id);
      }
    }
  }, [data, setTaskLists, selectedTaskListId, setSelectedTaskListId]);

  // モーダルを開く
  const openModal = (mode: 'create' | 'edit', taskList?: TaskList) => {
    setModalMode(mode);
    if (mode === 'edit' && taskList) {
      setCurrentTaskList(taskList);
      setTaskListTitle(taskList.title);
    } else {
      setCurrentTaskList(null);
      setTaskListTitle('');
    }
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskListTitle('');
    setCurrentTaskList(null);
  };

  // タスクリストを保存
  const saveTaskList = () => {
    if (!taskListTitle.trim()) return;
    
    if (modalMode === 'create') {
      createTaskListMutation.mutate({ title: taskListTitle.trim() });
    } else if (modalMode === 'edit' && currentTaskList) {
      updateTaskListMutation.mutate({ title: taskListTitle.trim() });
    }
  };

  // コンテキストメニューを開く
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, taskListId: string) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setMenuTaskListId(taskListId);
  };

  // コンテキストメニューを閉じる
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuTaskListId(null);
  };

  // タスクリストを編集
  const handleEditTaskList = () => {
    const taskList = taskLists.find((list: TaskList) => list.id === menuTaskListId);
    if (taskList) {
      openModal('edit', taskList);
    }
    handleMenuClose();
  };

  // タスクリストを削除
  const handleDeleteTaskList = () => {
    if (menuTaskListId) {
      deleteTaskListMutation.mutate();
    }
  };

  // ローディング中
  if (isLoading) {
    return (
      <Paper sx={{ width: 280, height: '100%', overflow: 'auto' }}>
        <Loading />
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: 280, height: '100%', overflow: 'auto' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">タスクリスト</Typography>
        <IconButton
          color="primary"
          size="small"
          onClick={() => openModal('create')}
          aria-label="新しいタスクリストを作成"
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <List>
        {taskLists.map((taskList: TaskList) => (
          <ListItem
            key={taskList.id}
            disablePadding
            secondaryAction={
              <IconButton 
                edge="end" 
                size="small"
                onClick={(e) => handleMenuOpen(e, taskList.id)}
              >
                <MoreIcon />
              </IconButton>
            }
          >
            <ListItemButton
              selected={selectedTaskListId === taskList.id}
              onClick={() => setSelectedTaskListId(taskList.id)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={taskList.title} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {taskLists.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">
              タスクリストがありません
            </Typography>
          </Box>
        )}
      </List>
      
      {/* タスクリストのコンテキストメニュー */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditTaskList}>編集</MenuItem>
        <MenuItem onClick={handleDeleteTaskList}>削除</MenuItem>
      </Menu>
      
      {/* タスクリスト作成・編集モーダル */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={modalMode === 'create' ? 'タスクリストを作成' : 'タスクリストを編集'}
        confirmText={modalMode === 'create' ? '作成' : '更新'}
        onConfirm={saveTaskList}
        confirmLoading={createTaskListMutation.isPending || updateTaskListMutation.isPending}
        confirmDisabled={!taskListTitle.trim()}
      >
        <TextField
          label="タスクリスト名"
          fullWidth
          value={taskListTitle}
          onChange={(e) => setTaskListTitle(e.target.value)}
          autoFocus
          margin="normal"
        />
      </Modal>
    </Paper>
  );
}

export default TaskListSidebar; 