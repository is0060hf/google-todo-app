'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

/**
 * アプリケーション全体で使用するカスタムボタンコンポーネント
 * Material UIのボタンをラップし、独自の機能（ローディング状態など）を追加
 */
export function Button({ 
  children, 
  isLoading = false, 
  disabled = false, 
  variant = 'contained', 
  color = 'primary',
  ...props 
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'ローディング中...' : children}
    </MuiButton>
  );
}

/**
 * 二次操作用のボタン
 */
export function SecondaryButton(props: ButtonProps) {
  return <Button variant="outlined" color="secondary" {...props} />;
}

/**
 * 危険な操作用のボタン
 */
export function DangerButton(props: ButtonProps) {
  return <Button variant="contained" color="error" {...props} />;
}

/**
 * キャンセル用のボタン
 */
export function CancelButton(props: ButtonProps) {
  return <Button variant="text" color="inherit" {...props} />;
}

export default Button; 