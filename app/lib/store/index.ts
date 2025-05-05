import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '../../types';

// デフォルトのフィルター設定
const defaultFilters = {
  status: 'all' as const,
  dueDateFilter: 'all' as const,
  priorityFilter: null,
  tagFilter: null,
  searchText: '',
};

// ストアの作成
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // UI状態
      isSidebarOpen: true,
      setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
      
      // 選択状態
      selectedTaskListId: null,
      setSelectedTaskListId: (id: string | null) => set({ selectedTaskListId: id }),
      
      // フィルター設定
      taskFilters: {
        ...defaultFilters,
      },
      setTaskFilters: (filters: Partial<AppState['taskFilters']>) => 
        set((state: AppState) => ({ 
          taskFilters: { ...state.taskFilters, ...filters } 
        })),
      resetTaskFilters: () => set({ taskFilters: { ...defaultFilters } }),
      
      // テーマ設定
      theme: 'system' as const,
      setTheme: (theme: AppState['theme']) => set({ theme }),
    }),
    {
      name: 'google-todo-store',
      partialize: (state) => ({
        theme: state.theme,
        selectedTaskListId: state.selectedTaskListId,
      }),
    }
  )
); 