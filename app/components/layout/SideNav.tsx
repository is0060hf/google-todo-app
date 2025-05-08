'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FormatListBulleted as ListIcon,
  ChevronRight as ExpandIcon,
  ExpandMore as CollapseIcon,
  Label as LabelIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useTaskStore } from '../../store/taskStore';
import { useApiGet } from '../../lib/api-hooks';
import { useStore } from '../../lib/store';
import OptimizedAvatar from '../ui/OptimizedAvatar';
import { Loading } from '../ui/Loading';
import { useTranslation } from 'react-i18next';
import TaskListSidebar from '../tasks/TaskListSidebar';

// サイドナビの幅
const DRAWER_WIDTH = 280;

/**
 * 共通サイドナビゲーションコンポーネント
 * アプリケーション全体で使用する共通のナビゲーション要素を提供
 */
export default function SideNav() {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isSidebarOpen, setSidebarOpen } = useStore();
  
  // タスクリスト展開状態
  const [taskListsExpanded, setTaskListsExpanded] = useState(true);
  
  // 現在選択中のナビ項目
  const getCurrentNavItem = () => {
    if (pathname?.startsWith('/dashboard')) return 'dashboard';
    if (pathname?.startsWith('/tasks')) return 'tasks';
    if (pathname?.startsWith('/tags')) return 'tags';
    if (pathname?.startsWith('/settings')) return 'settings';
    if (pathname?.startsWith('/profile')) return 'profile';
    return '';
  };
  
  // モバイル表示時はナビドロワーをモーダルとして表示
  const drawerVariant = isMobile ? 'temporary' : 'permanent';
  
  // モバイル表示時はドロワーを閉じる
  const handleDrawerClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // タスクリストの展開状態切り替え
  const toggleTaskLists = () => {
    setTaskListsExpanded(!taskListsExpanded);
  };
  
  return (
    <Drawer
      variant={drawerVariant}
      open={isSidebarOpen}
      onClose={handleDrawerClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: '64px', // ヘッダーの高さ
          height: 'calc(100% - 64px)', // ヘッダーの高さを引いた残り
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {/* ユーザー情報 */}
        {session?.user && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <OptimizedAvatar
              alt={session.user.name || t('common.user')}
              src={session.user.image || undefined}
              sx={{ width: 40, height: 40 }}
              width={40}
              height={40}
            />
            <Box sx={{ ml: 2, overflow: 'hidden' }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontWeight: 'medium' }}
              >
                {session.user.name || t('common.user')}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
              >
                {session.user.email}
              </Typography>
            </Box>
          </Box>
        )}
        
        <Divider />
        
        {/* メインナビゲーション */}
        <List>
          {/* ダッシュボード */}
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/dashboard"
              selected={getCurrentNavItem() === 'dashboard'}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.dashboard', 'ダッシュボード')} />
            </ListItemButton>
          </ListItem>
          
          {/* タスク管理 */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleTaskLists}
              selected={getCurrentNavItem() === 'tasks'}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.tasks', 'タスク')} />
              {taskListsExpanded ? <CollapseIcon /> : <ExpandIcon />}
            </ListItemButton>
          </ListItem>
          
          {/* タスクリスト一覧（拡張時のみ表示） */}
          <Collapse in={taskListsExpanded} timeout="auto">
            <Box sx={{ pl: 2 }}>
              {getCurrentNavItem() === 'tasks' ? (
                <TaskListSidebar />
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    component="a"
                    href="/tasks"
                    onClick={handleDrawerClose}
                  >
                    <ListItemIcon>
                      <ListIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t('nav.allTasks', 'すべてのタスク')} />
                  </ListItemButton>
                </ListItem>
              )}
            </Box>
          </Collapse>
          
          {/* タグ管理 */}
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/tags"
              selected={getCurrentNavItem() === 'tags'}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.tags', 'タグ管理')} />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Divider />
        
        {/* 設定 */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="/settings"
              selected={getCurrentNavItem() === 'settings'}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.settings', '設定')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
} 