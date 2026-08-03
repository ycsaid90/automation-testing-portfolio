import {test as base} from "@playwright/test";

export {expect} from "@playwright/test";
import PageManager from "../POM/page-manager";
import RandomData from "../helpers/random-data";

export const test = base.extend({
    signUp: [async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const name = process.env.NAME;
        const email = process.env.USER_EMAIL;
        const password = process.env.USER_PASSWORD;
        const data = RandomData.getForm();
        const pageManager = new PageManager(page);
        await pageManager.loginPage.loginLink();
        await pageManager.registerUser.gotoSignup();
        await pageManager.registerUser.enterCredentials(name, email);
        await pageManager.registerUser.clickSignUpButton();
        await pageManager.registerUser.completeAccountInformation(name, email, password);
        await pageManager.registerUser.selectCheckBoxNewsletter();
        await pageManager.registerUser.selectCheckBoxSpecialOffers();
        await pageManager.registerUser.completeAddressInformation(data);
        await pageManager.registerUser.createAccountButton();
        await pageManager.registerUser.validateAccountCreated();
        await pageManager.registerUser.clickContinueButton();
        await use('signUp');
        await pageManager.registerUser.clickDeleteAccount();
        await pageManager.registerUser.validateDeletedAccount();
        await context.close();
    }, {scope: 'worker'}],
});