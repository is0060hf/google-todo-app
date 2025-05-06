'use client';

import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

interface SkeletonListProps {
  rows?: number;
  height?: number;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  animation?: 'pulse' | 'wave' | false;
  spacing?: number;
  withIcon?: boolean;
}

/**
 * データロード中に表示するスケルトンリストコンポーネント
 */
export default function SkeletonList({
  rows = 5,
  height = 60,
  variant = 'rectangular',
  animation = 'wave',
  spacing = 1,
  withIcon = false
}: SkeletonListProps) {
  return (
    <Stack spacing={spacing}>
      {Array.from(new Array(rows)).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          {withIcon && (
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              animation={animation}
              sx={{ mr: 2 }}
            />
          )}
          <Skeleton
            variant={variant}
            height={height}
            animation={animation}
            width="100%"
          />
        </Box>
      ))}
    </Stack>
  );
} 