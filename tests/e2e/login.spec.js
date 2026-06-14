import {test, expect} from '@playwright/test';
import PageManager from '../../POM/pageManager';

test.describe('Test Case#2: Login Page ', () => {
    let pageManager;
    let email = process.env.USER_EMAIL;
    let password = process.env.USER_PASSWORD;

    test.beforeEach(async ({page}) => {
        await page.goto('/login');
        pageManager = new PageManager(page);
    });

    test("should navigate to the login page and verify the URL", async ({page}) => {
        await pageManager.loginPage.login(email, password);
    })

})