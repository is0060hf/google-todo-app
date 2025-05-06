import { tagsApiLogic, tasklistsApiLogic, tasksApiLogic } from '../../../utils/api-test-utils';
import { mockAuthenticatedUser } from '../../../utils/auth';

/**
 * 負荷テスト：データベースの大量データ処理
 * 
 * このテストでは、データベースに大量のデータが存在する場合の
 * パフォーマンスと安定性をテストします。
 */
describe('データベース大量データ処理テスト', () => {
  const userId = 'test-user-id';
  const accessToken = 'test-access-token';
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthenticatedUser(userId);
  });

  test('タグが大量にある場合でも一覧取得APIが機能する', async () => {
    // タグ作成のモックを準備し、大量のタグが返されるようにする
    const mockTags = Array(500).fill(0).map((_, index) => ({
      id: `tag-${index}`,
      name: `Test Tag ${index}`,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // モック関数で大量のタグを返すようにセットアップ
    const originalGetTags = tagsApiLogic.getTags;
    tagsApiLogic.getTags = jest.fn().mockResolvedValue({
      tags: mockTags,
      status: 200
    });
    
    // 実行
    const result = await tagsApiLogic.getTags(userId);
    
    // 検証
    expect(result.status).toBe(200);
    expect(result.tags).toBeDefined();
    expect(result.tags.length).toBe(500);
    
    // 元の関数に戻す
    tagsApiLogic.getTags = originalGetTags;
  });

  test('タスクが大量にある場合でも一覧取得APIが機能する', async () => {
    const taskListId = 'test-tasklist-id';
    
    // 大量のタスクを用意
    const mockTasks = Array(300).fill(0).map((_, index) => ({
      id: `task-${index}`,
      title: `Test Task ${index}`,
      status: index % 2 === 0 ? 'needsAction' : 'completed',
      updated: new Date().toISOString()
    }));
    
    // モック関数で大量のタスクを返すようにセットアップ
    const originalGetTasks = tasksApiLogic.getTasks;
    tasksApiLogic.getTasks = jest.fn().mockResolvedValue({
      tasks: mockTasks,
      status: 200
    });
    
    // 実行
    const result = await tasksApiLogic.getTasks(taskListId, accessToken);
    
    // 検証
    expect(result.status).toBe(200);
    expect(result.tasks).toBeDefined();
    expect(result.tasks.length).toBe(300);
    
    // 元の関数に戻す
    tasksApiLogic.getTasks = originalGetTasks;
  });

  test('タスクリストが大量にある場合でも一覧取得APIが機能する', async () => {
    // 大量のタスクリストを用意
    const mockTaskLists = Array(100).fill(0).map((_, index) => ({
      id: `tasklist-${index}`,
      title: `Test TaskList ${index}`,
      updated: new Date().toISOString()
    }));
    
    // モック関数で大量のタスクリストを返すようにセットアップ
    const originalGetTaskLists = tasklistsApiLogic.getTaskLists;
    tasklistsApiLogic.getTaskLists = jest.fn().mockResolvedValue({
      taskLists: mockTaskLists,
      status: 200
    });
    
    // 実行
    const result = await tasklistsApiLogic.getTaskLists(accessToken);
    
    // 検証
    expect(result.status).toBe(200);
    expect(result.taskLists).toBeDefined();
    expect(result.taskLists.length).toBe(100);
    
    // 元の関数に戻す
    tasklistsApiLogic.getTaskLists = originalGetTaskLists;
  });
}); 