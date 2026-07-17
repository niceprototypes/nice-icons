/**
 * Content builder for index.d.ts — the single typed surface consumers derive
 * from: every icon export as an SvgComponent, plus the catalog re-export. Pure
 * string producer, no filesystem writes.
 *
 * @module generateIndex/generateTypesContent
 */

import { toPascalCase } from "./icons.js"

/**
 * Generate index.d.ts — the single typed surface consumers derive from. Every
 * icon export is an SvgComponent; `iconNames` is a readonly literal tuple so
 * downstream `(typeof iconNames)[number]` yields the exact name union (not a
 * widened `string`). Regenerated with index.js, so it can never drift.
 */
export function generateTypesContent(icons) {
  const lines = [
    `import * as React from "react";`,
    ``,
    `type SvgComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;`,
    ``,
  ]

  for (const { name, variants } of icons) {
    const pascalName = toPascalCase(name)
    for (const variant of variants) {
      lines.push(`export const ${pascalName}${toPascalCase(variant)}Icon: SvgComponent;`)
    }
  }

  lines.push("")
  lines.push(`export { iconNames, iconVariants } from "./catalog";`)
  lines.push("")

  return lines.join("\n")
}