/**
 * Content builder for index.js — one `export … from "./{name}/{variant}.svg"`
 * per icon variant, plus the re-export of the data-only catalog. Pure string
 * producer, no filesystem writes.
 *
 * @module generateIndex/generateIndexContent
 */

import { toPascalCase } from "./icons.js"

/**
 * Generate index.js content from the icon list. One export per variant:
 * base -> `${Name}BaseIcon`, fill -> `${Name}FillIcon`, 3d -> `${Name}3dIcon`.
 */
export function generateIndexContent(icons) {
  const lines = []

  for (const { name, variants } of icons) {
    const pascalName = toPascalCase(name)
    for (const variant of variants) {
      const exportName = `${pascalName}${toPascalCase(variant)}Icon`
      lines.push(`export { default as ${exportName} } from "./${name}/${variant}.svg";`)
    }
  }

  lines.push("")

  // Names + per-icon variants are data only (no SVG imports), so they live in the
  // ./catalog entry that tooling can import without dragging in every icon module.
  // Re-exported here for the default "nice-icons" entry.
  lines.push(`export { iconNames, iconVariants } from "./catalog.js";`)
  lines.push("")

  return lines.join("\n")
}