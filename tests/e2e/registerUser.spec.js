import {test, expect} from '@playwright/test';
import PageManager from '../../POM/pageManager';
import RandomData from '../../helpers/random-data';

test.describe('Test Case#1: Register new user', () => {
    let pageManager;

    test.beforeEach(async ({page}) => {
        await page.goto('/');
        pageManager = new PageManager(page);
    });

    test('should navigate to the homepage and verify the title', async ({page}) => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    test('should navigate to the register page and verify the URL', async ({page}) => {
        await pageManager.registerUser.gotoSignup();
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    });

    test('validate new user sign up', async ({page}) => {
        const name = RandomData.randomName();
        const email = RandomData.randomEmail();
        await pageManager.registerUser.gotoSignup();
        await pageManager.registerUser.signup(name, email);
        await expect(page).toHaveURL(/.*\/signup/);
        await expect(page).toHaveTitle('Automation Exercise - Signup');
        console.log(`✅ Successfully generated user with Name: ${name} and Email: ${email}`);
        await pageManager.registerUser.completeSignupForm(name, email, RandomData.getForm());
        await pageManager.registerUser.validateAccountCreation();
        await pageManager.registerUser.validateUserLoggued(name);
        await pageManager.registerUser.validateDeleteAccount();
    });
})




