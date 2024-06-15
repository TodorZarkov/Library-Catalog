const {test, expect} = require("@playwright/test");

import{
    host, 
    authenticate,
    authJohn,
    authPeter,
    deleteAllBooksByUser,
    messageWithNoBooksInDb
} from "./common";

test("Verify all books are displayed", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await page.waitForSelector(".dashboard");

    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

test("Verify message when no books are present in db", async ({page}) => {

});