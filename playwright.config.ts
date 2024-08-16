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
            filename: 'index.html'
        }]
    ],
    use: {
        baseURL: BASE_URL, 
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'API TEST',
            testMatch: /.*\.api\.spec\.ts$/, // Solo ejecuta archivos que terminan en .api.spec.ts
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Web TEST',
            testMatch: /.*\.web\.spec\.ts$/, // Solo ejecuta archivos que terminan en .web.spec.ts
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
