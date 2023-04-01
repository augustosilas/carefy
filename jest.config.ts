export default {
  coverageProvider: "v8",
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testEnvironment: "node",
  testMatch: ['**/*.test.ts'],
  preset: 'ts-jest'
};