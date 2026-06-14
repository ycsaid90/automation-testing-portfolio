import {test,  expect} from "@playwright/test";
import PageManager from "./pageManager";
import {HelperBase} from "./helperBase";

    export default class RegisterUser  {
        constructor(page) {
            this.page = page;
            this.pageManager = new PageManager(page);
            this.loginLink = this.page.getByRole('link', { name: 'Signup / Login' });
            this.nameInput = this.page.getByTestId('signup-name');
            this.emailInput = this.page.getByTestId('signup-email');
            this.buttonSignup = this.page.getByTestId('signup-button');
            this.header = this.page.locator('#header');
            this.userLoggued = this.header.getByText('Logged in as', { exact: true });
            this.formText = this.page.getByText('Enter Account Information', { exact: true });
            this.radioGroup = this.page.getByTestId('title');
            this.radio1 = this.page.locator('#id_gender1');
            this.radio2 = this.page.locator('#id_gender2');
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
        }
        async gotoSignup() {
            await this.loginLink.click();
            await this.page.waitForURL(/.*\/login/);
        }

        async signup(name, email) {
            await this.nameInput.fill(`${name}`);
            await this.emailInput.fill(`${email}`);
            await this.buttonSignup.click();
        }

        async selectBirthday(month, day, year) {
            await this.daySelect.selectOption({ label: day.toString() });
            await this.monthSelect.selectOption({ label: month });
            await this.yearSelect.selectOption({ label: year.toString() });
        }

        async completeSignupForm(name, email, data) {
            await expect(this.formText).toBeVisible();
            await expect(this.name).toHaveValue(name);
            await expect(this.email).toHaveValue(email);
            await this.radio1.check();
            await this.firstName.fill(`${data.firstName}`);
            await this.lastName.fill(`${data.lastName}`);
            await this.password.fill(`${data.password}`);
            await this.company.fill(`${data.company} Inc.`);
            await this.selectBirthday('January', '1', '1990');
            await this.checkboxNews.check();
            await this.checkboxOffers.check();
            await this.address.fill(`${data.address}`);
            await this.address2.fill(`${data.address2}`);
            await this.city.fill(`${data.city}`);
            await this.state.fill(  `${data.state}`);
            await this.zipcode.fill(`${data.zipcode}`);
            await this.country.selectOption({ label: 'United States' });
            await this.phone.fill(`${data.phone}`);
            await this.submitButton.click();
        }

        async validateAccountCreation() {
            await expect(this.page).toHaveURL(/.*\/account_created/);
            await expect(this.page).toHaveTitle('Automation Exercise - Account Created');
            const accountCreated = await this.page.getByText('Account Created').isVisible();
            expect(accountCreated).toBeTruthy();
            await this.continueButton.click();
        }

        async validateUserLoggued(name) {
            const isVisible = await this.page.getByText(`Logged in as ${name}`).isVisible();
            expect(isVisible).toBeTruthy();
        }

        async validateDeleteAccount(){
            const deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
            await deleteAccountLink.click();
            const accountDeletedMessage = this.page.getByTestId('account-deleted');
            const text = (await accountDeletedMessage.textContent()).trim();
            expect(text).toBe('Account Deleted!');
            await expect(this.page).toHaveURL(/.*\/delete_account/);
        }

    }