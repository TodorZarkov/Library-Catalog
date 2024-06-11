const { test, expect } = require('@playwright/test');
const host = 'http://localhost:3000';
const auth1 = {
    email: "peter@abv.bg",
    pass: "123456"
};

test('Verify "All Books" link is visible', async ({page}) => {
    await page.goto(host);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({page}) => {
    await page.goto(host);
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({page}) => {
    await page.goto(host);
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "AllBooks" link is visible after user login', async ({page}) =>{
    await page.goto(host + "/login");
    await page.fill('input[name="email"]', auth1.email);
    await page.fill('input[name="password"]', auth1.pass);
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});