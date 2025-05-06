'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

/**
 * 言語切り替えコンポーネント
 * 日本語と英語の切り替えが可能
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (
    _: React.MouseEvent<HTMLElement>,
    newLanguage: string | null
  ) => {
    if (newLanguage) {
      i18n.changeLanguage(newLanguage);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="言語切替 / Language">
        <LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />
      </Tooltip>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language selector"
        size="small"
      >
        <ToggleButton value="ja" aria-label="Japanese">
          日本語
        </ToggleButton>
        <ToggleButton value="en" aria-label="English">
          English
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default LanguageSwitcher; 