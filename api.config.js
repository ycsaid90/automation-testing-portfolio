import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests/api',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    reporter: 'html',
    use: {
        // baseURL: 'https://automationexercise.com/',
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        }
    ]
});

