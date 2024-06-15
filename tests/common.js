const {test, expect} = require("@playwright/test")


export const host = 'http://localhost:3000';

export const authValid = {
    email: "peter@abv.bg",
    pass: "123456"
};
export const authPeter = {
    email: "peter@abv.bg",
    pass: "123456"
};
export const authJohn = {
    email: "john@abv.bg",
    pass: "123456"
};
export const authEmpty = {
    email: "",
    pass: ""
};
export const authEmptyUnValidPass = {
    email: "",
    pass: "123456"
};
export const authEmptyPassValidUn = {
    email: "peter@abv.bg",
    pass: ""
};

export const regDataValid = {
    email: "stamat@abv.bg",
    pass: "654321",
    confirmPass: "654321"
};
export const regDataEmpty = {
    email: "",
    pass: "",
    confirmPass: ""
};
export const regEmptyEmailValidPass = {
    email: "",
    pass: "654321",
    confirmPass: "654321"
};
export const regEmptyPassValidEmail = {
    email: "lingomingo@abv.bg",
    pass: "",
    confirmPass: ""
};
export const regDifferentConfirmPassword = {
    email: "asdfasfstamat@abv.bg",
    pass: "654321",
    confirmPass: "6544321"
};

export const alertMessageRequiredFields = 'All fields are required!';

export const alertMessagePassesDontMatch = "Passwords don't match!";

export const messageWithNoBooksInDb = "No books in database!";

export const correctBookData = {
    title: "CorrectTitle",
    description: "CorrectDescription",
    imageUrl: "https://cdn2.penguin.com.au/covers/original/9780451233264.jpg",
    type: "Fiction"
};

export const addBookDataWithNoTitle = {
    title: "",
    description: "CorrectDescription",
    imageUrl: "https://cdn2.penguin.com.au/covers/original/9780451233264.jpg",
    type: "Fiction"
};

export const addBookDataWithNoDescription = {
    title: "CorrectTitle",
    description: "",
    imageUrl: "https://cdn2.penguin.com.au/covers/original/9780451233264.jpg",
    type: "Fiction"
};

export const addBookDataWithNoImage = {
    title: "CorrectTitle",
    description: "CorrectDescription",
    imageUrl: "",
    type: "Fiction"
};

export async function fillAndConfirmAddBookForm(page, addBookData = correctBookData){
    await page.fill("#title", addBookData.title);
    await page.fill("#description", addBookData.description);
    await page.fill("#image", addBookData.imageUrl);
    await page.selectOption("#type", addBookData.type);
    
    await page.click('#create-form input[type="submit"]');
};

export async function validateDialog(
    page,
    dialogType, 
    dialogMsg = alertMessageRequiredFields) {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain(dialogType);
        expect(dialog.message()).toContain(dialogMsg);
        await dialog.accept();
    });
};

export async function authenticate(page, auth = authValid) {
    await page.goto(host + "/login");
    await page.fill('input[name="email"]', auth.email);
    await page.fill('input[name="password"]', auth.pass);
    await page.click('input[type="submit"]');
};

export async function register(page, regData = regDataValid) {
    await page.goto(host + "/register");
    await page.fill('input[name="email"]', regData.email);
    await page.fill('input[name="password"]', regData.pass);
    await page.fill('input[name="confirm-pass"]', regData.confirmPass)
    await page.click('input[type="submit"]');
    return page;
};

export async function isElementVisible(page, selector) {
    const element = await page.$(selector);
    const isElementVisible = await element.isVisible();

    return isElementVisible
};

export async function deleteAllBooksByUser(page){
    // await authenticate(page, authData);
    // await page.waitForURL(host + "/catalog");

    await page.waitForSelector(".dashboard");

    await page.click('a[href="/profile"]');

    const bookElements = await page.$$(".my-books-list li");
    while (bookElements.length > 0) {
        

        const detailsBtn = page.$$("//a[text()='Details']")[0];
        await detailsBtn.click();
        const deleteBtn = page.$("//a[text()='Delete']");
        await deleteBtn.click();
        //playwright accepts automatically dialogs???!!!

        await page.waitForSelector(".dashboard");
        await page.click('a[href="/profile"]');
        bookElements = await page.$$(".my-books-list li");
    }
}