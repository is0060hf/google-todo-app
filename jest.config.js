module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/e2e'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/api/**/*.ts',
    '<rootDir>/tests/utils/**/*.ts',
    '!<rootDir>/app/api/auth/**/*.ts', // nextAuthのファイルは除外
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 10000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@auth|next-auth|@prisma)/)'
  ]
}; 