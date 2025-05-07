'use client';

import { create } from 'zustand';

export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  message: string;
  visible: boolean;
}

interface FeedbackState {
  messages: FeedbackMessage[];
  addMessage: (type: FeedbackType, message: string) => void;
  removeMessage: (id: string) => void;
  hideMessage: (id: string) => void;
}

// フィードバックステートの管理
export const useFeedbackStore = create<FeedbackState>((set) => ({
  messages: [],
  addMessage: (type, message) => {
    const id = Date.now().toString();
    set((state) => ({
      messages: [...state.messages, { id, type, message, visible: true }],
    }));
    
    // 5秒後に自動的に非表示にする
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === id ? { ...msg, visible: false } : msg
        ),
      }));
      
      // 非表示後にメッセージを削除する（アニメーション用）
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        }));
      }, 300); // アニメーション時間に合わせる
    }, 5000);
  },
  hideMessage: (id) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, visible: false } : msg
      ),
    })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));

// 便利なフィードバック表示関数
export const showFeedback = {
  success: (message: string) => useFeedbackStore.getState().addMessage('success', message),
  error: (message: string) => useFeedbackStore.getState().addMessage('error', message),
  info: (message: string) => useFeedbackStore.getState().addMessage('info', message),
  warning: (message: string) => useFeedbackStore.getState().addMessage('warning', message),
}; 