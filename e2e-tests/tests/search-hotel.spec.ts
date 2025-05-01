import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("m@m.com");
  await page.locator("[name=password]").fill("Password@1403");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where would you like to stay?").fill("Nayagarh");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in nayagarh")).toBeVisible();
  await expect(page.getByText("nayagarh hotel")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where would you like to stay?").fill("Nayagarh");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("nayagarh hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where would you like to stay?").fill("Nayagarh");

  await page.getByPlaceholder("Select your dates").click();

  const today = new Date();
  const checkInDay = new Date(today);
  checkInDay.setDate(today.getDate() + 3);
  const checkOutDay = new Date(today);
  checkOutDay.setDate(today.getDate() + 5);

  await page
    .locator(`.react-datepicker__day:text-is("${checkInDay.getDate()}")`)
    .first()
    .click();
  await page
    .locator(`.react-datepicker__day:text-is("${checkOutDay.getDate()}")`)
    .first()
    .click();

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("nayagarh hotel").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("$400.00")).toBeVisible();
  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242 4242 4242 4242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("356");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("752002");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("nayagarh hotel")).toBeVisible();
});
