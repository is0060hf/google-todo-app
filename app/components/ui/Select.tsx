'use client';

import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps as MuiSelectProps,
} from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, 'error'> {
  name: string;
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

/**
 * カスタム選択コンポーネント
 */
export function Select({
  name,
  label,
  options,
  error,
  helperText,
  required = false,
  ...props
}: SelectProps) {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={!!error}
      required={required}
      margin="normal"
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-label`}
        id={name}
        name={name}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default Select; 