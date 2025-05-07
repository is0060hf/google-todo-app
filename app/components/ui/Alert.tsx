'use client';

import { useState, useEffect } from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, Snackbar, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export type AlertProps = MuiAlertProps & {
  message: string;
  description?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  onClose?: () => void;
  role?: string;
  snackbar?: boolean;
};

export type SnackbarAlertProps = Omit<AlertProps, 'snackbar'> & {
  open: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
};

/**
 * アラートコンポーネント
 * エラーメッセージやお知らせを表示するためのコンポーネント
 * アクセシビリティに配慮し、aria-live属性を適切に設定
 */
const Alert: React.FC<AlertProps> = ({
  message,
  description,
  severity = 'info',
  autoClose = false,
  autoCloseDelay = 6000,
  onClose,
  role = 'alert',
  snackbar = false,
  children,
  sx,
  ...props
}) => {
  const [open, setOpen] = useState(true);

  // 自動クローズの設定
  useEffect(() => {
    if (autoClose && open) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, open]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  // aria-live属性の設定（エラーの重要度に応じて）
  const ariaLive = severity === 'error' ? 'assertive' : 'polite';
  
  const alertContent = (
    <MuiAlert
      severity={severity}
      variant="filled"
      role={role}
      aria-live={ariaLive}
      action={
        <IconButton
          aria-label="閉じる"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{
        width: '100%',
        alignItems: 'flex-start',
        ...sx
      }}
      {...props}
    >
      <Box>
        <Typography variant="body1" component="div" fontWeight="medium">
          {message}
        </Typography>
        {description && (
          <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </MuiAlert>
  );

  // Snackbarとして表示するか、通常のAlertとして表示するか
  if (snackbar) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoClose ? autoCloseDelay : null}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {alertContent}
      </Snackbar>
    );
  }

  // 通常のAlertとして表示
  return open ? alertContent : null;
};

/**
 * スナックバー形式のアラートコンポーネント
 * 画面上部または下部に一時的に表示されるメッセージ
 */
export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity = 'info',
  autoClose = true,
  autoCloseDelay = 5000,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  ...props
}) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose?.();
  };

  // aria-live属性の設定（エラーの重要度に応じて）
  const ariaLive = severity === 'error' ? 'assertive' : 'polite';

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoClose ? autoCloseDelay : null}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <MuiAlert
        severity={severity}
        variant="filled"
        onClose={handleClose}
        role="alert"
        aria-live={ariaLive}
        sx={{ width: '100%' }}
        {...props}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export { Alert };
export default Alert; 