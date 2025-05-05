import { User, Priority, Tag } from '@prisma/client';

// Google Tasks API TaskList モデル
export interface GoogleTaskList {
  kind: string;           // "tasks#taskList"
  id: string;             // タスクリストID
  etag: string;           // ETagバージョン情報
  title: string;          // タスクリスト名
  updated: string;        // 更新日時 (RFC 3339形式)
  selfLink: string;       // 自己参照URI
}

// アプリケーション内部のタスクリストモデル
export interface AppTaskList {
  id: string;             // Google Tasks APIのタスクリストID
  title: string;          // タスクリスト名
  updatedAt: Date;        // 更新日時 (Date型)
  etag: string;           // 競合検出用ETag
}

// Google Tasks API Task モデル
export interface GoogleTask {
  kind: string;           // "tasks#task"
  id: string;             // タスクID
  etag: string;           // ETagバージョン情報
  title: string;          // タスクタイトル
  updated: string;        // 更新日時 (RFC 3339形式)
  selfLink: string;       // 自己参照URI
  parent?: string;        // 親タスクID (サブタスクの場合)
  position: string;       // タスクの位置情報
  notes?: string;         // タスクの説明文
  status: string;         // タスクのステータス ("needsAction" or "completed")
  due?: string;           // 期日 (RFC 3339形式)
  completed?: string;     // 完了日時 (RFC 3339形式、completedの場合のみ)
  deleted?: boolean;      // 削除フラグ
  hidden?: boolean;       // 非表示フラグ
  links?: Array<{         // 関連リンク
    type: string;
    description: string;
    link: string;
  }>;
}

// アプリケーション内部のタスクモデル (Google Task + 独自データ)
export interface AppTask {
  id: string;             // Google Tasks APIのタスクID
  title: string;          // タスクタイトル
  notes?: string;         // タスクの説明文
  status: "needsAction" | "completed"; // ステータス
  due?: Date | null;      // 期日 (Date型)
  completed?: Date | null; // 完了日時 (Date型)
  parent?: string | null; // 親タスクID
  position: string;       // 表示順
  taskListId: string;     // 所属タスクリストID
  etag: string;           // 競合検出用ETag
  updatedAt: Date;        // 更新日時 (Date型)
  
  // アプリケーション独自のカスタムデータ
  customData?: {
    id: string;           // TaskCustomDataのID
    priority?: {          // 優先度
      id: number;
      name: string;       // "High", "Medium", "Low"
      level: number;      // 3, 2, 1
    } | null;
    tags: {               // タグ（複数）
      id: string;
      name: string;
    }[];
  } | null;
}

// ダッシュボード統計データ取得のパラメータ
export interface StatsParams {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: string; // ISO形式の日付文字列 (例: '2023-12-01')
}

// ダッシュボード統計データ
export interface StatsData {
  completedCount: number;
  createdCount: number;
  completionRate: number | null;
  periodLabel: string; // 日付/週/月/年の表示ラベル
}

// 認証済みユーザー情報の型
export type SessionUser = {
  id: string;
  googleId: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  subscriptionPlan: string;
};

// Zustandストアの型
export interface AppState {
  // UI状態
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // 選択状態
  selectedTaskListId: string | null;
  setSelectedTaskListId: (id: string | null) => void;
  
  // フィルター設定
  taskFilters: {
    status: 'all' | 'completed' | 'incomplete';
    dueDateFilter: 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'overdue' | 'noDate' | 'customRange';
    priorityFilter: number[] | null; // 優先度IDの配列
    tagFilter: string[] | null; // タグIDの配列
    searchText: string;
  };
  setTaskFilters: (filters: Partial<AppState['taskFilters']>) => void;
  resetTaskFilters: () => void;
  
  // テーマ設定
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: AppState['theme']) => void;
} 