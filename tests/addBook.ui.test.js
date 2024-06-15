const {test, expect} = require("@playwright/test")

import {host, authenticate, validateDialog} from "../tests/ui.test";

const correctBookData = {
    title: "CorrectTitle",
    description: "CorrectDescription",
    imageUrl: "https://cdn2.penguin.com.au/covers/original/9780451233264.jpg",
    type: "Fiction"
};

const addBookDataWithNoTitle = {
    title: "",
    description: "CorrectDescription",
    imageUrl: "https://cdn2.penguin.com.au/covers/original/9780451233264.jpg",
    type: "Fiction"
};

async function fillAndConfirmAddBookForm(page, addBookData = correctBookData){
    await page.fill("#title", addBookData.title);
    await page.fill("#description", addBookData.description);
    await page.fill("#image", addBookData.imageUrl);
    await page.selectOption("#type", addBookData.type);
    
    await page.click('#create-form input[type="submit"]');
};

test("Add book with correct data", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await fillAndConfirmAddBookForm(page);
    await page.waitForURL(host + "/catalog");

    expect(page.url()).toBe(host + "/catalog");
});

test("Add book with empty title field", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await validateDialog(page, 'alert');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await fillAndConfirmAddBookForm(page, addBookDataWithNoTitle);

    expect(page.url()).toBe(host + "/create");
});