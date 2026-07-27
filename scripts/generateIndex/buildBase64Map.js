/**
 * Build the base64 map for the encoded surface: SVG base64 data-URIs with color
 * resolved. Shared by the index module (base64.js) and the per-asset
 * `{name}/base64.json`.
 *
 * Shape depends on the surface's `themes`:
 * - Icons (`themes` set): `name → variant → theme → dataUri`. `currentColor` is
 *   baked to each theme's hex before encoding, so each URI renders standalone.
 * - Illustrations (`themes` null): `name → variant → dataUri`. Colors are already
 *   authored into the SVG, so there is nothing to bake and no theme dimension.
 *
 * @module generateIndex/buildBase64Map
 */

import { readIconSvg } from "./icons.js"

/** SVG base64 data-URI for an already-colored SVG string. */
function encodeSvgDataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf-8").toString("base64")}`
}

/**
 * Build the encoded map for every asset. With `themes`, each variant carries a
 * data-URI per theme (`currentColor` → the theme hex, default-first order).
 * Without `themes`, each variant is a single data-URI (fixed authored colors).
 */
export function buildBase64Map(icons, generatedDir, themes) {
  const map = {}
  for (const { name, variants } of icons) {
    map[name] = {}
    for (const variant of variants) {
      const svg = readIconSvg(generatedDir, name, variant)
      if (themes) {
        map[name][variant] = {}
        for (const [theme, color] of Object.entries(themes)) {
          map[name][variant][theme] = encodeSvgDataUri(svg.replace(/currentColor/g, color))
        }
      } else {
        map[name][variant] = encodeSvgDataUri(svg)
      }
    }
  }
  return map
}
