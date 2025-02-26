import { defineConfig } from '@playwright/test';
import { AppetizeTestOptions } from '@appetize/playwright';

import { TOKENS } from './constants/constants';

const isCI = process.env.CI;

const commonReportOptions = {
  detail: false,
  suiteTitle: false,
  resultsDir: isCI ? `${process.env.ALLURE_DIR}/allure-results` : 'allure-results',
};

export default defineConfig<AppetizeTestOptions>({
  testDir: './src/tests',
  outputDir: 'test-results/',
  timeout: 120 * 1000,
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  reporter: isCI
    ? [
      ['dot'],
      [
        'allure-playwright',
        {
          environmentInfo: {
            ENVID: process.env.ENVID,
            OS: process.platform,
            NODE_VERSION: process.version,
          },
          ...commonReportOptions,
        },
      ],
    ]
    : [['line'], ['allure-playwright', commonReportOptions]],
  workers: 1,
  fullyParallel: false,
  use: {
    headless: false,
    trace: 'retain-on-failure',
    baseURL: 'https://appetize.io',
  },
  projects: [
    {
      name: 'android',
      use: {
        config: {
          device: 'pixel7',
          publicKey: TOKENS.android,
          osVersion: '13.0',
        },
      },
    },
    {
      name: 'ios',
      use: {
        config: {
          device: 'iphone14pro',
          publicKey: TOKENS.ios,
          osVersion: '16.2',
        },
      },
    },
  ],
});
