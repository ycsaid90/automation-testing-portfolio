import {test, expect} from '@playwright/test';

export default class ContactUs {
    constructor(page) {
        this.page = page;
        this.contactUs = page.locator("a[href='/contact_us']");
        this.form = page.locator('div.contact-form');
        this.getInTouch = this.form.locator('h2:has-text("Get In Touch")');
        this.name = page.getByTestId('name');
        this.message = page.getByTestId('message');
        this.email = page.getByTestId('email');
        this.subject = page.getByTestId('subject');
        this.submitButton = page.getByTestId('submit-button');
    }

    async gotoContactUs() {
        await this.contactUs.click();
    }

    async getInTouchForm() {
        await expect(this.getInTouch).toBeVisible();
    }

    async enterContactFormDetails(name, email, subject, message) {
        await this.contactUs.click();
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.message.fill(message);
    }

    async uploadFile(filePath) {
        const fileInput = this.page.locator('[name="upload_file"]');
        await fileInput.setInputFiles(filePath);
    }

    async clickSubmitButton() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.submitButton.click();
    }

    async validateSuccessMessage() {
        const successMessage = this.page.locator('div.status.alert.alert-success');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Success! Your details have been submitted successfully.');
    }

    async clickHomeButton() {
        const formSection = this.page.locator('#form-section');
        await expect(formSection).toBeVisible();
        const homeButton = formSection.locator("a[href='/']");
        await expect(homeButton).toBeVisible();
        await expect(homeButton).toHaveText('Home');
        await homeButton.click();
    }
}