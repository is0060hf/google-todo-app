'use client';

import React, { useEffect } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem, 
  SelectChangeEvent,
  FormHelperText,
  Box,
  Chip,
} from '@mui/material';
import { 
  Flag as FlagIcon,
  FlagOutlined as FlagOutlinedIcon
} from '@mui/icons-material';
import { useTaskStore, Priority } from '../../store/taskStore';
import { useApiGet } from '../../lib/api-hooks';

export interface PrioritySelectorProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

/**
 * 優先度選択コンポーネント
 * 高・中・低などの優先度を選択するセレクトボックス
 */
export function PrioritySelector({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
}: PrioritySelectorProps) {
  const { priorities, setPriorities } = useTaskStore();
  
  // 優先度一覧を取得
  const { data, isLoading } = useApiGet<{ priorities: Priority[] }>(
    'priorities',
    ['priorities']
  );
  
  // 優先度データが取得できたら、ストアにセット
  useEffect(() => {
    if (data?.priorities) {
      setPriorities(data.priorities);
    }
  }, [data, setPriorities]);
  
  // 選択変更ハンドラ
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onChange(value === '' ? null : Number(value));
  };
  
  // 優先度に応じた色を取得
  const getPriorityColor = (priorityId: number | null) => {
    if (!priorityId) return 'default';
    switch (priorityId) {
      case 3: return 'error'; // 高
      case 2: return 'warning'; // 中
      case 1: return 'success'; // 低
      default: return 'default';
    }
  };
  
  // 優先度表示用のアイコンとラベル
  const renderPriorityValue = (priorityId: number | null) => {
    if (!priorityId) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FlagOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
          未設定
        </Box>
      );
    }
    
    const priority = priorities.find(p => p.id === priorityId);
    if (!priority) return '不明な優先度';
    
    const color = getPriorityColor(priorityId) as "error" | "warning" | "success" | "default";
    
    return (
      <Chip
        icon={<FlagIcon />}
        label={priority.name}
        color={color}
        variant="outlined"
        size="small"
      />
    );
  };
  
  return (
    <FormControl fullWidth error={error} disabled={disabled || isLoading}>
      <InputLabel id="priority-select-label">優先度</InputLabel>
      <MuiSelect
        labelId="priority-select-label"
        id="priority-select"
        value={value?.toString() || ''}
        onChange={handleChange}
        label="優先度"
        renderValue={(value) => renderPriorityValue(value === '' ? null : Number(value))}
        aria-label="優先度選択"
        aria-describedby="priority-helper-text"
      >
        <MenuItem value="">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FlagOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
            未設定
          </Box>
        </MenuItem>
        
        {priorities.map((priority) => (
          <MenuItem key={priority.id} value={priority.id.toString()}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FlagIcon
                sx={{ 
                  mr: 1, 
                  color: getPriorityColor(priority.id) === 'error' 
                    ? 'error.main' 
                    : getPriorityColor(priority.id) === 'warning'
                      ? 'warning.main'
                      : 'success.main'
                }}
                aria-hidden="true"
              />
              {priority.name}
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && (
        <FormHelperText id="priority-helper-text">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default PrioritySelector; 