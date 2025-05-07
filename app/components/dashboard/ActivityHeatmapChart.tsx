'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Tooltip,
  styled
} from '@mui/material';
import { format, parseISO, getMonth, getYear, getDate, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import { PeriodType } from './PeriodSelector';
import { StatData } from '../../lib/hooks/useStatsData';

interface ActivityHeatmapChartProps {
  data: StatData[];
  period: PeriodType;
  currentDate: Date;
  loading?: boolean;
  error?: string | null;
  compact?: boolean; // モバイル向け省スペースモード
}

// ヒートマップのセルスタイル
const HeatmapCell = styled(Box)<{ intensity: number }>(({ theme, intensity }) => ({
  width: '100%',
  height: '100%',
  aspectRatio: '1/1',
  minWidth: 20,
  minHeight: 20,
  backgroundColor: intensity === 0 
    ? theme.palette.grey[100]
    : theme.palette.mode === 'light'
      ? `rgba(130, 202, 157, ${Math.min(0.2 + intensity * 0.6, 0.9)})`
      : `rgba(130, 202, 157, ${Math.min(0.3 + intensity * 0.5, 0.8)})`,
  borderRadius: 2,
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// 曜日ラベル
const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'];
// 曜日ラベル（省略形）
const WEEKDAYS_SHORT = ['月', '火', '水', '木', '金', '土', '日'];

/**
 * タスクのアクティビティをヒートマップで表示するコンポーネント
 * カレンダー形式でタスク完了数を色の濃さで表現
 */
export function ActivityHeatmapChart({
  data,
  period,
  currentDate,
  loading = false,
  error = null,
  compact = false, // デフォルトは通常モード
}: ActivityHeatmapChartProps) {
  // 月のカレンダーデータを生成
  const calendarData = useMemo(() => {
    if (period !== 'monthly') return [];
    
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // 月の開始日の曜日を取得（0: 日曜日、1: 月曜日、...）
    // 表示は月曜始まりにするため、調整が必要
    const firstDayOfMonth = monthStart.getDay();
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // 前月の日を追加
    const prevDays = Array.from({ length: startOffset }, (_, i) => 
      addDays(monthStart, -(startOffset - i))
    );
    
    // すべての日を結合
    const allDays = [...prevDays, ...days];
    
    // 週ごとに分割
    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    
    // 最後の週が7日未満の場合、次月の日で埋める
    const lastWeek = weeks[weeks.length - 1];
    if (lastWeek.length < 7) {
      const nextDays = Array.from({ length: 7 - lastWeek.length }, (_, i) => 
        addDays(lastWeek[lastWeek.length - 1], i + 1)
      );
      weeks[weeks.length - 1] = [...lastWeek, ...nextDays];
    }
    
    return weeks;
  }, [currentDate, period]);
  
  // 特定の日のデータを取得
  const getDayData = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return data.find(item => {
      if (!item.date) return false;
      const itemDate = typeof item.date === 'string' ? parseISO(item.date) : new Date(item.date);
      return format(itemDate, 'yyyy-MM-dd') === dayStr;
    });
  };
  
  // ヒートマップの強度を計算（0-1の値）
  const getIntensity = (count: number) => {
    if (count === 0) return 0;
    // 最大値を10とし、それを超える場合は1.0（最大強度）
    const maxCount = 10;
    return Math.min(count / maxCount, 1);
  };
  
  // 使用する曜日ラベル
  const weekdayLabels = compact ? WEEKDAYS_SHORT : WEEKDAYS;
  
  // ローディング表示
  if (loading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>アクティビティ</Typography>
        <Skeleton variant="rectangular" height={compact ? 200 : 300} />
      </Box>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>アクティビティ</Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  // 月次以外は表示しない
  if (period !== 'monthly') {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>アクティビティ</Typography>
        <Box sx={{ height: compact ? 200 : 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography>月次表示でのみ利用可能です</Typography>
          <Typography variant="caption" color="text.secondary">
            月次を選択して表示してください
          </Typography>
        </Box>
      </Box>
    );
  }
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>アクティビティ</Typography>
      <Box sx={{ p: compact ? 0 : 1, mt: 1 }}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          {format(currentDate, 'yyyy年M月', { locale: ja })}
        </Typography>
        
        {/* flexboxを使用したカレンダーレイアウト */}
        <Box sx={{ mb: 2, mt: 1 }}>
          {/* 曜日のヘッダー */}
          <Box sx={{ display: 'flex', mb: 0.5 }}>
            {weekdayLabels.map((day, i) => (
              <Box 
                key={`header-${i}`}
                sx={{ 
                  flex: 1,
                  textAlign: 'center',
                  color: i >= 5 ? 'text.secondary' : 'text.primary',
                  fontWeight: 'medium',
                  fontSize: compact ? '0.65rem' : '0.75rem'
                }}
              >
                {day}
              </Box>
            ))}
          </Box>
          
          {/* カレンダーの週 */}
          {calendarData.map((week, weekIndex) => (
            <Box key={`week-${weekIndex}`} sx={{ display: 'flex', mb: compact ? 0.3 : 0.5 }}>
              {week.map((day, dayIndex) => {
                const dayData = getDayData(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const completedCount = dayData?.completedCount || 0;
                const intensity = getIntensity(completedCount);
                
                return (
                  <Box 
                    key={`cell-${weekIndex}-${dayIndex}`} 
                    sx={{ 
                      flex: 1,
                      aspectRatio: '1/1',
                      position: 'relative',
                      opacity: isCurrentMonth ? 1 : 0.5,
                      mx: compact ? 0.1 : 0.2
                    }}
                  >
                    <Tooltip
                      title={
                        <>
                          <Typography variant="body2">
                            {format(day, 'yyyy年M月d日(eee)', { locale: ja })}
                          </Typography>
                          <Typography variant="body2">
                            完了タスク: {completedCount}件
                          </Typography>
                          {dayData && (
                            <Typography variant="body2">
                              作成タスク: {dayData.createdCount}件
                            </Typography>
                          )}
                        </>
                      }
                      arrow
                    >
                      <Box sx={{ position: 'relative', height: '100%' }}>
                        <HeatmapCell intensity={intensity} />
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: intensity > 0.5 ? 'white' : 'text.primary',
                            fontWeight: 'medium',
                            fontSize: compact ? '0.65rem' : '0.75rem'
                          }}
                        >
                          {getDate(day)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
        
        {/* 凡例 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: compact ? 1 : 2 }}>
          <Typography variant="caption" sx={{ mr: 1 }}>少</Typography>
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
            <HeatmapCell 
              key={`legend-${i}`} 
              intensity={intensity}
              sx={{ width: compact ? 12 : 16, height: compact ? 12 : 16, mr: 0.5 }}
            />
          ))}
          <Typography variant="caption" sx={{ ml: 1 }}>多</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityHeatmapChart; 