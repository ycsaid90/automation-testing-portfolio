import { test, expect } from '@playwright/test';
import RegisterUser from './register-user';
import RandomData from "../helpers/random-data";

export default class PageManager {
    constructor(page) {
        this.page = page;
    }

    get registerUser() {
        return new RegisterUser(this.page);
    }

    get randomData() {
        return new RandomData();
    }

}
