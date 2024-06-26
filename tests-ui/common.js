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

export const booksOfJohn = [
    {
        title: "To Kill a Mockingbird",
        description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.',
        imageUrl: "/images/book3.png",
        type: "Classic"
    }
];

export const booksOfPeter = [
    {
        title: "Outlander",
        description: 'The year is 1945. Claire Randall, a former combat nurse, is just back from the war and reunited with her husband on a second honeymoon when she walks through a standing stone in one of the ancient circles that dot the British Isles. Suddenly she is a Sassenach—an “outlander”—in a Scotland torn by war and raiding border clans in the year of Our Lord...1743.',
        imageUrl: "/images/book2.png",
        type: "Other"
    },
    {
        title: "A Court of Thorns and Roses",
        description: "Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...",
        imageUrl: "/images/book1.png",
        type: "Fiction"
    }
];

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
    
    await page.waitForSelector(".dashboard");

    await page.click('a[href="/profile"]');
    let bookElements = await page.$$(".my-books-list li");
    while (bookElements.length > 0) {
        await page.click("//a[text()='Details']");

        page.once('dialog', async dialog => {
            dialog.accept();
        });

        await page.click("//a[text()='Delete']");

        await page.click('a[href="/profile"]');
        await page.waitForSelector("#my-books-page");
        bookElements = await page.$$(".my-books-list li");
    }
};

export async function addBooksByUser(page, books) {

    for(let i = 0; i < books.length; i++){
        await page.click('a[href="/create"]');
        await page.waitForSelector('#create-form');
        await fillAndConfirmAddBookForm(page, books[i]);
        await page.waitForURL(host + "/catalog");
    }

};

export async function logout(page) {
    await page.click('#logoutBtn');
}

export async function navigateToDetailsOfFirstBook(page){
    await page.click('a[href="/catalog"]');
    await page.waitForURL(host + "/catalog");

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.details');
}