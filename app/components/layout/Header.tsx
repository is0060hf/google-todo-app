'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import { useStore } from '@/app/lib/store';

export default function Header() {
  const { data: session } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isSidebarOpen, setSidebarOpen } = useStore();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: '/auth/signin' });
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {session && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Google TODO連携アプリ
        </Typography>
        
        {!isMobile && session && (
          <Box sx={{ display: 'flex', mx: 2 }}>
            <Button 
              color="inherit" 
              startIcon={<DashboardIcon />}
              href="/dashboard"
            >
              ダッシュボード
            </Button>
            <Button 
              color="inherit" 
              startIcon={<TaskIcon />}
              href="/tasks"
              sx={{ ml: 2 }}
            >
              タスク
            </Button>
          </Box>
        )}
        
        {session?.user ? (
          <>
            <Tooltip title="アカウント設定">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar 
                  alt={session.user.name || 'ユーザー'} 
                  src={session.user.image || undefined}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                マイアカウント
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                ログアウト
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" href="/auth/signin">
            ログイン
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
} 