import {test, expect} from '@playwright/test';
import PageManager from '../../POM/pageManager';
import RandomData from '../../helpers/randomData';
import path from 'path';

test('Test Case #6: Contact Us Form ', async ({page}) => {
    const pageManager = new PageManager(page);

    await test.step('Step 2: Navigate to url', async () => {
        await page.goto('/');
    });

    await test.step('Step 3: Verify that home page is visible successfully', async () => {
        await expect(page).toHaveTitle('Automation Exercise');
    });

    await test.step('Step 4: Click on "Contact Us" button', async () => {
        await pageManager.contactUs.gotoContactUs();
        await expect(page).toHaveTitle('Automation Exercise - Contact Us');
    });

    await test.step('Step 5: Verify "Get In Touch" is visible', async () => {
        await pageManager.contactUs.getInTouchForm();
    });

    await test.step('Step 6: Enter name, email, subject and message', async () => {
        const {firstName, email, subject, message} = RandomData.getForm();
        await pageManager.contactUs.enterContactFormDetails(firstName, email, subject, message);
    });

    await test.step('Step 7: Upload file', async () => {
        const imagePath = path.join(__dirname, '../../images/OIP.jpg');
        await pageManager.contactUs.uploadFile(imagePath);
    });

    await test.step('Step 8 & 9: Click "Submit" button and accept the "OK" dialog', async () => {
        await pageManager.contactUs.clickSubmitButton();
    });

    await test.step('Step 10: Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
        await pageManager.contactUs.validateSuccessMessage();
    });

    await test.step('Step 11: Click "Home" button and verify that landed to home page successfully', async () => {
        await pageManager.contactUs.clickHomeButton();
        await expect(page).toHaveTitle('Automation Exercise');
    });
})