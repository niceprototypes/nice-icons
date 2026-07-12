/**
 * Icon discovery — scan the flat icon set under `src/generated/` and read its
 * SVG markup. Every function here is filesystem-facing (internal to the
 * generator); the content builders in ./generate.js consume their output.
 *
 * @module generateIndex/icons
 */

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// The generated icon set (SVGs + index) lives under src/generated/; this module
// sits in scripts/generateIndex/, so go up two levels then into src/generated.
export const rootDir = path.join(__dirname, "..", "..", "src", "generated")

/**
 * Convert icon name to PascalCase export name
 * e.g., "arrow" -> "Arrow", "some-icon" -> "SomeIcon"
 */
export function toPascalCase(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/**
 * List the variants present in an icon folder — the svg filename stems (`base`,
 * `fill`, `3d`, …), sorted with `base` first (it is the default/required variant)
 * and the rest alphabetical. Variants are open-ended: any `{stem}.svg` counts.
 */
export function getVariants(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".svg"))
    .map((f) => f.replace(/\.svg$/i, ""))
    .sort((a, b) => (a === "base" ? -1 : b === "base" ? 1 : a.localeCompare(b)))
}

/**
 * All icons, as `{ name, variants }`, sorted by name. The `name` is the icon
 * folder name — the public identifier; `variants` is the folder's svg stems
 * (base first). Any directory directly under `src/generated/` that holds at least
 * one svg is an icon; everything else (the generated .js/.d.ts files, hidden
 * folders) is ignored.
 */
export function getIcons() {
  const icons = []
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith(".")) continue
    const variants = getVariants(path.join(rootDir, entry.name))
    if (variants.length) icons.push({ name: entry.name, variants })
  }
  return icons.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Icons missing the required `base` variant. `base` is the default an `<Icon>`
 * falls back to, so an icon folder that has variant svgs (e.g. `fill.svg`) but no
 * `base.svg` is invalid and must be fixed (add base.svg / convert base.ai).
 */
export function findMissingBase(icons) {
  return icons.filter((icon) => !icon.variants.includes("base"))
}

/** Format the missing-base list into a readable multi-line error body. */
export function formatMissingBase(missing) {
  return missing
    .map((icon) => `  "${icon.name}" has [${icon.variants.join(", ")}] but no base.svg`)
    .join("\n")
}

/**
 * Read an icon variant's SVG markup, ready for inline injection: the `<?xml …?>`
 * prolog (never useful inside HTML) is stripped and surrounding whitespace
 * trimmed. The embedded `<style>` and element classes are kept — the vanilla
 * `getIcon` needs them to render custom variants untouched.
 */
export function readIconSvg(name, variant) {
  const raw = fs.readFileSync(path.join(rootDir, name, `${variant}.svg`), "utf-8")
  return raw.replace(/<\?xml[^>]*\?>\s*/i, "").trim()
}
