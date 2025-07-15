module.exports = {
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '..'], // Look in node_modules and the parent directory of tests (backend)
  testMatch: [
    '**/__tests__/**/*.test.js'
  ]
};