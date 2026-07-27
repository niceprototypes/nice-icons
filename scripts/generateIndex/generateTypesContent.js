/**
 * Content builder for index.d.ts — the single typed surface consumers derive
 * from: every asset export as an SvgComponent, plus the catalog re-export. Pure
 * string producer, no filesystem writes. Export suffix + catalog symbol names
 * come from the surface's `naming`.
 *
 * @module generateIndex/generateTypesContent
 */

import { toPascalCase } from "./icons.js"

/**
 * Generate index.d.ts — the single typed surface consumers derive from. Every
 * asset export is an SvgComponent; the name list is a readonly literal tuple so
 * downstream `(typeof names)[number]` yields the exact name union (not a widened
 * `string`). Regenerated with index.js, so it can never drift.
 */
export function generateTypesContent(icons, naming) {
  const lines = [
    `import * as React from "react";`,
    ``,
    `type SvgComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;`,
    ``,
  ]

  for (const { name, variants } of icons) {
    const pascalName = toPascalCase(name)
    for (const variant of variants) {
      lines.push(`export const ${pascalName}${toPascalCase(variant)}${naming.exportSuffix}: SvgComponent;`)
    }
  }

  lines.push("")
  lines.push(`export { ${naming.namesConst}, ${naming.variantsConst} } from "./catalog";`)
  lines.push("")

  return lines.join("\n")
}
