'use client';

import React from 'react';
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
} from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'error'> {
  name: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * カスタムテキストフィールドコンポーネント
 * エラー処理やアイコン表示を強化
 */
export function TextField({
  label,
  name,
  error,
  required = false,
  helperText,
  startIcon,
  endIcon,
  ...props
}: TextFieldProps) {
  return (
    <FormControl 
      fullWidth 
      variant="outlined" 
      error={!!error}
      required={required}
      margin="normal"
    >
      {label && (
        <InputLabel htmlFor={name} error={!!error} required={required}>
          {label}
        </InputLabel>
      )}
      <MuiTextField
        id={name}
        name={name}
        label={label}
        error={!!error}
        required={required}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }}
        {...props}
      />
      {(helperText || error) && (
        <FormHelperText error={!!error}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default TextField; 