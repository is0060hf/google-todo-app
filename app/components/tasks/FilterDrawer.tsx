'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  FilterAlt as FilterIcon,
  ClearAll as ClearAllIcon
} from '@mui/icons-material';
import TaskFilterBar from './TaskFilterBar';
import { useTaskStore } from '../../store/taskStore';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * モバイル表示用のフィルタードロワーコンポーネント
 * タスクのフィルター機能をサイドドロワーで表示します
 */
const FilterDrawer: React.FC<FilterDrawerProps> = ({ open, onClose }) => {
  const { resetFilters } = useTaskStore();
  
  const handleResetFilters = () => {
    resetFilters();
    // リセット後もドロワーは開いたままにする
  };
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '360px',
          boxSizing: 'border-box',
          pt: 1,
        },
      }}
      aria-label="フィルタードロワー"
    >
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterIcon sx={{ mr: 1 }} aria-hidden="true" />
          フィルター設定
        </Typography>
        <IconButton 
          onClick={onClose}
          aria-label="フィルタードロワーを閉じる"
          edge="end"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2, overflowY: 'auto' }}>
        {/* フィルターコンポーネントを表示 */}
        <TaskFilterBar drawerMode={true} />
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            startIcon={<ClearAllIcon />}
            onClick={handleResetFilters}
            aria-label="すべてのフィルターをリセット"
          >
            フィルターをリセット
          </Button>
          
          <Button 
            variant="contained" 
            onClick={onClose}
            aria-label="フィルター設定を適用して閉じる"
          >
            適用して閉じる
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer; 