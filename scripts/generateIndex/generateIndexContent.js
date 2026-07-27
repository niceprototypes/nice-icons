/**
 * Content builder for index.js — one `export … from "./{name}/{variant}.svg"`
 * per asset variant, plus the re-export of the data-only catalog. Pure string
 * producer, no filesystem writes. The React export suffix and catalog symbol
 * names come from the surface's `naming` (icons: `…Icon` + `iconNames`;
 * illustrations: `…Illustration` + `illustrationNames`).
 *
 * @module generateIndex/generateIndexContent
 */

import { toPascalCase } from "./icons.js"

/**
 * Generate index.js content from the asset list. One export per variant:
 * base -> `${Name}Base${Suffix}`, fill -> `${Name}Fill${Suffix}` — e.g.
 * `NiceHeartBaseIcon` (icons) / `NiceHeartBaseIllustration` (illustrations).
 */
export function generateIndexContent(icons, naming) {
  const lines = []

  for (const { name, variants } of icons) {
    const pascalName = toPascalCase(name)
    for (const variant of variants) {
      const exportName = `${pascalName}${toPascalCase(variant)}${naming.exportSuffix}`
      lines.push(`export { default as ${exportName} } from "./${name}/${variant}.svg";`)
    }
  }

  lines.push("")

  // Names + per-asset variants are data only (no SVG imports), so they live in
  // the ./catalog entry that tooling can import without dragging in every asset
  // module. Re-exported here for the default entry.
  lines.push(`export { ${naming.namesConst}, ${naming.variantsConst} } from "./catalog.js";`)
  lines.push("")

  return lines.join("\n")
}
