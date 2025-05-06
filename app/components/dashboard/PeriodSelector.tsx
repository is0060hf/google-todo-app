'use client';

import React from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  IconButton,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { format, subDays, addDays, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear, subWeeks, addWeeks, subMonths, addMonths, subYears, addYears } from 'date-fns';
import { ja } from 'date-fns/locale';

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface PeriodSelectorProps {
  period: PeriodType;
  currentDate: Date;
  onPeriodChange: (period: PeriodType) => void;
  onDateChange: (date: Date) => void;
}

/**
 * ダッシュボードの期間選択コンポーネント
 * 日次、週次、月次、年次の期間切り替えと、期間のナビゲーションを提供
 */
export function PeriodSelector({
  period,
  currentDate,
  onPeriodChange,
  onDateChange,
}: PeriodSelectorProps) {
  // 期間表示用のフォーマット
  const getDateRangeLabel = () => {
    switch (period) {
      case 'daily':
        return format(currentDate, 'yyyy年M月d日 (eee)', { locale: ja });
      case 'weekly': {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'yyyy年M月d日', { locale: ja })} 〜 ${format(weekEnd, 'M月d日', { locale: ja })}`;
      }
      case 'monthly':
        return format(currentDate, 'yyyy年M月', { locale: ja });
      case 'yearly':
        return format(currentDate, 'yyyy年', { locale: ja });
      default:
        return '';
    }
  };

  // 前の期間へ移動
  const handlePrevious = () => {
    switch (period) {
      case 'daily':
        onDateChange(subDays(currentDate, 1));
        break;
      case 'weekly':
        onDateChange(subWeeks(currentDate, 1));
        break;
      case 'monthly':
        onDateChange(subMonths(currentDate, 1));
        break;
      case 'yearly':
        onDateChange(subYears(currentDate, 1));
        break;
    }
  };

  // 次の期間へ移動
  const handleNext = () => {
    switch (period) {
      case 'daily':
        onDateChange(addDays(currentDate, 1));
        break;
      case 'weekly':
        onDateChange(addWeeks(currentDate, 1));
        break;
      case 'monthly':
        onDateChange(addMonths(currentDate, 1));
        break;
      case 'yearly':
        onDateChange(addYears(currentDate, 1));
        break;
    }
  };

  // 期間タイプ変更ハンドラ
  const handlePeriodChange = (
    _: React.MouseEvent<HTMLElement>,
    newPeriod: PeriodType | null
  ) => {
    if (newPeriod) {
      onPeriodChange(newPeriod);
      
      // 期間タイプに応じて日付も調整
      switch (newPeriod) {
        case 'daily':
          onDateChange(startOfDay(currentDate));
          break;
        case 'weekly':
          onDateChange(startOfWeek(currentDate, { weekStartsOn: 1 }));
          break;
        case 'monthly':
          onDateChange(startOfMonth(currentDate));
          break;
        case 'yearly':
          onDateChange(startOfYear(currentDate));
          break;
      }
    }
  };

  // 今日/今週/今月/今年に移動
  const handleToday = () => {
    const today = new Date();
    switch (period) {
      case 'daily':
        onDateChange(startOfDay(today));
        break;
      case 'weekly':
        onDateChange(startOfWeek(today, { weekStartsOn: 1 }));
        break;
      case 'monthly':
        onDateChange(startOfMonth(today));
        break;
      case 'yearly':
        onDateChange(startOfYear(today));
        break;
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          aria-label="期間"
          size="small"
        >
          <ToggleButton value="daily" aria-label="日次">
            日次
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="週次">
            週次
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="月次">
            月次
          </ToggleButton>
          <ToggleButton value="yearly" aria-label="年次">
            年次
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handlePrevious} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              mx: 2, 
              cursor: 'pointer', 
              '&:hover': { textDecoration: 'underline' } 
            }}
            onClick={handleToday}
          >
            {getDateRangeLabel()}
          </Typography>
          <IconButton onClick={handleNext} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default PeriodSelector; 