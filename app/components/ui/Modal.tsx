'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, CancelButton } from './Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actions?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  description?: string;
}

/**
 * アプリケーション全体で使用する再利用可能なモーダルコンポーネント
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  actions,
  confirmText,
  onConfirm,
  cancelText = 'キャンセル',
  confirmDisabled = false,
  confirmLoading = false,
  description,
}: ModalProps) {
  // モーダルのIDを作成（タイトルとコンテンツのラベル用）
  const titleId = `modal-title-${React.useId()}`;
  const contentId = `modal-content-${React.useId()}`;

  // デフォルトのアクションボタン（確定とキャンセル）
  const defaultActions = (
    <>
      <CancelButton onClick={onClose}>
        {cancelText}
      </CancelButton>
      {confirmText && onConfirm && (
        <Button 
          onClick={onConfirm}
          disabled={confirmDisabled}
          isLoading={confirmLoading}
        >
          {confirmText}
        </Button>
      )}
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      <DialogTitle id={titleId}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers id={contentId}>
        {description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
        )}
        {children}
      </DialogContent>
      {(actions || confirmText) && (
        <DialogActions>
          {actions || defaultActions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default Modal; 