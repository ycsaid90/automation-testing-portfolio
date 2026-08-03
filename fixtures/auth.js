import {test as base} from "@playwright/test";
import PageManager from "../POM/page-manager";
import RandomData from "../helpers/random-data";

export {expect} from "@playwright/test";

export const test = base.extend({
    signUp: async ({browser, baseURL}, use) => {
        const context = await browser.newContext({baseURL});
        const page = await context.newPage();
        const pageManager = new PageManager(page);

        const data = RandomData.getForm();
        const user = {
            name: data.firstName,
            email: data.email,
            password: data.password,
        };

        await pageManager.loginPage.loginLink();
        await pageManager.registerUser.gotoSignup();
        await pageManager.registerUser.enterCredentials(user.name, user.email);
        await pageManager.registerUser.clickSignUpButton();
        await pageManager.registerUser.completeAccountInformation(user.name, user.email, user.password);
        await pageManager.registerUser.selectCheckBoxNewsletter();
        await pageManager.registerUser.selectCheckBoxSpecialOffers();
        await pageManager.registerUser.completeAddressInformation(data);
        await pageManager.registerUser.createAccountButton();
        await pageManager.registerUser.validateAccountCreated();
        await pageManager.registerUser.clickContinueButton();

        await use(user);

        await context.close();
    },
});