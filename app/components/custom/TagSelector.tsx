'use client';

import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  Label as LabelIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTaskStore, Tag } from '../../store/taskStore';
import { useApiGet, useApiPost, useApiDelete, useApiPatch } from '../../lib/api-hooks';
import { Button, CancelButton } from '../ui/Button';

interface TagSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

interface TagFormData {
  id?: string;
  name: string;
}

/**
 * タグ選択・管理コンポーネント
 * 既存のタグから選択、または新規タグを作成できるオートコンプリート
 */
export function TagSelector({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
}: TagSelectorProps) {
  const { tags, setTags } = useTaskStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [tagFormData, setTagFormData] = useState<TagFormData>({ name: '' });
  const [managementMode, setManagementMode] = useState(false);

  // タグ一覧を取得
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
        // 削除されたタグが選択されていた場合、選択解除
        onChange(value.filter(id => id !== selectedTag?.id));
        setSelectedTag(null);
      },
    }
  );

  // タグデータが取得できたら、ストアにセット
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
      setTagFormData({ id: tag.id, name: tag.name });
    } else {
      setSelectedTag(null);
      setTagFormData({ name: '' });
    }
    setIsDialogOpen(true);
  };

  // ダイアログを閉じる
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTagFormData({ name: '' });
  };

  // タグを保存
  const handleSaveTag = () => {
    const name = tagFormData.name.trim();
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

  // 管理モード切り替え
  const toggleManagementMode = () => {
    setManagementMode(!managementMode);
  };

  // タグ選択変更ハンドラ
  const handleTagChange = (_: React.SyntheticEvent, newValue: Tag[]) => {
    onChange(newValue.map(tag => tag.id));
  };

  // 選択されているタグオブジェクトの配列を取得
  const getSelectedTags = (): Tag[] => {
    return value
      .map(tagId => tags.find(tag => tag.id === tagId))
      .filter((tag): tag is Tag => tag !== undefined);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* タグ選択オートコンプリート */}
        <Autocomplete
          multiple
          id="tag-selector"
          options={tags}
          value={getSelectedTags()}
          onChange={handleTagChange}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          disabled={disabled || isLoading}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="タグ"
              placeholder={tags.length > 0 ? "タグを選択" : "タグがありません"}
              error={error}
              helperText={helperText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    <Tooltip title={managementMode ? "選択モードに戻る" : "タグ管理"}>
                      <IconButton
                        onClick={toggleManagementMode}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        {managementMode ? <LabelIcon /> : <EditIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="新しいタグを作成">
                      <IconButton
                        onClick={() => handleOpenDialog('create')}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderTags={(selectedTags, getTagProps) =>
            selectedTags.map((tag, index) => (
              <Chip
                icon={<LabelIcon />}
                label={tag.name}
                {...getTagProps({ index })}
                key={tag.id}
              />
            ))
          }
        />
        
        {/* 管理モード時のタグ一覧 */}
        {managementMode && (
          <Box sx={{ mt: 2, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              タグ管理
            </Typography>
            
            {tags.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                タグがありません
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map(tag => (
                  <Chip
                    key={tag.id}
                    icon={<LabelIcon />}
                    label={tag.name}
                    onDelete={() => handleDeleteTag(tag)}
                    onClick={() => handleOpenDialog('edit', tag)}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* タグ作成・編集ダイアログ */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'create' ? 'タグを作成' : 'タグを編集'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="タグ名"
            fullWidth
            value={tagFormData.name}
            onChange={(e) => setTagFormData({ ...tagFormData, name: e.target.value })}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleCloseDialog}>
            キャンセル
          </CancelButton>
          <Button
            onClick={handleSaveTag}
            disabled={!tagFormData.name.trim()}
            isLoading={createTagMutation.isPending || updateTagMutation.isPending}
          >
            {dialogMode === 'create' ? '作成' : '更新'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TagSelector; 