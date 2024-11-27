import { test, expect } from "@playwright/test";

test("verify redirection when user click token in cari aset in pintu", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Cari aset di Pintu" }).click();

  const [newpage] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByTestId("find-redir-BTC").click(),
  ]);

  expect(newpage.url()).toBe("https://pintu.co.id/market/BTC");
  await newpage.close();
});

test("verify data in data-table has change when user click next button", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Bitcoin")).toBeVisible();

  // Verify initial query string does not contain 'page='
  const initialUrl = new URL(page.url());
  expect(initialUrl.searchParams.get("page")).toBeNull();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByText(/^Bitcoin$/)).not.toBeVisible();
  await expect(page.getByText("Axie Infinity")).toBeVisible();

  // Wait for the URL to change with the query string
  await page.waitForURL(/.*page=\d+/);

  // Verify the updated query string
  const updatedUrl = new URL(page.url());
  const pageParam = updatedUrl.searchParams.get("page");
  expect(pageParam).not.toBeNull();
  expect(pageParam).toBe("2");
});
