'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Checkbox,
  Tooltip,
  CardActions,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
  SubdirectoryArrowRight as SubdirectoryIcon
} from '@mui/icons-material';
import { Task } from '../../store/taskStore';

// 日付をフォーマットする関数
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

interface TaskCardProps {
  task: Task & { depth?: number };
  customData: any;
  priorities: any[];
  tags: any[];
  onStatusChange: (taskId: string, currentStatus: 'needsAction' | 'completed') => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  customData,
  priorities,
  tags,
  onStatusChange,
  onEdit,
  onDelete
}) => {
  const depth = task.depth || 0;
  const isCompleted = task.status === 'completed';
  
  // 優先度に基づいた表示色を取得
  const getPriorityColor = (priorityId: number | null) => {
    if (!priorityId) return 'default';
    
    const priority = priorities.find(p => p.id === priorityId);
    return priority?.color || 'default';
  };

  // 優先度名を取得
  const getPriorityName = (priorityId: number | null) => {
    if (!priorityId) return '未設定';
    
    const priority = priorities.find(p => p.id === priorityId);
    return priority?.name || '未設定';
  };
  
  const taskCustomData = customData[task.id] || {};
  const priorityId = taskCustomData?.priorityId || null;
  const tagIds = taskCustomData?.tags || [];
  
  // タスクの優先度に基づいてボーダースタイルを設定
  let borderStyle = {};
  if (priorityId === 3) {
    borderStyle = { borderLeft: '4px solid #E53935' }; // 高
  } else if (priorityId === 2) {
    borderStyle = { borderLeft: '4px solid #FFC107' }; // 中
  } else if (priorityId === 1) {
    borderStyle = { borderLeft: '4px solid #43A047' }; // 低
  }

  return (
    <Card 
      sx={{ 
        mb: 2, 
        ml: depth * 2,
        ...borderStyle,
        opacity: isCompleted ? 0.8 : 1
      }}
      aria-label={`タスク: ${task.title}${isCompleted ? '（完了済み）' : ''}`}
    >
      <CardContent sx={{ py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <Checkbox
            checked={isCompleted}
            onChange={() => onStatusChange(task.id, task.status)}
            sx={{ mt: -0.5, ml: -1 }}
            aria-label={isCompleted ? 'タスクを未完了に戻す' : 'タスクを完了にする'}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {depth > 0 && (
                <SubdirectoryIcon 
                  fontSize="small" 
                  sx={{ mr: 1, color: 'text.secondary' }} 
                  aria-hidden="true"
                />
              )}
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontSize: '1rem',
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  color: isCompleted ? 'text.secondary' : 'text.primary'
                }}
              >
                {task.title}
                {depth > 0 && <span className="visually-hidden">（サブタスク、階層レベル{depth}）</span>}
              </Typography>
            </Box>
            
            {task.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {task.notes}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
          {task.due && (
            <Chip 
              size="small" 
              label={formatDate(task.due)} 
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          )}
          
          <Chip 
            icon={<FlagIcon fontSize="small" />} 
            label={getPriorityName(priorityId)} 
            size="small" 
            color={getPriorityColor(priorityId) as any}
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          
          {tagIds.map((tagId: string) => {
            const tag = tags.find(t => t.id === tagId);
            return (
              <Chip 
                key={tagId}
                icon={<LabelIcon fontSize="small" />} 
                label={tag?.name || '不明なタグ'} 
                size="small" 
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            );
          })}
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end', py: 0.5 }}>
        <Tooltip title="編集">
          <IconButton 
            size="small" 
            onClick={() => onEdit(task.id)}
            aria-label={`タスク「${task.title}」を編集`}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="削除">
          <IconButton 
            size="small" 
            onClick={() => onDelete(task.id)}
            aria-label={`タスク「${task.title}」を削除`}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default TaskCard; 