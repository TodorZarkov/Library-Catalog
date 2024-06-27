const { test, expect } = require('@playwright/test');

import {
    host,
    register,
    isElementVisible,
    authenticate, 
    validateDialog,
    authEmpty,
    authEmptyPassValidUn,
    authEmptyUnValidPass,
    authValid,
    regDataEmpty,
    regDataValid,
    regDifferentConfirmPassword,
    regEmptyEmailValidPass,
    regEmptyPassValidEmail,
    alertMessagePassesDontMatch
} from './common';

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
    await authenticate(page);
    const isVisible = await isElementVisible(page,'a[href="/catalog"]')
    expect(isVisible).toBe(true);
});

test('Verify "My Books" Link Is Visible after user login', async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog")
    const isVisible = await isElementVisible(page,'a[href="/profile"]')
    expect(isVisible).toBe(true);
} );

test('Verify "Create Book" Link Is Visible after user login', async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog")
    const isVisible = await isElementVisible(page,'a[href="/create"]')
    expect(isVisible).toBe(true);
} );

test('Verify User\'s Email Address Is Visible after user login', async ({page}) => {
    await authenticate(page);

    const greetingElement = await page
    .locator("#user > span:nth-child(1)");

    await expect(greetingElement).toContainText(`${authValid.email}`);
} );

test('Login with Valid Credentials', async ({page}) => {
    await authenticate(page, authValid);
    await page.waitForURL(host + "/catalog")
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(host + "/catalog");
});

test('Login with empty Credentials', async ({page}) => {
    await validateDialog(page, 'alert');
    await authenticate(page, authEmpty);
    await page.$('a[href="/login"]');

    expect(page.url()).toBe(host + "/login");
});

test('Login with empty un and valid pass Credentials', async ({page}) => {
    await validateDialog(page, 'alert');
    await authenticate(page, authEmptyUnValidPass);
    await page.$('a[href="/login"]');

    expect(page.url()).toBe(host + "/login");
});

test('Login with empty password and valid username Credentials', async ({page}) => {
    await validateDialog(page, 'alert');
    await authenticate(page, authEmptyPassValidUn);
    await page.$('a[href="/login"]');

    expect(page.url()).toBe(host + "/login");
});

test('Register with Valid data', async ({page}) => {
    await register(page, regDataValid);
    await page.waitForURL(host + "/catalog")
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(host + "/catalog");
});

test('Register with Empty data', async ({page}) => {
    await validateDialog(page, 'alert');
    await register(page, regDataEmpty);
    await page.$('a[href="/register"]');

    expect(page.url()).toBe(host + "/register");
});

test('Register with Empty email, and valid password', async ({page}) => {
    await validateDialog(page, 'alert');
    await register(page, regEmptyEmailValidPass);
    await page.$('a[href="/register"]');

    expect(page.url()).toBe(host + "/register");
});

test('Register with Empty password, and valid email', async ({page}) => {
    await validateDialog(page, 'alert');
    await register(page, regEmptyPassValidEmail);
    await page.$('a[href="/register"]');

    expect(page.url()).toBe(host + "/register");
});

test('Register with Valid email, password and different confirmPassword field', async ({page}) => {
    await validateDialog(page, 'alert', alertMessagePassesDontMatch);
    page = await register(page, regDifferentConfirmPassword);
    await page.$('a[href="/register"]');

    expect(page.url()).toBe(host + "/register");
});

