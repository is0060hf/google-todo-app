'use client';

import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { 
  Box, 
  Typography, 
  Paper, 
  Skeleton,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { TaskDistribution } from '../../lib/hooks/useStatsData';

interface DistributionPieChartProps {
  priorityDistribution: TaskDistribution[];
  tagDistribution: TaskDistribution[];
  loading?: boolean;
  error?: string | null;
}

// 円グラフの色
const PRIORITY_COLORS = ['#f44336', '#ff9800', '#4caf50', '#9e9e9e'];
const TAG_COLORS = ['#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'];

type DistributionType = 'priority' | 'tag';

/**
 * タスクの優先度とタグ別分布を円グラフで表示するコンポーネント
 */
export function DistributionPieChart({
  priorityDistribution,
  tagDistribution,
  loading = false,
  error = null,
}: DistributionPieChartProps) {
  const [distributionType, setDistributionType] = useState<DistributionType>('priority');
  
  // 分布タイプの切り替え
  const handleDistributionTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: DistributionType | null
  ) => {
    if (newValue !== null) {
      setDistributionType(newValue);
    }
  };
  
  // 円グラフに表示するデータ
  const chartData = distributionType === 'priority' 
    ? priorityDistribution 
    : tagDistribution;
  
  // 円グラフの色
  const colors = distributionType === 'priority' 
    ? PRIORITY_COLORS 
    : TAG_COLORS;
  
  // ローディング表示
  if (loading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク分布</Typography>
        <Skeleton variant="rectangular" height={300} />
      </Paper>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク分布</Typography>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }
  
  // データなし
  if (
    (distributionType === 'priority' && priorityDistribution.length === 0) ||
    (distributionType === 'tag' && tagDistribution.length === 0)
  ) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>タスク分布</Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>データがありません</Typography>
        </Box>
      </Paper>
    );
  }
  
  // 合計値を計算
  const total = chartData.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">タスク分布</Typography>
        <ToggleButtonGroup
          value={distributionType}
          exclusive
          onChange={handleDistributionTypeChange}
          aria-label="分布タイプ"
          size="small"
        >
          <ToggleButton value="priority" aria-label="優先度別">
            優先度別
          </ToggleButton>
          <ToggleButton value="tag" aria-label="タグ別">
            タグ別
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}件 (${((value as number) / total * 100).toFixed(1)}%)`, '']}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default DistributionPieChart; 