const { test, expect } = require('@playwright/test');
const host = 'http://localhost:3000';
const authValid = {
    email: "peter@abv.bg",
    pass: "123456"
};
const authEmpty = {
    email: "",
    pass: ""
};
const authEmptyUnValidPass = {
    email: "",
    pass: "123456"
};
const authEmptyPassValidUn = {
    email: "peter@abv.bg",
    pass: ""
};

const regDataValid = {
    email: "stamat@abv.bg",
    pass: "654321",
    confirmPass: "654321"
};
const regDataEmpty = {
    email: "",
    pass: "",
    confirmPass: ""
};

const alertMessageRequiredFields = 'All fields are required!';

async function authenticate(page, auth = authValid) {
    await page.goto(host + "/login");
    await page.fill('input[name="email"]', auth.email);
    await page.fill('input[name="password"]', auth.pass);
    await page.click('input[type="submit"]');
}

async function register(page, regData = regDataValid) {
    await page.goto(host + "/register");
    await page.fill('input[name="email"]', regData.email);
    await page.fill('input[name="password"]', regData.pass);
    await page.fill('input[name="confirm-pass"]', regData.confirmPass)
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

    await expect(greetingElement).toContainText(`${authValid.email}`);
} );

test('Login with Valid Credentials', async ({page}) => {
    await authenticate(page, authValid);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(host + "/catalog");
});

test('Login with empty Credentials', async ({page}) => {
    await authenticate(page, authEmpty);
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(alertMessageRequiredFields);
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(host + "/login");
});

test('Login with empty un and valid pass Credentials', async ({page}) => {
    await authenticate(page, authEmptyUnValidPass);
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(alertMessageRequiredFields);
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(host + "/login");
});

test('Login with empty password and valid username Credentials', async ({page}) => {
    await authenticate(page, authEmptyPassValidUn);
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(alertMessageRequiredFields);
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(host + "/login");
});

test('Register with Valid data', async ({page}) => {
    await register(page, regDataValid);
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(host + "/catalog");
});

test('Register with Empty data', async ({page}) => {
    await register(page, regDataEmpty);

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(alertMessageRequiredFields);
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(host + "/register");
});

