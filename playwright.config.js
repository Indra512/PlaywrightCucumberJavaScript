import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['junit', { outputFile: 'reports/junit-report.xml' }]],
  use: {
    headless: true,
  },
});
