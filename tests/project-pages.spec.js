import { test, expect } from "@playwright/test";

const PAGES = [
  {
    path: "/work/myhyve/",
    heading: "Modernising the MyHyve Ticketing Portal",
    label: "Case study",
  },
  {
    path: "/work/share-a-coke/",
    heading: "Building the Share a Coke Customisation Experience",
    label: "Completed campaign",
  },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
  { name: "narrow mobile", width: 320, height: 568 },
];

for (const projectPage of PAGES) {
  for (const viewport of VIEWPORTS) {
    test(`${projectPage.heading} renders at ${viewport.name} width`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const response = await page.goto(projectPage.path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toHaveText(projectPage.heading);
      await expect(
        page.getByText(projectPage.label, { exact: true }),
      ).toBeVisible();

      const widths = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));

      expect(widths.scroll).toBeLessThanOrEqual(widths.client);
    });
  }
}

test("homepage cards link to both project pages", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Read case study" }),
  ).toHaveAttribute("href", "./work/myhyve/");
  await expect(
    page.getByRole("link", { name: "View project" }),
  ).toHaveAttribute("href", "./work/share-a-coke/");
});

test("MyHyve workflow diagram names its three steps", async ({ page }) => {
  await page.goto("/work/myhyve/");

  const steps = page.locator(".case-workflow .workflow-step-label");
  await expect(steps).toHaveText([
    "1. Monthly check",
    "2. One monthly ticket",
    "3. Support review",
  ]);
  await expect(
    page.getByText("Illustrative workflow with fictional data."),
  ).toBeVisible();
});

for (const projectPage of PAGES) {
  test(`${projectPage.heading} shows highlights and a return link`, async ({
    page,
  }) => {
    await page.goto(projectPage.path);

    await expect(
      page.getByRole("list", { name: "At a glance" }).locator("li"),
    ).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "← Back to selected work" }),
    ).toHaveAttribute("href", "/#work");
  });
}

test("Share a Coke campaign screenshot loads at project-page width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/share-a-coke/");

  const image = page.locator(".case-figure img");
  await expect(image).toBeVisible();

  const loaded = await image.evaluate(
    (element) => element.complete && element.naturalWidth > 0,
  );
  expect(loaded).toBe(true);
  expect(await image.getAttribute("width")).toBe("1600");
});
