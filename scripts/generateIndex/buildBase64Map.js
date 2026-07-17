/**
 * Build the base64 map for the encoded icon surface: name → variant → theme →
 * SVG base64 data-URI, with color baked in (`currentColor` → the theme hex).
 * Nesting mirrors the token substring order (identifier → variant → theme).
 * Shared by the index module (base64.js) and the per-icon `{name}/base64.json`.
 *
 * @module generateIndex/buildBase64Map
 */

import { readIconSvg } from "./icons.js"

/**
 * Baked color themes for the encoded surface. `currentColor` is replaced with the
 * theme's hex before encoding, so each data-URI renders standalone (no CSS
 * cascade). `base` (#000) is the default; `night` (#fff) follows — the same
 * default-first, theme-after order as the token substring convention.
 */
const BASE64_THEMES = { base: "#000", night: "#fff" }

/** SVG base64 data-URI for one already-colored SVG string. */
function encodeSvgDataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf-8").toString("base64")}`
}

/**
 * Build `{ name: { variant: { theme: dataUri } } }` for every icon. Both glyph
 * variants are encoded (full parity with `iconSource`); each carries a `base`
 * (#000) and `night` (#fff) data-URI.
 */
export function buildBase64Map(icons) {
  const map = {}
  for (const { name, variants } of icons) {
    map[name] = {}
    for (const variant of variants) {
      const svg = readIconSvg(name, variant)
      map[name][variant] = {}
      for (const [theme, color] of Object.entries(BASE64_THEMES)) {
        map[name][variant][theme] = encodeSvgDataUri(svg.replace(/currentColor/g, color))
      }
    }
  }
  return map
}