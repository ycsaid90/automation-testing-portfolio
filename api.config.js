import "dotenv/config";
import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: "./tests/api",
    timeout: 15_000,
    expect: {timeout: 3_000},
    workers: process.env.CI ? 1 : undefined,
    use: {
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
                baseURL: 'https://automationexercise.com'
            },
        }
    ],
});
