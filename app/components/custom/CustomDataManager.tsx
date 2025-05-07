'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { Sync as SyncIcon } from '@mui/icons-material';
import { useTaskStore } from '../../store/taskStore';
import { TagSelector } from './TagSelector';
import { PrioritySelector } from './PrioritySelector';
import { useApiGet, useApiPost } from '../../lib/api-hooks';

/**
 * カスタムデータ管理コンポーネント
 * タグ・優先度の管理と同期機能を提供する
 */
export function CustomDataManager() {
  const [tab, setTab] = useState(0);
  const { priorities, tags, setTags, setPriorities, customData, setCustomData } = useTaskStore();
  const [syncLoading, setSyncLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
  // タブ変更ハンドラ
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  
  // データ同期処理
  const handleSyncData = async () => {
    setSyncLoading(true);
    try {
      const response = await fetch('/api/custom-data/sync', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('同期に失敗しました');
      }
      
      const data = await response.json();
      
      // 同期後のデータを取得
      await refreshTagsAndPriorities();
      
      setSnackbarMessage('データの同期が完了しました');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('同期エラー:', error);
      setSnackbarMessage('データの同期中にエラーが発生しました');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSyncLoading(false);
    }
  };
  
  // タグと優先度を再取得
  const refreshTagsAndPriorities = async () => {
    try {
      // タグ再取得
      const tagsResponse = await fetch('/api/tags');
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        if (tagsData.tags) {
          setTags(tagsData.tags);
        }
      }
      
      // 優先度再取得
      const prioritiesResponse = await fetch('/api/priorities');
      if (prioritiesResponse.ok) {
        const prioritiesData = await prioritiesResponse.json();
        if (prioritiesData.priorities) {
          setPriorities(prioritiesData.priorities);
        }
      }
    } catch (error) {
      console.error('データ再取得エラー:', error);
    }
  };
  
  // Snackbarを閉じる
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Paper 
      sx={{ p: 3, mb: 3 }} 
      role="region" 
      aria-label="カスタムデータ管理"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">カスタムデータ管理</Typography>
        <Button
          variant="outlined"
          onClick={handleSyncData}
          disabled={syncLoading}
          startIcon={syncLoading ? <CircularProgress size={20} /> : <SyncIcon />}
          aria-label="Google Tasksとデータを同期する"
          aria-live={syncLoading ? "polite" : "off"}
        >
          {syncLoading ? '同期中...' : 'Google Tasksと同期'}
        </Button>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
        aria-label="カスタムデータ管理タブ"
      >
        <Tab label="タグ管理" id="custom-data-tab-0" aria-controls="custom-data-tabpanel-0" />
        <Tab label="優先度管理" id="custom-data-tab-1" aria-controls="custom-data-tabpanel-1" />
      </Tabs>
      
      {/* タグ管理タブ */}
      <div
        role="tabpanel"
        id="custom-data-tabpanel-0"
        aria-labelledby="custom-data-tab-0"
        hidden={tab !== 0}
      >
        {tab === 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              タグの作成・編集
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              タグを作成・編集すると、タスクにタグを付けられるようになります。
            </Typography>
            
            <TagSelector
              value={[]}
              onChange={() => {}}
              aria-label="タグ管理"
            />
          </Box>
        )}
      </div>
      
      {/* 優先度管理タブ */}
      <div
        role="tabpanel"
        id="custom-data-tabpanel-1"
        aria-labelledby="custom-data-tab-1"
        hidden={tab !== 1}
      >
        {tab === 1 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              タスク優先度の説明
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" paragraph>
                タスクに優先度を設定すると、重要度に応じて視覚的に区別できます：
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 200 }}>
                    <PrioritySelector
                      value={3}
                      onChange={() => {}}
                      disabled
                      aria-label="高優先度の例"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    最優先で対応が必要なタスク
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 200 }}>
                    <PrioritySelector
                      value={2}
                      onChange={() => {}}
                      disabled
                      aria-label="中優先度の例"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    重要だが、高優先度タスクの後に対応可能なタスク
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 200 }}>
                    <PrioritySelector
                      value={1}
                      onChange={() => {}}
                      disabled
                      aria-label="低優先度の例"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    時間に余裕がある場合に対応するタスク
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 200 }}>
                    <PrioritySelector
                      value={null}
                      onChange={() => {}}
                      disabled
                      aria-label="優先度なしの例"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    優先度が設定されていないタスク
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </div>
      
      {/* 通知用Snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          aria-live="assertive"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default CustomDataManager; 