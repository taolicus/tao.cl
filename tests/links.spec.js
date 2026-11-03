import { test, expect } from "@playwright/test";

async function collectLinks(page) {
  return page.$$eval(
    'a[href], img[src], img[srcset], script[src], link[rel="stylesheet"][href], link[rel="icon"][href]',
    (elements) => {
      const values = [];

      for (const element of elements) {
        const href = element.getAttribute("href");
        const src = element.getAttribute("src");
        const srcset = element.getAttribute("srcset");

        if (href) values.push(href);
        if (src) values.push(src);
        if (srcset) {
          for (const candidate of srcset.split(",")) {
            const url = candidate.trim().split(/\s+/)[0];
            if (url) values.push(url);
          }
        }
      }

      return values;
    },
  );
}

test("all internal links and assets resolve", async ({ page, request }) => {
  await page.goto("/");

  const pageUrl = new URL(page.url());
  const internal = new Set();

  for (const value of await collectLinks(page)) {
    const url = new URL(value, pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    if (url.hash && url.pathname === pageUrl.pathname) continue;
    internal.add(url.pathname + url.search);
  }

  for (const path of internal) {
    const response = await request.get(path);
    expect(response.status(), `${path} should resolve`).toBeLessThan(400);
  }
});

test("all in-page anchors have a target", async ({ page }) => {
  await page.goto("/");

  const missing = await page.$$eval('a[href^="#"]', (links) =>
    links
      .map((link) => link.getAttribute("href"))
      .filter(
        (href) => href.length > 1 && !document.getElementById(href.slice(1)),
      ),
  );

  expect(missing).toEqual([]);
});

test("external links are reachable", async ({ page, request }) => {
  test.skip(
    process.env.CHECK_EXTERNAL_LINKS !== "1",
    "Set CHECK_EXTERNAL_LINKS=1 to check third-party URLs.",
  );

  await page.goto("/");

  const pageUrl = new URL(page.url());
  const external = new Set();

  for (const value of await collectLinks(page)) {
    const url = new URL(value, pageUrl);
    if (url.origin === pageUrl.origin) continue;
    if (url.protocol !== "http:" && url.protocol !== "https:") continue;
    external.add(url.href);
  }

  for (const url of external) {
    const response = await request.get(url, { timeout: 15_000 });
    expect([404, 410], `${url} returned ${response.status()}`).not.toContain(
      response.status(),
    );
  }
});
