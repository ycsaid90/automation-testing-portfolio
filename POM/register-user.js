import {test, expect} from "@playwright/test";
import PageManager from "./page-manager";
import {HelperBase} from "./login";

export default class RegisterUser {
    constructor(page) {
        this.page = page;
        this.pageManager = new PageManager(page);
        this.loginLink = this.page.getByRole('link', {name: 'Signup / Login'});
        this.nameInput = this.page.getByTestId('signup-name');
        this.emailInput = this.page.getByTestId('signup-email');
        this.buttonSignup = this.page.getByTestId('signup-button');
        this.header = this.page.locator('#header');
        this.userLoggued = this.header.getByText('Logged in as', {exact: true});
        this.formText = this.page.getByText('Enter Account Information', {exact: true});
        this.radioGroup = this.page.getByLabel('Title');
        this.radio1 = this.page.locator('#uniform-id_gender1');
        this.radio2 = this.page.locator('#uniform-id_gender2');
        this.name = this.page.getByTestId('name');
        this.email = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.firstName = this.page.getByTestId('first_name');
        this.lastName = this.page.getByTestId('last_name');
        this.company = this.page.getByTestId('company');
        this.address = this.page.getByTestId('address');
        this.address2 = this.page.getByTestId('address2');
        this.city = this.page.getByTestId('city');
        this.state = this.page.getByTestId('state');
        this.zipcode = this.page.getByTestId('zipcode');
        this.country = this.page.getByTestId('country');
        this.phone = this.page.getByTestId('mobile_number');
        this.submitButton = this.page.getByTestId('create-account');
        this.daySelect = this.page.getByTestId('days');
        this.monthSelect = this.page.getByTestId('months');
        this.yearSelect = this.page.getByTestId('years');
        this.checkboxNews = this.page.locator('#newsletter');
        this.checkboxOffers = this.page.locator('#optin');
        this.continueButton = this.page.getByTestId('continue-button');
        this.newUserform = this.page.locator('div.signup-form');
    }

    async gotoSignup() {
        await this.loginLink.click();
        await this.page.waitForURL(/.*\/login/);
    }

    async clickSignUpButton() {
        await this.buttonSignup.click();
    }

    async signUpForm() {
        await expect(this.newUserform).toBeVisible();
        await this.page.getByText('New User Signup!', {exact: true});
        await expect(this.emailInput).toBeVisible();
        await expect(this.nameInput).toBeVisible();
        await expect(this.buttonSignup).toBeVisible();
    }


    async enterCredentials(name, email) {
        await this.nameInput.fill(`${name}`);
        await this.emailInput.fill(`${email}`);
    }

    async selectBirthday(month, day, year) {
        await this.daySelect.selectOption({label: day.toString()});
        await this.monthSelect.selectOption({label: month});
        await this.yearSelect.selectOption({label: year.toString()});
    }

    async completeAccountInformation(name, email, password) {
        await expect(this.formText).toBeVisible();
        await this.page.getByText('Title', {exact: true});
        await expect(this.name).toHaveValue(name);
        await expect(this.email).toHaveValue(email);
        await this.password.fill(password);
        await this.selectBirthday('January', '1', '1990');
    }

    async completeAddressInformation(data) {
        await this.firstName.fill(`${data.firstName}`);
        await this.lastName.fill(`${data.lastName}`);
        await this.company.fill(`${data.company} Inc.`);
        await this.address.fill(`${data.address}`);
        await this.address2.fill(`${data.address2}`);
        await this.city.fill(`${data.city}`);
        await this.state.fill(`${data.state}`);
        await this.zipcode.fill(`${data.zipCode}`);
        await this.country.selectOption({label: 'United States'});
        await this.phone.fill(`${data.phoneNumber}`);
    }

    async verifyTittle() {
        await expect(this.page.locator('b:has-text("ENTER ACCOUNT INFORMATION")')).toBeVisible();
    }

    async selectCheckBoxNewsletter() {
        await this.checkboxNews.check();
        await expect(this.checkboxNews).toBeChecked();
    }

    async selectCheckBoxSpecialOffers() {
        await this.checkboxOffers.check();
        await expect(this.checkboxOffers).toBeChecked();
    }

    async createAccountButton() {
        await this.submitButton.click();
    }

    async validateAccountCreated() {
        await expect(this.page).toHaveURL(/.*\/account_created/);
        await expect(this.page).toHaveTitle('Automation Exercise - Account Created');
        const accountCreated = await this.page.getByText('Account Created').isVisible();
        expect(accountCreated).toBeTruthy();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async validateUserLogged(name) {
        const userLogged = await this.page.locator(`li:has-text(" Logged in as ${name}")`);
        await expect(userLogged).toBeVisible();
    }

    async clickDeleteAccount() {
        const deleteAccountLink = this.page.getByRole('link', {name: 'Delete Account'});
        await deleteAccountLink.click();
    }

    async validateDeletedAccount() {
        await expect(this.page.getByTestId('account-deleted')).toHaveText('Account Deleted!');
        await expect(this.page).toHaveURL(/.*\/delete_account/);
    }

    async validateEmailExists() {
        const emailExistsMessage = this.page.getByText('Email Address already exist!', {exact: true})
        await emailExistsMessage.isVisible();
    }

}