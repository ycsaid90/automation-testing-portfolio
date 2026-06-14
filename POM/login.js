import { test, expect } from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.buttonLogin = page.getByTestId('login-button');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.buttonLogin.click();
    }
}