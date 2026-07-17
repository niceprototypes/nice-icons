/**
 * Content builder for catalog.js — the data-only surface: `iconNames` (flat) and
 * `iconVariants` (per-icon variant lists, base first). No SVG imports. Pure
 * string producer, no filesystem writes.
 *
 * @module generateIndex/generateCatalogContent
 */

/**
 * Generate catalog.js — the data-only surface: `iconNames` (flat) and
 * `iconVariants` (per-icon variant lists, base first). No SVG imports, so
 * importing it (e.g. from the Storybook reference table) pulls no icon modules.
 */
export function generateCatalogContent(icons) {
  const lines = []

  lines.push("export const iconNames = [")
  for (const { name } of icons) {
    lines.push(`  "${name}",`)
  }
  lines.push("];")
  lines.push("")

  // Per-icon variant lists (base first), so a consumer can validate a requested
  // variant against what an icon actually ships — without importing SVG modules.
  lines.push("export const iconVariants = {")
  for (const { name, variants } of icons) {
    lines.push(`  "${name}": [${variants.map((v) => `"${v}"`).join(", ")}],`)
  }
  lines.push("};")
  lines.push("")

  return lines.join("\n")
}