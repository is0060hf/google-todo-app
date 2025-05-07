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
  // 重要度に応じたaria-liveの値を設定
  const ariaLive = severity === 'error' || severity === 'warning' ? 'assertive' : 'polite';
  
  return (
    <MuiAlert 
      severity={severity} 
      role="alert" 
      aria-live={ariaLive}
      {...props}
    >
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
  // 重要度に応じたaria-liveの値を設定
  const ariaLive = severity === 'error' || severity === 'warning' ? 'assertive' : 'polite';
  
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
        role="alert"
        aria-live={ariaLive}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert; 