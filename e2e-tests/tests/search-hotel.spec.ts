import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("m@m.com");
  await page.locator("[name=password]").fill("Password@1403");

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Nayagarh");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in nayagarh")).toBeVisible();
  await expect(page.getByText("nayagarh hotel")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Nayagarh");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("nayagarh hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Nayagarh");
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate);
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("nayagarh hotel").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost: $600.00")).toBeVisible();
  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242 4242 4242 4242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("356");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("752002");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
});
