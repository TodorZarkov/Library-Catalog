const {test, expect} = require("@playwright/test");

import{
    host, 
    authenticate,
    authJohn,
    authPeter,
    booksOfJohn,
    booksOfPeter,
    deleteAllBooksByUser,
    addBooksByUser,
    messageWithNoBooksInDb
} from "./common";

test("Verify all books are displayed", async ({page}) => {
    await authenticate(page);
    await page.waitForURL(host + "/catalog");

    await page.waitForSelector(".dashboard");

    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

// test("Verify message when no books are present in db", async ({page}) => {
//     await authenticate(page, authPeter);
//     await deleteAllBooksByUser(page);

//     await authenticate(page, authJohn);
//     await deleteAllBooksByUser(page);

//     await page.goto(host + "/catalog");

//     await page.waitForURL(host + "/catalog");

//     await page.waitForSelector(".dashboard");
//     const noBooksElement = await page.locator(".no-books");

//     expect(noBooksElement).toContainText(`${messageWithNoBooksInDb}`);


//     //to return the db state for the predefined testing users

//     await addBooksByUser(page, booksOfJohn);
//     await authenticate(page, authPeter);
//     await addBooksByUser(page, booksOfPeter);
// });