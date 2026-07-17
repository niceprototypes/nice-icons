/**
 * Content builder for catalog.d.ts — `iconNames` as a readonly literal tuple (so
 * the name union stays exact) and `iconVariants` keyed by that name union. Pure
 * string producer, no filesystem writes.
 *
 * @module generateIndex/generateCatalogTypes
 */

/** Generate catalog.d.ts — `iconNames` as a readonly literal tuple (so the name
 * union stays exact) and `iconVariants` keyed by the exact name union. */
export function generateCatalogTypes(icons) {
  const lines = []

  lines.push("export const iconNames: readonly [")
  for (const { name } of icons) {
    lines.push(`  "${name}",`)
  }
  lines.push("];")
  lines.push("")

  lines.push(
    `export const iconVariants: Readonly<Record<(typeof iconNames)[number], readonly string[]>>;`
  )
  lines.push("")

  return lines.join("\n")
}