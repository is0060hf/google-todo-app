'use client';

import { useSession } from 'next-auth/react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Grid, 
  CircularProgress, 
  Alert 
} from '@mui/material';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  
  // 認証状態の確認
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (status === 'unauthenticated' || !session) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          このページにアクセスするにはログインが必要です。
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ダッシュボード
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {session.user?.name || 'ユーザー'}さん、ようこそ！
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* 今日のタスク状況 */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper 
            elevation={2} 
            className="stats-card"
            sx={{ p: 2, height: '100%', minHeight: 180 }}
          >
            <Typography variant="h6" component="h2" gutterBottom className="stats-card-title">
              今日のタスク
            </Typography>
            <Box className="stats-card-content" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1">
                タスクデータを読み込み中...
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* 完了タスク */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper 
            elevation={2} 
            className="stats-card"
            sx={{ p: 2, height: '100%', minHeight: 180 }}
          >
            <Typography variant="h6" component="h2" gutterBottom className="stats-card-title">
              完了タスク
            </Typography>
            <Box className="stats-card-content" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1">
                タスクデータを読み込み中...
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* 期限切れタスク */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper 
            elevation={2} 
            className="stats-card"
            sx={{ p: 2, height: '100%', minHeight: 180 }}
          >
            <Typography variant="h6" component="h2" gutterBottom className="stats-card-title">
              期限切れタスク
            </Typography>
            <Box className="stats-card-content" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1">
                タスクデータを読み込み中...
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* 統計情報 */}
        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ p: 3, mt: 3 }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              統計情報
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              タスクの統計情報はGoogle Tasksとの連携後に表示されます。
            </Typography>
            <Alert severity="info">
              タスクリストの管理は「タスク」タブから行えます。
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 