import {defineConfig, devices} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({quiet: true});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    timeout: 30 * 1000,
    workers: process.env.CI ? 5 : undefined,
    reporter: [
        ["html", {open: "always"}],
        ["github"]
    ],
    use: {
        viewport: {width: 1280, height: 720},
        testIdAttribute: 'data-qa',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                baseURL: 'https://automationexercise.com/',
            },
            testDir: './tests/e2e',
        },
    ],
});

