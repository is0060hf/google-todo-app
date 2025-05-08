'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Chip,
  TextField,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Label as LabelIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useTaskStore } from '../store/taskStore';
import { useApiGet, useApiPost, useApiPatch, useApiDelete } from '../lib/api-hooks';
import { Modal } from '../components/ui/Modal';
import { useTranslation } from 'react-i18next';
import { Tag } from '../store/taskStore';

/**
 * タグ管理画面
 * タグの一覧表示、作成、編集、削除機能を提供
 */
export default function TagsPage() {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { tags, setTags } = useTaskStore();
  
  // 状態管理
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState('');
  
  // APIフック
  const { data, isLoading, refetch } = useApiGet<{ tags: Tag[] }>(
    'tags',
    ['tags']
  );
  
  // タグ作成ミューテーション
  const createTagMutation = useApiPost<{ tag: Tag }, { name: string }>(
    'tags',
    {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
      },
    }
  );
  
  // タグ更新ミューテーション
  const updateTagMutation = useApiPatch<{ tag: Tag }, { name: string }>(
    `tags/${selectedTag?.id}`,
    {
      onSuccess: () => {
        refetch();
        handleCloseDialog();
      },
    }
  );
  
  // タグ削除ミューテーション
  const deleteTagMutation = useApiDelete<{ success: boolean }, void>(
    `tags/${selectedTag?.id}`,
    {
      onSuccess: () => {
        refetch();
        setSelectedTag(null);
      },
    }
  );
  
  // タグデータが取得できたらストアにセット
  useEffect(() => {
    if (data?.tags) {
      setTags(data.tags);
    }
  }, [data, setTags]);
  
  // ダイアログを開く
  const handleOpenDialog = (mode: 'create' | 'edit', tag?: Tag) => {
    setDialogMode(mode);
    if (mode === 'edit' && tag) {
      setSelectedTag(tag);
      setTagName(tag.name);
    } else {
      setSelectedTag(null);
      setTagName('');
    }
    setIsDialogOpen(true);
  };
  
  // ダイアログを閉じる
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTagName('');
  };
  
  // タグを保存
  const handleSaveTag = () => {
    const name = tagName.trim();
    if (!name) return;
    
    if (dialogMode === 'create') {
      createTagMutation.mutate({ name });
    } else if (dialogMode === 'edit' && selectedTag) {
      updateTagMutation.mutate({ name });
    }
  };
  
  // タグを削除
  const handleDeleteTag = (tag: Tag) => {
    setSelectedTag(tag);
    deleteTagMutation.mutate();
  };
  
  // 検索クエリに一致するタグをフィルタリング
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // ローディング中
  if (status === 'loading' || isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  // 未認証
  if (!session) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          {t('tags.needLogin', 'タグ管理にはログインが必要です')}
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('tags.title', 'タグ管理')}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('create')}
        >
          {t('tags.createNew', '新規タグ作成')}
        </Button>
      </Box>
      
      {/* 検索バー */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            fullWidth
            variant="standard"
            placeholder={t('tags.search', 'タグを検索...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      </Paper>
      
      {/* タグが存在しない場合 */}
      {filteredTags.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {searchQuery ? t('tags.noSearchResults', '検索結果が見つかりません') : t('tags.noTags', 'タグがありません')}
          </Typography>
          {searchQuery && (
            <Button
              sx={{ mt: 2 }}
              onClick={() => setSearchQuery('')}
            >
              {t('tags.clearSearch', '検索をクリア')}
            </Button>
          )}
        </Paper>
      )}
      
      {/* タグ一覧 - グリッドまたはリスト表示 */}
      {filteredTags.length > 0 && (
        isMobile ? (
          // モバイル表示: リスト
          <Paper>
            <List>
              {filteredTags.map(tag => (
                <React.Fragment key={tag.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <Tooltip title={t('tags.edit', '編集')}>
                          <IconButton
                            edge="end"
                            onClick={() => handleOpenDialog('edit', tag)}
                            aria-label={`タグ「${tag.name}」を編集`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('tags.delete', '削除')}>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTag(tag)}
                            aria-label={`タグ「${tag.name}」を削除`}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <LabelIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={tag.name} 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          // デスクトップ表示: Flexboxグリッド
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {filteredTags.map(tag => (
              <Box 
                key={tag.id} 
                sx={{ 
                  width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 10.67px)' },
                  flexGrow: 0,
                  flexShrink: 0
                }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LabelIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div" noWrap>
                        {tag.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={t('tags.usedByTasks', '使用中')} 
                      size="small" 
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog('edit', tag)}
                    >
                      {t('tags.edit', '編集')}
                    </Button>
                    <Button 
                      size="small" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteTag(tag)}
                    >
                      {t('tags.delete', '削除')}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        )
      )}
      
      {/* タグ作成・編集ダイアログ */}
      <Modal
        open={isDialogOpen}
        onClose={handleCloseDialog}
        title={dialogMode === 'create' 
          ? t('tags.createNewTag', '新しいタグを作成') 
          : t('tags.editTag', 'タグを編集')}
        confirmText={dialogMode === 'create' 
          ? t('tags.create', '作成') 
          : t('tags.update', '更新')}
        onConfirm={handleSaveTag}
        confirmLoading={createTagMutation.isPending || updateTagMutation.isPending}
        confirmDisabled={!tagName.trim()}
      >
        <TextField
          label={t('tags.tagName', 'タグ名')}
          fullWidth
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          autoFocus
          margin="normal"
          error={!tagName.trim()}
          helperText={!tagName.trim() ? t('tags.nameRequired', 'タグ名は必須です') : ''}
        />
      </Modal>
    </Container>
  );
} 