module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests/e2e'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/api/**/*.ts',
    '!<rootDir>/app/api/auth/**/*.ts', // nextAuthのファイルは除外
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
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