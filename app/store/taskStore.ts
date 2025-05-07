'use client';

import { create } from 'zustand';

// タスクリストの型定義
export interface TaskList {
  id: string;
  title: string;
}

// タスクの型定義
export interface Task {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
  completed?: string;
  taskListId: string;
  parent?: string;  // 親タスクのID
  position?: string; // タスクの表示順序
}

// タスクのカスタムデータの型定義
export interface TaskCustomData {
  taskId: string;
  userId: string;
  priorityId?: number;
  tags?: string[];
}

// 優先度の型定義
export interface Priority {
  id: number;
  name: string;
  color: string;
}

// タグの型定義
export interface Tag {
  id: string;
  name: string;
  userId: string;
}

// ストアの状態の型定義
interface TaskState {
  // タスクリスト
  taskLists: TaskList[];
  selectedTaskListId: string | null;
  setTaskLists: (taskLists: TaskList[]) => void;
  setSelectedTaskListId: (id: string | null) => void;
  
  // タスク
  tasks: Task[];
  selectedTaskId: string | null;
  setTasks: (tasks: Task[]) => void;
  setSelectedTaskId: (id: string | null) => void;
  getTaskById: (id: string) => Task | undefined;
  
  // フィルタリング・ソート
  filter: string;
  sortBy: 'title' | 'dueDate' | 'priority' | 'status';
  sortDirection: 'asc' | 'desc';
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: 'title' | 'dueDate' | 'priority' | 'status') => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  
  // 追加フィルター条件
  priorityFilter: number[];
  tagFilter: string[];
  statusFilter: 'all' | 'active' | 'completed';
  dueDateFilter: 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek' | 'future';
  setPriorityFilter: (priorityIds: number[]) => void;
  setTagFilter: (tagIds: string[]) => void;
  setStatusFilter: (status: 'all' | 'active' | 'completed') => void;
  setDueDateFilter: (dueDate: 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek' | 'future') => void;
  resetFilters: () => void;
  
  // モーダル状態
  isTaskModalOpen: boolean;
  modalMode: 'create' | 'edit' | 'view';
  openTaskModal: (mode: 'create' | 'edit' | 'view', taskId?: string) => void;
  closeTaskModal: () => void;
  
  // カスタムデータ
  customData: Record<string, TaskCustomData>;
  priorities: Priority[];
  tags: Tag[];
  setCustomData: (customData: Record<string, TaskCustomData>) => void;
  setPriorities: (priorities: Priority[]) => void;
  setTags: (tags: Tag[]) => void;
}

// Zustandストアの作成
export const useTaskStore = create<TaskState>((set, get) => ({
  // タスクリスト
  taskLists: [],
  selectedTaskListId: null,
  setTaskLists: (taskLists) => set({ taskLists }),
  setSelectedTaskListId: (id) => set({ selectedTaskListId: id }),
  
  // タスク
  tasks: [],
  selectedTaskId: null,
  setTasks: (tasks) => set({ tasks }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  getTaskById: (id) => get().tasks.find(task => task.id === id),
  
  // フィルタリング・ソート
  filter: '',
  sortBy: 'dueDate',
  sortDirection: 'asc',
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (direction) => set({ sortDirection: direction }),
  
  // 追加フィルター条件
  priorityFilter: [],
  tagFilter: [],
  statusFilter: 'all',
  dueDateFilter: 'all',
  setPriorityFilter: (priorityIds) => set({ priorityFilter: priorityIds }),
  setTagFilter: (tagIds) => set({ tagFilter: tagIds }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDueDateFilter: (dueDate) => set({ dueDateFilter: dueDate }),
  resetFilters: () => set({ 
    filter: '', 
    priorityFilter: [], 
    tagFilter: [], 
    statusFilter: 'all', 
    dueDateFilter: 'all' 
  }),
  
  // モーダル状態
  isTaskModalOpen: false,
  modalMode: 'view',
  openTaskModal: (mode, taskId) => set({ 
    isTaskModalOpen: true, 
    modalMode: mode,
    ...(taskId ? { selectedTaskId: taskId } : {})
  }),
  closeTaskModal: () => set({ isTaskModalOpen: false, selectedTaskId: null }),
  
  // カスタムデータ
  customData: {},
  priorities: [],
  tags: [],
  setCustomData: (customData) => set({ customData }),
  setPriorities: (priorities) => set({ priorities }),
  setTags: (tags) => set({ tags }),
}));

// 表示用にフィルタリング・ソートされたタスクリストを取得するセレクタ
export function useFilteredTasks() {
  return useTaskStore(state => {
    const { 
      tasks, 
      filter, 
      sortBy, 
      sortDirection, 
      selectedTaskListId,
      customData,
      priorityFilter,
      tagFilter,
      statusFilter,
      dueDateFilter
    } = state;
    
    // 選択中のタスクリストのタスクのみ表示
    let filteredTasks = selectedTaskListId
      ? tasks.filter(task => task.taskListId === selectedTaskListId)
      : tasks;
    
    // テキストでフィルタリング
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(lowerFilter) || 
        (task.notes && task.notes.toLowerCase().includes(lowerFilter))
      );
    }
    
    // ステータスでフィルタリング
    if (statusFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => {
        return statusFilter === 'active' 
          ? task.status === 'needsAction' 
          : task.status === 'completed';
      });
    }
    
    // 優先度でフィルタリング
    if (priorityFilter.length > 0) {
      filteredTasks = filteredTasks.filter(task => {
        const taskCustomData = customData[task.id];
        return taskCustomData && 
               taskCustomData.priorityId !== undefined && 
               priorityFilter.includes(taskCustomData.priorityId);
      });
    }
    
    // タグでフィルタリング
    if (tagFilter.length > 0) {
      filteredTasks = filteredTasks.filter(task => {
        const taskCustomData = customData[task.id];
        return taskCustomData && 
               taskCustomData.tags && 
               taskCustomData.tags.some(tagId => tagFilter.includes(tagId));
      });
    }
    
    // 期限でフィルタリング
    if (dueDateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(thisWeekEnd.getDate() + (7 - thisWeekEnd.getDay()));
      
      const nextWeekStart = new Date(thisWeekEnd);
      nextWeekStart.setDate(nextWeekStart.getDate() + 1);
      
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
      
      filteredTasks = filteredTasks.filter(task => {
        if (!task.due) return dueDateFilter === 'future'; // 期限なしはfutureとして扱う
        
        const dueDate = new Date(task.due);
        dueDate.setHours(0, 0, 0, 0);
        
        switch (dueDateFilter) {
          case 'overdue':
            return dueDate < today;
          case 'today':
            return dueDate.getTime() === today.getTime();
          case 'tomorrow':
            return dueDate.getTime() === tomorrow.getTime();
          case 'thisWeek':
            return dueDate >= today && dueDate <= thisWeekEnd;
          case 'nextWeek':
            return dueDate >= nextWeekStart && dueDate <= nextWeekEnd;
          case 'future':
            return dueDate > thisWeekEnd;
          default:
            return true;
        }
      });
    }
    
    // ソート
    filteredTasks.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'dueDate':
          // due dateがない場合は最後に表示
          if (!a.due && !b.due) comparison = 0;
          else if (!a.due) comparison = 1;
          else if (!b.due) comparison = -1;
          else comparison = new Date(a.due).getTime() - new Date(b.due).getTime();
          break;
        case 'priority':
          // 優先度でソート
          const aPriority = customData[a.id]?.priorityId || 0;
          const bPriority = customData[b.id]?.priorityId || 0;
          comparison = bPriority - aPriority; // 高優先度（数字が大きい）が先
          break;
        case 'status':
          comparison = a.status === b.status ? 0 : (a.status === 'completed' ? 1 : -1);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return filteredTasks;
  });
} 