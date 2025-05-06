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
} from '@mui/material';
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
  const { priorities, tags } = useTaskStore();
  const [syncLoading, setSyncLoading] = useState(false);
  
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
      console.log('同期結果:', data);
      
      // 必要に応じてデータを再取得
      // (既に実装済みのAPIフックがデータを自動更新するため、ここでは明示的に再取得しない)
      
      alert('データの同期が完了しました');
    } catch (error) {
      console.error('同期エラー:', error);
      alert('データの同期中にエラーが発生しました');
    } finally {
      setSyncLoading(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">カスタムデータ管理</Typography>
        <Button
          variant="outlined"
          onClick={handleSyncData}
          disabled={syncLoading}
          startIcon={syncLoading ? <CircularProgress size={20} /> : null}
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
      >
        <Tab label="タグ管理" />
        <Tab label="優先度管理" />
      </Tabs>
      
      {/* タグ管理タブ */}
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
          />
        </Box>
      )}
      
      {/* 優先度管理タブ */}
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
    </Paper>
  );
}

export default CustomDataManager; 