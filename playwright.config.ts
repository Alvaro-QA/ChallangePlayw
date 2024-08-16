import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './config/environments';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 2,
    reporter: [
        ['list'],
        ['html', {
            open: 'always',
            outputFolder: 'playwright-report',
            filename: 'index.html',
            attachment: true,
        }]
    ],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'API TEST',
            testMatch: /.*\.api\.spec\.ts$/,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Web TEST',
            testMatch: /.*\.web\.spec\.ts$/,
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
