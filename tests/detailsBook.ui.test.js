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

test("Verify That All Details Info Is Displayed Correctly", async ({page}) => {
    await authenticate(page, authPeter);
    await deleteAllBooksByUser(page);

    await authenticate(page, authJohn);
    await deleteAllBooksByUser(page);

    await addBooksByUser(page, [correctBookData]);
  
    await navigateToDetailsOfFirstBook(page);

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe(correctBookData.title);

    const detailsPageType = await page.textContent('.book-information .type');
    expect(detailsPageType).toBe('Type: Fiction');

    await expect(page.locator('.book-information .img img'))
    .toHaveAttribute('src', correctBookData.imageUrl)
    
    const detailsPageDetails = 
    await page.textContent('.book-description p');
    expect(detailsPageDetails).toBe(correctBookData.description);

    //Back to previous db state:

    await addBooksByUser(page, booksOfJohn);
    await authenticate(page, authPeter);
    await addBooksByUser(page, booksOfPeter);
});

