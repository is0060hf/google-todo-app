'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SnackbarAlert } from './Alert';
import { useFeedbackStore } from '../../lib/feedback';

/**
 * フィードバック通知コンポーネント
 * アプリケーション全体で使用されるフィードバック通知を表示する
 */
export default function FeedbackNotifications() {
  const { messages, hideMessage, removeMessage } = useFeedbackStore();
  const { t } = useTranslation('common');

  // メッセージが表示されたときにスクリーンリーダーに通知するための効果
  useEffect(() => {
    const visibleMessages = messages.filter(msg => msg.visible);
    if (visibleMessages.length > 0) {
      // アクセシビリティのために最新のメッセージをアナウンス
      document.getElementById('feedback-live-region')?.setAttribute('aria-label', visibleMessages[0].message);
    }
  }, [messages]);

  // フィードバックメッセージがないときは何も表示しない
  if (messages.length === 0) {
    return (
      <div 
        id="feedback-live-region" 
        aria-live="polite" 
        className="sr-only"
      />
    );
  }

  return (
    <>
      <div 
        id="feedback-live-region" 
        aria-live="polite" 
        className="sr-only"
      />
      {messages.map((message) => (
        <SnackbarAlert
          key={message.id}
          open={message.visible}
          message={message.message}
          severity={message.type}
          onClose={() => {
            hideMessage(message.id);
            // アニメーション完了後にメッセージを完全に削除
            setTimeout(() => removeMessage(message.id), 300);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      ))}
    </>
  );
} 