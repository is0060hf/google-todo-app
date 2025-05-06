import { getServerSession } from 'next-auth';

/**
 * 認証済みユーザーのセッションをモックする
 */
export function mockAuthenticatedUser(userId = 'test-user-id') {
  (getServerSession as jest.Mock).mockImplementation(() => ({
    user: {
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://example.com/avatar.jpg',
    },
    accessToken: 'mock-access-token'
  }));
}

/**
 * 未認証状態をモックする
 */
export function mockUnauthenticatedUser() {
  (getServerSession as jest.Mock).mockImplementation(() => null);
}

/**
 * アクセストークンが欠落した状態をモックする
 */
export function mockMissingAccessToken() {
  (getServerSession as jest.Mock).mockImplementation(() => ({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
    },
    // アクセストークンが欠落
    accessToken: undefined
  }));
}

/**
 * 利用規約に同意していないユーザーをモックする
 */
export function mockUserNotAgreedToTerms() {
  (getServerSession as jest.Mock).mockImplementation(() => ({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      agreedToTerms: false,
    },
    accessToken: 'mock-access-token'
  }));
}

/**
 * 利用規約に同意したユーザーをモックする
 */
export function mockUserAgreedToTerms() {
  (getServerSession as jest.Mock).mockImplementation(() => ({
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      agreedToTerms: true,
    },
    accessToken: 'mock-access-token'
  }));
} 