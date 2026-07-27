/**
 * Content builder for catalog.js — the data-only surface: `{names}` (flat) and
 * `{variants}` (per-asset variant lists, base first). No SVG imports. Pure
 * string producer, no filesystem writes. Symbol names come from the surface's
 * `naming` (icons: `iconNames`/`iconVariants`; illustrations: `illustration…`).
 *
 * @module generateIndex/generateCatalogContent
 */

/**
 * Generate catalog.js — the data-only surface: the flat name list and per-asset
 * variant lists (base first). No SVG imports, so importing it (e.g. from the
 * Storybook reference table) pulls no asset modules.
 */
export function generateCatalogContent(icons, naming) {
  const lines = []

  lines.push(`export const ${naming.namesConst} = [`)
  for (const { name } of icons) {
    lines.push(`  "${name}",`)
  }
  lines.push("];")
  lines.push("")

  // Per-asset variant lists (base first), so a consumer can validate a requested
  // variant against what an asset actually ships — without importing SVG modules.
  lines.push(`export const ${naming.variantsConst} = {`)
  for (const { name, variants } of icons) {
    lines.push(`  "${name}": [${variants.map((v) => `"${v}"`).join(", ")}],`)
  }
  lines.push("};")
  lines.push("")

  return lines.join("\n")
}
