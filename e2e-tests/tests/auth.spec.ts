import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to signin", async ({ page }) => {
  await page.goto(UI_URL);

  // get the signin button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("m@m.com");
  await page.locator("[name=password]").fill("Password@1403");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 1000
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Manoranjan");
  await page.locator("[name=lastName]").fill("Satpathy");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("Password@1403");
  await page.locator("[name=confirmPassword]").fill("Password@1403");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Register Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
