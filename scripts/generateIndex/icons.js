/**
 * Asset discovery — scan a flat asset set (icons under `src/icons/generated/`,
 * illustrations under `src/illustrations/generated/`) and read its SVG markup.
 * Every function here is filesystem-facing (internal to the generator); the
 * content builders in ./generate*.js consume their output.
 *
 * The functions are surface-agnostic: pass the surface's generated dir as
 * `rootDir`. See ./targets.js for the icon/illustration surface descriptors.
 *
 * @module generateIndex/icons
 */

import * as fs from "fs"
import * as path from "path"

/**
 * Convert an asset name to PascalCase export name
 * e.g., "arrow" -> "Arrow", "some-icon" -> "SomeIcon"
 */
export function toPascalCase(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/**
 * List the variants present in an asset folder — the svg filename stems (`base`,
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
 * All assets under `rootDir`, as `{ name, variants }`, sorted by name. The `name`
 * is the asset folder name — the public identifier; `variants` is the folder's
 * svg stems (base first). Any directory directly under `rootDir` that holds at
 * least one svg is an asset; everything else (the generated .js/.d.ts files,
 * hidden folders) is ignored. Returns `[]` when `rootDir` doesn't exist yet.
 */
export function getIcons(rootDir) {
  if (!fs.existsSync(rootDir)) return []
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
 * Assets missing the required `base` variant. `base` is the default an `<Icon>`
 * falls back to, so a folder that has variant svgs (e.g. `fill.svg`) but no
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
 * Read an asset variant's SVG markup, ready for inline injection: the `<?xml …?>`
 * prolog (never useful inside HTML) is stripped and surrounding whitespace
 * trimmed. The embedded `<style>`/element classes (icons) and literal fills
 * (illustrations) are kept — the vanilla getters need them to render untouched.
 */
export function readIconSvg(rootDir, name, variant) {
  const raw = fs.readFileSync(path.join(rootDir, name, `${variant}.svg`), "utf-8")
  return raw.replace(/<\?xml[^>]*\?>\s*/i, "").trim()
}
