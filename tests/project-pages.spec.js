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

test("MyHyve case study describes the modernisation work", async ({ page }) => {
  await page.goto("/work/myhyve/");

  await expect(page.locator(".case-study")).toContainText(
    "I initiated and implemented the upgrade from Angular 19 to 21 in stages",
  );
  await expect(page.locator(".case-study")).toContainText(
    "I consulted support engineers before implementing a ticket notification preference across the Angular interface, C# API and SQL database.",
  );
  await expect(page.locator(".case-study")).toContainText(
    "Recurring Sentry reports included expected errors being reported as unexpected failures.",
  );
});

for (const projectPage of PAGES) {
  test(`${projectPage.heading} links back to selected work`, async ({
    page,
  }) => {
    await page.goto(projectPage.path);

    await expect(
      page.getByRole("link", { name: "← Back to selected work" }),
    ).toHaveAttribute("href", "/#work");
  });
}

test("Share a Coke case study describes the customisation work", async ({
  page,
}) => {
  await page.goto("/work/share-a-coke/");

  await expect(page.locator(".case-study")).toContainText(
    "I built React and TypeScript components for three applications supporting Coca-Cola’s international Share a Coke campaign.",
  );
  await expect(page.locator(".case-study")).toContainText(
    "I implemented this behaviour using React hooks and lookup objects.",
  );
  await expect(page.locator(".case-study")).toContainText(
    "The lead developer reviewed and refined the state logic, and dedicated testers manually checked the flows before launch.",
  );
});

test("Share a Coke campaign screenshot loads at project-page width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/share-a-coke/");

  const image = page.locator(".case-figure img");
  await expect(image).toBeVisible();
  await expect(
    page.getByText(
      "The original Share a Coke customisation interface, showing the personalisation form and 2D can preview I built.",
    ),
  ).toBeVisible();

  const loaded = await image.evaluate(
    (element) => element.complete && element.naturalWidth > 0,
  );
  expect(loaded).toBe(true);
  expect(await image.getAttribute("width")).toBe("1600");
});
