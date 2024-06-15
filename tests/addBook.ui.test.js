const {test, expect} = require("@playwright/test")

import {
    host, 
    authenticate, 
    validateDialog, 
    fillAndConfirmAddBookForm,
    addBookDataWithNoDescription,
    addBookDataWithNoImage,
    addBookDataWithNoTitle
} from "./common";

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

test("Add book with empty description field", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await validateDialog(page, 'alert');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await fillAndConfirmAddBookForm(page, addBookDataWithNoDescription);

    expect(page.url()).toBe(host + "/create");
});

test("Add book with empty image field", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await validateDialog(page, 'alert');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await fillAndConfirmAddBookForm(page, addBookDataWithNoImage);

    expect(page.url()).toBe(host + "/create");
});