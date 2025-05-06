import { tagsApiLogic, tasklistsApiLogic, tasksApiLogic } from '../../../utils/api-test-utils';
import { mockAuthenticatedUser } from '../../../utils/auth';

/**
 * 負荷テスト：APIエンドポイントの同時多数リクエスト処理
 * 
 * このテストでは、複数の同時リクエストをAPIロジックに送信して負荷をかけ、
 * システムの安定性と応答性をテストします。
 */
describe('APIエンドポイント負荷テスト', () => {
  const userId = 'test-user-id';
  const taskListId = 'test-tasklist-id';
  const accessToken = 'test-access-token';
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthenticatedUser(userId);
  });

  test('タグ一覧取得APIが大量の同時リクエストを処理できる', async () => {
    // 大量のリクエストを同時に送信
    const concurrentRequests = 20;
    const promises = Array(concurrentRequests).fill(0).map(() => 
      tagsApiLogic.getTags(userId)
    );
    
    // 同時実行
    const results = await Promise.all(promises);
    
    // 全てのリクエストが成功していることを確認
    const successfulRequests = results.filter((result: any) => result.status === 200);
    expect(successfulRequests.length).toBe(concurrentRequests);
  });

  test('タスクリスト一覧取得APIが同時多数リクエストを処理できる', async () => {
    // 大量のリクエストを同時に送信
    const concurrentRequests = 10;
    const promises = Array(concurrentRequests).fill(0).map(() => 
      tasklistsApiLogic.getTaskLists(accessToken)
    );
    
    // 同時実行
    const results = await Promise.all(promises);
    
    // 全てのリクエストが成功していることを確認
    const successfulRequests = results.filter((result: any) => result.status === 200);
    expect(successfulRequests.length).toBe(concurrentRequests);
  });

  test('タスク一覧取得APIが同時多数リクエストを処理できる', async () => {
    // 大量のリクエストを同時に送信
    const concurrentRequests = 10;
    const promises = Array(concurrentRequests).fill(0).map(() => 
      tasksApiLogic.getTasks(taskListId, accessToken)
    );
    
    // 同時実行
    const results = await Promise.all(promises);
    
    // 全てのリクエストが成功していることを確認
    const successfulRequests = results.filter((result: any) => result.status === 200);
    expect(successfulRequests.length).toBe(concurrentRequests);
  });

  test('複数タイプのAPIが並行して実行されても正しく処理される', async () => {
    // 異なるAPIを組み合わせて同時に実行
    const mixedPromises = [
      tagsApiLogic.getTags(userId),
      tasklistsApiLogic.getTaskLists(accessToken),
      tasksApiLogic.getTasks(taskListId, accessToken),
      tagsApiLogic.getTags(userId),
      tasklistsApiLogic.getTaskLists(accessToken),
      tasksApiLogic.getTasks(taskListId, accessToken)
    ];
    
    // 同時実行
    const results = await Promise.all(mixedPromises);
    
    // 全てのリクエストが成功していることを確認
    const successfulRequests = results.filter((result: any) => result.status === 200);
    expect(successfulRequests.length).toBe(mixedPromises.length);
  });
}); 