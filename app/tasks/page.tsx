'use client';

import React from 'react';
import { Grid, Container, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskListSidebar from '../components/tasks/TaskListSidebar';
import TaskDataGrid from '../components/tasks/TaskDataGrid';
import TaskModal from '../components/tasks/TaskModal';
import { useTaskStore } from '../store/taskStore';

/**
 * タスク管理ページ
 * サイドバー、タスク一覧、モーダルを統合したレイアウト
 */
export default function TasksPage() {
  const { openTaskModal } = useTaskStore();

  return (
    <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 64px)' }}>
      <Box 
        sx={{
          display: 'flex',
          height: '100%',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        {/* サイドバー */}
        <Box sx={{ minWidth: 280, marginRight: 2 }}>
          <TaskListSidebar />
        </Box>

        {/* メインコンテンツ */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* ツールバー */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => openTaskModal('create')}
            >
              タスクを追加
            </Button>
          </Box>

          {/* タスク一覧 */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <TaskDataGrid />
          </Box>
        </Box>
      </Box>

      {/* タスク詳細・編集モーダル */}
      <TaskModal />
    </Container>
  );
} 