import {test, expect} from '@playwright/test';
import RegisterUser from './registerUser';
import RandomData from "../helpers/randomData";
import LoginPage from "../POM/login";
import ContactUs from "./contactUs";

export default class PageManager {
    constructor(page) {
        this.page = page;
    }

    get registerUser() {
        return new RegisterUser(this.page);
    }
    
    get loginPage() {
        return new LoginPage(this.page);
    }

    get contactUs() {
        return new ContactUs(this.page);
    }
}