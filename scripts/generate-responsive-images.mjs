// Generate the smaller WebP variants used by the portfolio srcset attributes.
//
// Run with: node scripts/generate-responsive-images.mjs
//
// The source files in src/img/portfolio/ stay at their original size. The
// variants are committed alongside them so the production build does not need
// an image-processing dependency. Re-run this script if a source screenshot
// changes.
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = path.join(root, "src", "img", "portfolio");
const names = ["myhyve", "sac", "dataflow"];
const widths = [800, 1200];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const name of names) {
  const source = path.join(imageDir, `${name}.webp`);
  const dataUrl = `data:image/webp;base64,${(await readFile(source)).toString("base64")}`;

  const variants = await page.evaluate(
    async ({ dataUrl, widths }) => {
      const image = new Image();
      image.src = dataUrl;
      await image.decode();

      const result = [];
      for (const width of widths) {
        if (width >= image.naturalWidth) continue;

        const height = Math.round(
          (image.naturalHeight * width) / image.naturalWidth,
        );
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);

        const blob = await canvas.convertToBlob({
          type: "image/webp",
          quality: 0.85,
        });
        const url = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        result.push({ width, height, url });
      }
      return result;
    },
    { dataUrl, widths },
  );

  for (const variant of variants) {
    const output = path.join(imageDir, `${name}-${variant.width}.webp`);
    const bytes = Buffer.from(variant.url.split(",")[1], "base64");
    await writeFile(output, bytes);
    console.log(
      `${path.relative(root, output)} ${variant.width}x${variant.height} ${bytes.length} bytes`,
    );
  }
}

await browser.close();
