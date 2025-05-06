import nock from 'nock';

// Google Tasks APIの基本URL
const API_BASE_URL = 'https://tasks.googleapis.com';

// モックデータ
export const mockTaskLists = [
  { id: 'tasklistid1', title: 'Test Task List 1', updated: '2023-01-01T00:00:00.000Z' },
  { id: 'tasklistid2', title: 'Test Task List 2', updated: '2023-01-02T00:00:00.000Z' }
];

export const mockTasks = {
  'tasklistid1': [
    { 
      id: 'taskid1', 
      title: 'Test Task 1', 
      notes: 'Task 1 notes', 
      status: 'needsAction',
      updated: '2023-01-01T00:00:00.000Z' 
    },
    { 
      id: 'taskid2', 
      title: 'Test Task 2', 
      notes: 'Task 2 notes', 
      status: 'needsAction',
      updated: '2023-01-02T00:00:00.000Z' 
    }
  ],
  'tasklistid2': [
    { 
      id: 'taskid3', 
      title: 'Test Task 3', 
      notes: 'Task 3 notes', 
      status: 'completed',
      completed: '2023-01-03T00:00:00.000Z',
      updated: '2023-01-03T00:00:00.000Z' 
    }
  ]
};

// Google Tasks APIをモックする関数
export function mockGoogleTasksApi() {
  // 既存のモックをクリア
  nock.cleanAll();

  // タスクリスト一覧取得のモック
  nock(API_BASE_URL)
    .get('/tasks/v1/users/@me/lists')
    .reply(200, { items: mockTaskLists });

  // タスクリスト作成のモック
  nock(API_BASE_URL)
    .post('/tasks/v1/users/@me/lists')
    .reply(201, (uri, requestBody) => {
      const body = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
      return {
        id: 'new-tasklist-id',
        title: body.title,
        updated: new Date().toISOString()
      };
    });

  // タスクリスト取得のモック
  mockTaskLists.forEach(taskList => {
    nock(API_BASE_URL)
      .get(`/tasks/v1/users/@me/lists/${taskList.id}`)
      .reply(200, taskList);
  });

  // タスクリスト更新のモック
  mockTaskLists.forEach(taskList => {
    nock(API_BASE_URL)
      .patch(`/tasks/v1/users/@me/lists/${taskList.id}`)
      .reply(200, (uri, requestBody) => {
        const body = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
        return {
          ...taskList,
          ...body,
          updated: new Date().toISOString()
        };
      });
  });

  // タスクリスト削除のモック
  mockTaskLists.forEach(taskList => {
    nock(API_BASE_URL)
      .delete(`/tasks/v1/users/@me/lists/${taskList.id}`)
      .reply(204);
  });

  // タスク一覧取得のモック
  Object.keys(mockTasks).forEach(taskListId => {
    nock(API_BASE_URL)
      .get(`/tasks/v1/lists/${taskListId}/tasks`)
      .reply(200, { items: mockTasks[taskListId] });
  });

  // タスク作成のモック
  Object.keys(mockTasks).forEach(taskListId => {
    nock(API_BASE_URL)
      .post(`/tasks/v1/lists/${taskListId}/tasks`)
      .reply(201, (uri, requestBody) => {
        const body = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
        return {
          id: `new-task-id-${Date.now()}`,
          title: body.title,
          notes: body.notes || '',
          status: body.status || 'needsAction',
          updated: new Date().toISOString()
        };
      });
  });

  // タスク更新のモック
  Object.keys(mockTasks).forEach(taskListId => {
    mockTasks[taskListId].forEach(task => {
      nock(API_BASE_URL)
        .patch(`/tasks/v1/lists/${taskListId}/tasks/${task.id}`)
        .reply(200, (uri, requestBody) => {
          const body = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
          return {
            ...task,
            ...body,
            updated: new Date().toISOString()
          };
        });
    });
  });

  // タスク削除のモック
  Object.keys(mockTasks).forEach(taskListId => {
    mockTasks[taskListId].forEach(task => {
      nock(API_BASE_URL)
        .delete(`/tasks/v1/lists/${taskListId}/tasks/${task.id}`)
        .reply(204);
    });
  });

  // タスク移動のモック
  Object.keys(mockTasks).forEach(taskListId => {
    mockTasks[taskListId].forEach(task => {
      nock(API_BASE_URL)
        .post(`/tasks/v1/lists/${taskListId}/tasks/${task.id}/move`)
        .query(true) // どんなクエリパラメータでもマッチさせる
        .reply(200, task);
    });
  });

  // ネットワークエラーのモック
  nock(API_BASE_URL)
    .get('/tasks/v1/users/@me/lists/error')
    .replyWithError('Network error');

  // 認証エラーのモック
  nock(API_BASE_URL)
    .get('/tasks/v1/users/@me/lists/unauthorized')
    .reply(401, { error: 'Unauthorized' });

  // サーバーエラーのモック
  nock(API_BASE_URL)
    .get('/tasks/v1/users/@me/lists/server-error')
    .reply(500, { error: 'Internal Server Error' });

  return nock;
} 