const { test, expect } = require('@playwright/test');
const host = 'http://localhost:3000';
const auth1 = {
    email: "peter@abv.bg",
    pass: "123456"
};
const authEmpty = {
    email: "",
    pass: ""
}

async function authenticate(page, auth = auth1) {
    await page.goto(host + "/login");
    await page.fill('input[name="email"]', auth.email);
    await page.fill('input[name="password"]', auth.pass);
    await page.click('input[type="submit"]');
}

async function isElementVisible(page, selector) {
    const element = await page.$(selector);
    const isElementVisible = await element.isVisible();

    return isElementVisible
}



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
    const isVisible = await isElementVisible(page,'a[href="/profile"]')
    expect(isVisible).toBe(true);
} );

test('Verify "Create Book" Link Is Visible after user login', async ({page}) => {
    await authenticate(page);
    const isVisible = await isElementVisible(page,'a[href="/create"]')
    expect(isVisible).toBe(true);
} );

test('Verify User\'s Email Address Is Visible after user login', async ({page}) => {
    await authenticate(page);

    const greetingElement = await page
    .locator("#user > span:nth-child(1)");

    await expect(greetingElement).toContainText(`${auth1.email}`);
} );

test('Login with Valid Credentials', async ({page}) => {
    await authenticate(page, auth1);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(host + "/catalog");
});

test('Login with empty Credentials', async ({page}) => {
    await authenticate(page, authEmpty);
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(host + "/login");
});