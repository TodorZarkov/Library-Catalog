const {test, expect} = require("@playwright/test");
import {
    host,
    authenticate,
    authPeter,
    logout
} from "./common";



test('Verify That the "Logout" Button Is Visible and function properly', async ({page}) => {
    await authenticate(page, authPeter);
    await page.waitForSelector("#user");

    await expect(page.locator('//a[text()="Logout"]')).toBeVisible();

    await logout(page);

    await page.waitForURL(host + "/catalog");
    const url = await page.url();
    await expect(url).toBe(host + "/catalog");
});