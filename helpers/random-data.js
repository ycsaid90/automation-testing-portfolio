import {faker, fakerEN_US} from "@faker-js/faker";

export default class RandomData {
    static randomEmail() {
        return fakerEN_US.internet.email();
    }
    static randomPassword() {
        return faker.internet.password();
    }
    static randomName() {
        return faker.person.firstName();
    }
    static randomLastName() {
        return faker.person.lastName();
    }
    static randomCompany() {
        return faker.company.name();
    }
    static randomPhoneNumber() {
        return faker.phone.number({ style: "national" });
    }
    static randomAddress() {
        return faker.location.streetAddress(false);
    }
    static randomAddress2() {
        return faker.location.secondaryAddress();
    }
    static randomCity() {
        return faker.location.city();
    }
    static randomState() {
        return faker.location.state();
    }
    static randomZipCode() {
        return faker.location.zipCode();
    }
    static randomCountry() {
        return faker.location.country();
    }

    static randomDate() {
        return faker.date.past();
    }
    static randomNumber() {
        return faker.number.int({ min: 1000, max: 9000 });
    }

    static getForm() {
        return {
            firstName: this.randomName(),
            lastName: this.randomLastName(),
            password: this.randomPassword(),
            company: this.randomCompany(),
            address: this.randomAddress(),
            address2: this.randomAddress2(),
            country: this.randomCountry(),
            state: this.randomState(),
            city: this.randomCity(),
            zipCode: this.randomZipCode(),
            phoneNumber: this.randomPhoneNumber(),
        };
    }

}