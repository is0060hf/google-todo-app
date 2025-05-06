'use client';

import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, Snackbar, SnackbarProps } from '@mui/material';

export interface AlertProps extends MuiAlertProps {
  message: string;
}

/**
 * アラートコンポーネント
 */
export function Alert({ message, severity = 'info', ...props }: AlertProps) {
  return (
    <MuiAlert severity={severity} {...props}>
      {message}
    </MuiAlert>
  );
}

export interface SnackbarAlertProps extends Omit<SnackbarProps, 'children'> {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  onClose?: () => void;
}

/**
 * スナックバーアラートコンポーネント - 一時的な通知用
 */
export function SnackbarAlert({
  message,
  severity = 'info',
  open,
  onClose,
  autoHideDuration = 6000,
  ...props
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      {...props}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert; 