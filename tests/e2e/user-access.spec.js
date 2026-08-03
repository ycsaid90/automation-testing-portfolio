import {test, expect} from '../../fixtures/auth';
import PageManager from '../../POM/page-manager';
import RandomData from '../../helpers/random-data';

test('Test Case #1: Register New User', async ({page}) => {
    const pageManager = new PageManager(page);
    let email, name;
    let data = RandomData.getForm();

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on Signup / Login button', async () => {
        await pageManager.registerUser.gotoSignup();
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    });

    await test.step('Step 5: Verify New User Signup! is visible', async () => {
        await pageManager.registerUser.signUpForm();
    });

    await test.step('Step 6: Enter name and email address', async () => {
        name = RandomData.randomName();
        email = RandomData.randomEmail();
        await pageManager.registerUser.enterCredentials(name, email);
    });

    await test.step('Step 7: Click Signup button', async () => {
        await pageManager.registerUser.clickSignUpButton();
        await expect(page).toHaveURL(/.*\/signup/);
        await expect(page).toHaveTitle('Automation Exercise - Signup');
    });

    await test.step('Step 8: Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
        await pageManager.registerUser.verifyTittle();
    });

    await test.step('Step 9: Fill details: Tittle, Name, Email, Password, Date of Birthday', async () => {
        await pageManager.registerUser.completeAccountInformation(name, email, data.password);
    });

    await test.step('Step 10: Select checkbox Sign up for our newsletter!', async () => {
        await pageManager.registerUser.selectCheckBoxNewsletter();
    });

    await test.step('Step 11: Select" checkbox Receive special offers" from our partners!', async () => {
        await pageManager.registerUser.selectCheckBoxSpecialOffers();
    });

    await test.step('Step 12: Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
        await pageManager.registerUser.completeAddressInformation(data);
    });

    await test.step('Step 13: Click Create Account button', async () => {
        await pageManager.registerUser.createAccountButton();
    });

    await test.step('Step 14: Verify that ACCOUNT CREATED! is visible', async () => {
        await pageManager.registerUser.validateAccountCreated();
    });

    await test.step('Step 15: Click Continue button', async () => {
        await pageManager.registerUser.clickContinueButton();
    });

    await test.step('Step 16: Verify that Logged in as username is visible', async () => {
        await pageManager.registerUser.validateUserLogged(name);
    });

    await test.step('Step 17: Click Delete Account button', async () => {
        await pageManager.registerUser.clickDeleteAccount();
    });

    await test.step('Step 18: Verify that ACCOUNT DELETED! is visible and click Continue button', async () => {
        await pageManager.registerUser.validateDeletedAccount();
    });

});

test('Test Case #2: Login User with correct email and password ', async ({page, signUp}) => {
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    const username = process.env.NAME;
    const pageManager = new PageManager(page);

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on Signup / Login button', async () => {
        await pageManager.registerUser.gotoSignup();
    });

    await test.step('Step 5: Verify "Login to your account" is visible', async () => {
        await pageManager.loginPage.loginForm();
    });

    await test.step('Step 6: Enter correct email address and password', async () => {
        await pageManager.loginPage.login(email, password);
    })

    await test.step("Step 7: Click login button", async () => {
        await pageManager.loginPage.clickLoginButton();
    })

    await test.step("Step 8: Verify that 'Logged in as username' is visible", async () => {
        await pageManager.registerUser.validateUserLogged(username);
    });

    await test.step("Step 9: Click 'Delete Account' button", async () => {
        await pageManager.registerUser.clickDeleteAccount();
    });

    await test.step('Step 10: Verify that ACCOUNT DELETED! is visible', async () => {
        await pageManager.registerUser.validateDeletedAccount();
    });
})


test('Test Case #3: Login with incorrect email and password ', async ({page}) => {
    const pageManager = new PageManager(page);
    const email = 'incorrect@example.com';
    const password = 'incorrectpassword';

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on Signup / Login button', async () => {
        await pageManager.registerUser.gotoSignup();
    });

    await test.step('Step 5: Verify "Login to your account" is visible', async () => {
        await pageManager.loginPage.loginForm();
    });

    await test.step('Step 6: Enter incorrect email address and password', async () => {
        await pageManager.loginPage.login(email, password);
    })

    await test.step("Step 7: Click login button", async () => {
        await pageManager.loginPage.clickLoginButton();
    })

    await test.step("Step 8:  Verify error 'Your email or password is incorrect!' is visible", async () => {
        await pageManager.loginPage.validateLoginError();
    });


})

test('Test Case #4: Logout User ', async ({page, signUp}) => {
    const pageManager = new PageManager(page);
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    const username = process.env.NAME;

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on Signup / Login button', async () => {
        await pageManager.registerUser.gotoSignup();
    });

    await test.step('Step 5: Verify "Login to your account" is visible', async () => {
        await pageManager.loginPage.loginForm();
    });

    await test.step('Step 6: Enter correct email address and password', async () => {
        await pageManager.loginPage.login(email, password);
    })

    await test.step("Step 7: Click login button", async () => {
        await pageManager.loginPage.clickLoginButton();
    })

    await test.step("Step 8: Verify that 'Logged in as username' is visible", async () => {
        await pageManager.registerUser.validateUserLogged(username);
    });

    await test.step("Step 9: Click 'Logout' button", async () => {
        await pageManager.loginPage.logout();
    });

    await test.step("Step 10: Verify that user is navigated to login page", async () => {
        await pageManager.loginPage.verifyLoginPage();
    });
})

test('Test Case #5: Register User with existing email ', async ({page, signUp}) => {
    const pageManager = new PageManager(page);
    const name = RandomData.getForm().firstName;
    const email = process.env.USER_EMAIL;

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on "Signup / Login" button', async () => {
        await pageManager.registerUser.gotoSignup();
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    });

    await test.step('Step 5: Verify "New User Signup!" is visible', async () => {
        await pageManager.registerUser.signUpForm();
    });

    await test.step('Step 6: Enter name and already registered email address', async () => {
        await pageManager.registerUser.enterCredentials(name, email);
    });

    await test.step('Step 7: Click "Signup" button', async () => {
        await pageManager.registerUser.clickSignUpButton();
        await expect(page).toHaveURL(/.*\/signup/);
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    });

    await test.step('Step 8: Verify error "Email Address already exist!" is visible', async () => {
        await pageManager.registerUser.validateEmailExists();
    });

})