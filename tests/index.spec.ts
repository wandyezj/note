import { test, expect } from "@playwright/test";

import { navigateToPage } from "./navigateToPage";
const mainPageTitle = "Website";

test("navigates to correct page title", async ({ browser }) => {
    const page = await navigateToPage(browser, "index.html", mainPageTitle);
    await expect(page).toHaveTitle(mainPageTitle);
});
