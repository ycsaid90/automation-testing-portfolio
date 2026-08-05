import {test, expect} from '@playwright/test';

test('GET all products list', {tag: ["@api"]}, async ({request}) => {
    let body;
    let response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);
    await test.step('Validate response body with status 200', async () => {
        body = await response.json();
        expect(body.responseCode).toBe(200);
    });

    await test.step('Validate products list structure is an Array', async () => {
        expect(Array.isArray(body.products)).toBeTruthy();
    });

    await test.step('Validate products list is not empty and has expected structure', async () => {
        expect(body.products.length).toBeGreaterThan(0);
        expect(body.products[0]).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(String),
            brand: expect.any(String),
            category: {usertype: {usertype: expect.any(String)}, category: expect.any(String)},
        });
    });

    console.log(`Total products: ${body.products.length}, Response Code: ${body.responseCode}, Body:`, body.products[0]);
});

test('POST all products list', {tag: ["@api"]}, async ({request}) => {
    let body;
    let response = await request.post('/api/productsList', {});
    expect(response.status()).toBe(200);
    await test.step('Validate response code 405', async () => {
        body = await response.json();
        expect(body.responseCode).toBe(405);
    })
    await test.step('Validate response message', async () => {
        expect(body.message).toBe('This request method is not supported.');
    })
    console.log(`Response Code: ${body.responseCode}, Body:`, body.message);
})
