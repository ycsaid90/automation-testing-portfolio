import {test, expect} from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = this.page.getByTestId('login-email');
        this.passwordInput = this.page.getByTestId('login-password');
        this.buttonLogin = this.page.getByTestId('login-button');
    }

    async loginLink() {
        await this.page.goto('/login');
        await this.page.waitForURL(/.*\/login/);
    }

    async loginForm() {
        await expect(this.page.getByText('Login to your account', {exact: true})).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.buttonLogin).toBeVisible();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.buttonLogin.click();
    }

    async validateLoginError() {
        await expect(this.page.getByText('Your email or password is incorrect!', {exact: true})).toBeVisible();
    }

    async logout() {
        await this.page.getByRole('link', {name: 'Logout'}).click();
    }

    async verifyLoginPage() {
        await this.page.waitForURL(/.*\/login/)
    }
}