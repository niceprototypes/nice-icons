/**
 * Content builder for catalog.d.ts — the name list as a readonly literal tuple
 * (so the name union stays exact) and the per-asset variant map keyed by that
 * union. Pure string producer, no filesystem writes. Symbol names come from the
 * surface's `naming`.
 *
 * @module generateIndex/generateCatalogTypes
 */

/** Generate catalog.d.ts — the name list as a readonly literal tuple (so the
 * name union stays exact) and the variant map keyed by the exact name union. */
export function generateCatalogTypes(icons, naming) {
  const lines = []

  lines.push(`export const ${naming.namesConst}: readonly [`)
  for (const { name } of icons) {
    lines.push(`  "${name}",`)
  }
  lines.push("];")
  lines.push("")

  lines.push(
    `export const ${naming.variantsConst}: Readonly<Record<(typeof ${naming.namesConst})[number], readonly string[]>>;`
  )
  lines.push("")

  return lines.join("\n")
}
