'use client';

import dynamic from 'next/dynamic';
import { CircularProgress, Box } from '@mui/material';

// TaskModal の動的インポート
const TaskModal = dynamic(
  () => import('./TaskModal').then(mod => ({ default: mod.TaskModal })),
  {
    loading: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    ),
    ssr: false, // タスクモーダルはクライアントサイドでのみレンダリングするため
  }
);

/**
 * 遅延ロードされるTaskModalコンポーネント
 * 必要になった時点でインポートされるため、初期ロード時間を短縮できる
 */
export default function LazyTaskModal() {
  return <TaskModal />;
} 