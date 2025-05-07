'use client';

import React, { useState } from 'react';
import { 
  Grid, 
  Container, 
  Button, 
  Box, 
  useMediaQuery, 
  Theme, 
  IconButton,
  Tooltip,
  Fab
} from '@mui/material';
import { 
  Add as AddIcon,
  FilterAlt as FilterIcon 
} from '@mui/icons-material';
import TaskListSidebar from '../components/tasks/TaskListSidebar';
import TaskDataGrid from '../components/tasks/TaskDataGrid';
import TaskFilterBar from '../components/tasks/TaskFilterBar';
import LazyTaskModal from '../components/tasks/LazyTaskModal';
import CustomDataManager from '../components/custom/CustomDataManager';
import FilterDrawer from '../components/tasks/FilterDrawer';
import { useTaskStore } from '../store/taskStore';

/**
 * タスク管理ページ
 * サイドバー、タスク一覧、モーダルを統合したレイアウト
 */
export default function TasksPage() {
  const { openTaskModal } = useTaskStore();
  
  // 画面サイズに応じたレイアウト調整
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  // サイドバーの表示/非表示切り替え
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // フィルタードロワーの表示/非表示切り替え
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
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
          position: 'relative',
        }}
      >
        {/* モバイル表示のサイドバートグルボタン */}
        {isMobile && (
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={toggleSidebar} 
            sx={{ mb: 1 }}
            aria-expanded={sidebarOpen}
            aria-controls="task-list-sidebar"
          >
            {sidebarOpen ? 'リストを閉じる' : 'リストを表示'}
          </Button>
        )}
        
        {/* サイドバー - モバイルでは条件付き表示 */}
        {(!isMobile || sidebarOpen) && (
          <Box 
            id="task-list-sidebar"
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
        <Box sx={{ 
          flexGrow: 1, 
          height: { xs: 'auto', md: '100%' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* フィルターバー - モバイルではドロワーを使用 */}
          {!isSmall && <TaskFilterBar />}
          
          {/* タスク一覧 */}
          <TaskDataGrid />
          
          {/* モバイル表示のフィルターボタン */}
          {isSmall && (
            <Fab 
              color="primary" 
              aria-label="フィルターを開く"
              onClick={toggleFilterDrawer}
              sx={{ 
                position: 'fixed',
                bottom: 80,
                right: 16,
                zIndex: 1000,
              }}
            >
              <FilterIcon />
            </Fab>
          )}
          
          {/* 新規タスク作成ボタン */}
          <Fab 
            color="primary" 
            aria-label="タスクを追加"
            onClick={() => openTaskModal('create')}
            sx={{ 
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      
      {/* タスク作成・編集モーダル */}
      <LazyTaskModal />
      
      {/* モバイル用フィルタードロワー */}
      <FilterDrawer 
        open={filterDrawerOpen} 
        onClose={() => setFilterDrawerOpen(false)} 
      />
    </Container>
  );
} 