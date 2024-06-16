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
    booksOfPeter
} from './common';

test ("Verify Details button works correctly for loged in user", async ({page}) => {
    await authenticate(page, authPeter);
    await deleteAllBooksByUser(page);

    await authenticate(page, authJohn);
    await deleteAllBooksByUser(page);

    await addBooksByUser(page, [correctBookData]);

    await page.click('a[href="/catalog"]');
    await page.waitForURL(host + "/catalog");

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.details');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe(correctBookData.title);

    //Back to previous db state:

    await addBooksByUser(page, booksOfJohn);
    await authenticate(page, authPeter);
    await addBooksByUser(page, booksOfPeter);
});