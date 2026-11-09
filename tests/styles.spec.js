import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "320px", width: 320, height: 568 },
  { name: "375px", width: 375, height: 667 },
  { name: "390px", width: 390, height: 844 },
  { name: "412px", width: 412, height: 915 },
  { name: "1440px", width: 1440, height: 900 },
];

const PORTRAIT_PHONES = VIEWPORTS.slice(0, 4);

async function openAt(page, viewport) {
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
  await page.goto("/");
}

// Resolve any CSS colour, including oklch(), to sRGB bytes so contrast can be
// checked against what the browser actually paints.
async function resolveColor(page, css) {
  return page.evaluate((value) => {
    const context = document
      .createElement("canvas")
      .getContext("2d", { colorSpace: "srgb" });
    context.fillStyle = value;
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
  }, css);
}

function relativeLuminance([r, g, b]) {
  const channel = (value) => {
    const normalised = value / 255;
    return normalised <= 0.04045
      ? normalised / 12.92
      : ((normalised + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const viewport of VIEWPORTS) {
  test(`no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await openAt(page, viewport);

    const widths = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));

    expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  });
}

test("hero heading keeps its responsive scale", async ({ page }) => {
  await openAt(page, { width: 1440, height: 900 });
  await expect(page.locator("#intro h1")).toHaveCSS("font-size", "72px");

  await openAt(page, VIEWPORTS[1]);
  await expect(page.locator("#intro h1")).toHaveCSS("font-size", "60px");
});

test("text autosizing is disabled without blocking zoom", async ({
  page,
  request,
}) => {
  await page.goto("/");

  const href = await page
    .locator('link[rel="stylesheet"]')
    .getAttribute("href");
  expect(href).not.toBeNull();

  const response = await request.get(new URL(href, page.url()).href);
  const css = (await response.text()).replace(/\s+/g, "");
  const viewport =
    (await page.locator('meta[name="viewport"]').getAttribute("content")) ?? "";

  expect(/(^|[^-])text-size-adjust:100%/.test(css)).toBe(true);
  expect(/-webkit-text-size-adjust:100%/.test(css)).toBe(true);
  expect(viewport).toContain("width=device-width");
  expect(viewport).toContain("initial-scale=1");
  expect(viewport).not.toContain("user-scalable=no");
  expect(viewport).not.toContain("maximum-scale");
});

for (const viewport of PORTRAIT_PHONES) {
  test(`portrait hero text clears the logo at ${viewport.name}`, async ({
    page,
  }) => {
    await openAt(page, viewport);

    const geometry = await page.evaluate(() => {
      const box = (selector) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing ${selector}`);
        const rect = element.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      };

      const header = document.querySelector("header");
      if (!header) throw new Error("Missing header");

      return {
        header: box("header"),
        intro: box("#intro"),
        heading: box("#intro h1"),
        nav: box(".site-nav"),
        firstRow: parseFloat(
          getComputedStyle(header).gridTemplateRows.split(/\s+/)[0],
        ),
      };
    });

    // The first grid row reserves the logo's space, so the intro must start
    // below it, and the whole hero must stay inside the grown header.
    expect(geometry.intro.top - geometry.header.top).toBeGreaterThanOrEqual(
      geometry.firstRow - 1,
    );
    expect(geometry.heading.top).toBeGreaterThanOrEqual(
      geometry.header.top - 0.5,
    );
    expect(geometry.nav.bottom).toBeLessThanOrEqual(
      geometry.header.bottom + 0.5,
    );
  });
}

async function computedColor(page, selector) {
  const css = await page
    .locator(selector)
    .first()
    .evaluate((element) => getComputedStyle(element).color);

  return resolveColor(page, css);
}

test("text colours match the palette", async ({ page }) => {
  await openAt(page, VIEWPORTS[2]);

  expect(await computedColor(page, "#intro h1")).toEqual([255, 0, 0]);
  expect(await computedColor(page, ".contact-intro")).toEqual([212, 212, 212]);
  expect(await computedColor(page, ".site-nav a")).toEqual([163, 163, 163]);
});

test("selection text is readable on the brand accent", async ({ page }) => {
  await openAt(page, VIEWPORTS[2]);

  const tokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      brand: styles.getPropertyValue("--color-brand").trim(),
      surface: styles.getPropertyValue("--color-surface").trim(),
    };
  });

  expect(tokens.brand).not.toBe("");
  expect(tokens.surface).not.toBe("");

  const ratio = contrastRatio(
    await resolveColor(page, tokens.brand),
    await resolveColor(page, tokens.surface),
  );

  expect(ratio).toBeGreaterThanOrEqual(4.5);
});
