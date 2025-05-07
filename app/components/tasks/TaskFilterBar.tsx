'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useTaskStore, Priority, Tag } from '../../store/taskStore';
import { useApiGet } from '../../lib/api-hooks';

// APIレスポンスの型定義
interface PriorityResponse {
  id: number;
  name: string;
  level: number;
}

interface TagResponse {
  id: string;
  name: string;
}

/**
 * タスクのフィルタリングコンポーネント
 * 優先度、タグ、ステータス、期限でフィルタリングが可能
 */
export function TaskFilterBar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // タスクストアからフィルターと設定関数を取得
  const { 
    priorities,
    tags, 
    setPriorities, 
    setTags,
    // フィルター状態と設定関数
    priorityFilter,
    tagFilter,
    statusFilter,
    dueDateFilter,
    setPriorityFilter,
    setTagFilter,
    setStatusFilter,
    setDueDateFilter,
    resetFilters
  } = useTaskStore();
  
  // 優先度一覧の取得
  const { data: prioritiesData } = useApiGet<{ priorities: PriorityResponse[] }>(
    'priorities',
    ['priorities']
  );
  
  // タグ一覧の取得
  const { data: tagsData } = useApiGet<{ tags: TagResponse[] }>(
    'tags',
    ['tags']
  );
  
  // データが取得できたらストアに保存
  useEffect(() => {
    if (prioritiesData?.priorities) {
      // 優先度データをアプリケーションの型に変換
      const convertedPriorities: Priority[] = prioritiesData.priorities.map(p => ({
        id: p.id,
        name: p.name,
        color: getPriorityColor(p.level) // レベルに基づいて色を設定
      }));
      
      setPriorities(convertedPriorities);
    }
    
    if (tagsData?.tags) {
      // タグデータをアプリケーションの型に変換
      const convertedTags: Tag[] = tagsData.tags.map(t => ({
        id: t.id,
        name: t.name,
        userId: '' // ユーザーIDはフィルタリングには不要なので空文字で対応
      }));
      
      setTags(convertedTags);
    }
  }, [prioritiesData, tagsData, setPriorities, setTags]);
  
  // フィルターの表示/非表示切り替え
  const toggleFilterPanel = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Paper sx={{ p: 2, mb: 2 }} role="region" aria-label="タスクフィルター">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          フィルター
          <Tooltip title={isOpen ? 'フィルターを閉じる' : 'フィルターを開く'}>
            <IconButton 
              onClick={toggleFilterPanel} 
              size="small"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'フィルターを閉じる' : 'フィルターを開く'}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        
        {/* アクティブなフィルターの表示 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {priorityFilter.length > 0 && (
            <Chip 
              label={`優先度: ${priorityFilter.length}個選択`} 
              onDelete={() => setPriorityFilter([])}
              color="primary"
              variant="outlined"
              size="small"
              aria-label={`優先度フィルター: ${priorityFilter.length}個選択中、クリックで解除`}
            />
          )}
          
          {tagFilter.length > 0 && (
            <Chip 
              label={`タグ: ${tagFilter.length}個選択`} 
              onDelete={() => setTagFilter([])}
              color="primary"
              variant="outlined"
              size="small"
              aria-label={`タグフィルター: ${tagFilter.length}個選択中、クリックで解除`}
            />
          )}
          
          {statusFilter !== 'all' && (
            <Chip 
              label={`状態: ${statusFilter === 'active' ? '未完了' : '完了'}`}
              onDelete={() => setStatusFilter('all')}
              color="primary"
              variant="outlined"
              size="small"
              aria-label={`状態フィルター: ${statusFilter === 'active' ? '未完了' : '完了'}、クリックで解除`}
            />
          )}
          
          {dueDateFilter !== 'all' && (
            <Chip 
              label={`期限: ${getDueDateLabel(dueDateFilter)}`}
              onDelete={() => setDueDateFilter('all')}
              color="primary"
              variant="outlined"
              size="small"
              aria-label={`期限フィルター: ${getDueDateLabel(dueDateFilter)}、クリックで解除`}
            />
          )}
          
          {(priorityFilter.length > 0 || 
            tagFilter.length > 0 || 
            statusFilter !== 'all' || 
            dueDateFilter !== 'all') && (
            <Button 
              size="small" 
              startIcon={<ClearIcon />}
              onClick={resetFilters}
              aria-label="すべてのフィルターをリセット"
            >
              リセット
            </Button>
          )}
        </Box>
      </Box>
      
      {/* フィルターパネル */}
      {isOpen && (
        <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
          {/* 優先度フィルター */}
          <FormControl size="small" fullWidth>
            <InputLabel id="priority-filter-label">優先度</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              multiple
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as number[])}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((priorityId) => {
                    const priority = priorities.find(p => p.id === priorityId);
                    return (
                      <Chip
                        key={priorityId}
                        label={priority?.name || `優先度 ${priorityId}`}
                        size="small"
                      />
                    );
                  })}
                </Box>
              )}
              aria-label="優先度でフィルター"
            >
              {priorities.map((priority) => (
                <MenuItem key={priority.id} value={priority.id}>
                  {priority.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* タグフィルター */}
          <FormControl size="small" fullWidth>
            <Autocomplete
              multiple
              options={tags}
              getOptionLabel={(option) => option.name}
              value={tags.filter(tag => tagFilter.includes(tag.id))}
              onChange={(_, newValue) => {
                setTagFilter(newValue.map(tag => tag.id));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="タグ"
                  size="small"
                  aria-label="タグでフィルター"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={option.name} 
                    size="small" 
                    {...getTagProps({ index })} 
                  />
                ))
              }
            />
          </FormControl>
          
          {/* ステータスフィルター */}
          <FormControl size="small" fullWidth>
            <InputLabel id="status-filter-label">状態</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'completed')}
              aria-label="タスクの状態でフィルター"
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="active">未完了</MenuItem>
              <MenuItem value="completed">完了</MenuItem>
            </Select>
          </FormControl>
          
          {/* 期限フィルター */}
          <FormControl size="small" fullWidth>
            <InputLabel id="due-date-filter-label">期限</InputLabel>
            <Select
              labelId="due-date-filter-label"
              id="due-date-filter"
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value as 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek' | 'future')}
              aria-label="期限でフィルター"
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="overdue">期限切れ</MenuItem>
              <MenuItem value="today">今日</MenuItem>
              <MenuItem value="tomorrow">明日</MenuItem>
              <MenuItem value="thisWeek">今週</MenuItem>
              <MenuItem value="nextWeek">来週</MenuItem>
              <MenuItem value="future">将来</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Paper>
  );
}

// 期限フィルターのラベルを取得する関数
function getDueDateLabel(dueDate: string): string {
  switch (dueDate) {
    case 'overdue':
      return '期限切れ';
    case 'today':
      return '今日';
    case 'tomorrow':
      return '明日';
    case 'thisWeek':
      return '今週';
    case 'nextWeek':
      return '来週';
    case 'future':
      return '将来';
    default:
      return 'すべて';
  }
}

// 優先度レベルに基づいて色を取得する関数
function getPriorityColor(level: number): string {
  switch (level) {
    case 3:
      return 'error'; // 高
    case 2:
      return 'warning'; // 中
    case 1:
      return 'success'; // 低
    default:
      return 'default'; // 未設定
  }
}

export default TaskFilterBar; 