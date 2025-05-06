'use client';

import React, { useState } from 'react';
import { Grid, Container, Button, Box, useMediaQuery, Theme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskListSidebar from '../components/tasks/TaskListSidebar';
import TaskDataGrid from '../components/tasks/TaskDataGrid';
import TaskFilterBar, { FilterState } from '../components/tasks/TaskFilterBar';
import TaskModal from '../components/tasks/TaskModal';
import CustomDataManager from '../components/custom/CustomDataManager';
import { useTaskStore } from '../store/taskStore';

/**
 * タスク管理ページ
 * サイドバー、タスク一覧、モーダルを統合したレイアウト
 */
export default function TasksPage() {
  const { openTaskModal } = useTaskStore();
  const [filters, setFilters] = useState<FilterState>({
    priorityIds: [],
    tagIds: [],
    status: 'all',
    dueDate: 'all'
  });
  
  // 画面サイズに応じたレイアウト調整
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // フィルターの変更を処理
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // ここでフィルターをデータグリッドに適用する処理を追加
  };
  
  // サイドバーの表示/非表示切り替え
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 64px)' }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: '100%',
          padding: { xs: '8px', md: '16px' },
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* モバイル表示のサイドバートグルボタン */}
        {isMobile && (
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={toggleSidebar} 
            sx={{ mb: 1 }}
          >
            {sidebarOpen ? 'リストを閉じる' : 'リストを表示'}
          </Button>
        )}
        
        {/* サイドバー - モバイルでは条件付き表示 */}
        {(!isMobile || sidebarOpen) && (
          <Box 
            sx={{ 
              width: { xs: '100%', md: 280 }, 
              marginRight: { xs: 0, md: 2 },
              marginBottom: { xs: 2, md: 0 },
              height: { xs: 'auto', md: '100%' },
              overflowY: 'auto',
            }}
          >
            <TaskListSidebar />
            
            {/* カスタムデータ管理コンポーネント */}
            <Box sx={{ mt: 2, display: { xs: 'none', md: 'block' } }}>
              <CustomDataManager />
            </Box>
          </Box>
        )}

        {/* メインコンテンツ */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* フィルターバー */}
          <TaskFilterBar onFilterChange={handleFilterChange} />

          {/* ツールバー */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => openTaskModal('create')}
              size={isMobile ? 'small' : 'medium'}
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