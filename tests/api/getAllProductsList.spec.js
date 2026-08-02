import {test, expect} from '@playwright/test';

test('Get all products list', {tags: ["@api"]}, async ({request}) => {
    const response = await request.get('/productsList');
    expect(response.ok()).toBeTruthy();
    const products = await response.json();
    expect(products).toBeInstanceOf(Array);
    console.log(products);
});