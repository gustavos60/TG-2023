/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '../../',
  testMatch: ['<rootDir>/e2e/appium/**/*.test.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  verbose: true,
};
