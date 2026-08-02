import "dotenv/config";
import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    timeout: 1_000,
    expect: {timeout: 5_000},
    workers: process.env.CI ? 1 : undefined,
    use: {
        baseURL: process.env.BE_URL,
        timezoneId: "America/New_York",
        extraHTTPHeaders: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    },
    projects: [
        {
            name: "api tests",
            use: {
                baseURL: 'https://automationexercise.com/api'
            },
            testMatch: "**/tests/api/*.spec.js",
        },
    ],
});
