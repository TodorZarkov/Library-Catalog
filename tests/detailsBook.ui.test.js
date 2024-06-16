const {test, expect} = require("@playwright/test");

import {
    host,
    authenticate,
    authJohn,
    authPeter,
    deleteAllBooksByUser,
    addBooksByUser,
    correctBookData,
    booksOfJohn,
    booksOfPeter,
    logout,
    navigateToDetailsOfFirstBook
} from './common';

test ("Verify Details button works correctly for loged in user", async ({page}) => {
    await authenticate(page, authPeter);
    await deleteAllBooksByUser(page);

    await authenticate(page, authJohn);
    await deleteAllBooksByUser(page);

    await addBooksByUser(page, [correctBookData]);
  
    await navigateToDetailsOfFirstBook(page);

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe(correctBookData.title);

    //Back to previous db state:

    await addBooksByUser(page, booksOfJohn);
    await authenticate(page, authPeter);
    await addBooksByUser(page, booksOfPeter);
});

test ("Verify Guest User Sees Details Button and Button Works Correctly", async ({page}) => {
    await authenticate(page, authPeter);
    await deleteAllBooksByUser(page);

    await authenticate(page, authJohn);
    await deleteAllBooksByUser(page);

    await addBooksByUser(page, [correctBookData]);
    await logout(page);

    await navigateToDetailsOfFirstBook(page);

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe(correctBookData.title);

    //Back to previous db state:

    await authenticate(page, authJohn);
    await addBooksByUser(page, booksOfJohn);
    await authenticate(page, authPeter);
    await addBooksByUser(page, booksOfPeter);
});



