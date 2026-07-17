/**
 * Write orchestration — scrub the icon SVGs and emit the generated files
 * (index/catalog/source + .d.ts). Bridges ./icons.js (discovery) and
 * ./generate.js (content) to the filesystem and the scrubber.
 *
 * @module generateIndex/write
 */

import * as fs from "fs"
import * as path from "path"
import { scrubSvgFile } from "../scrubSvg.js"
import { rootDir, getIcons, findMissingBase, formatMissingBase } from "./icons.js"
import { generateIndexContent } from "./generateIndexContent.js"
import { generateCatalogContent } from "./generateCatalogContent.js"
import { generateCatalogTypes } from "./generateCatalogTypes.js"
import { generateTypesContent } from "./generateTypesContent.js"
import { generateSourceContent } from "./generateSourceContent.js"
import { generateSourceTypes } from "./generateSourceTypes.js"
import { buildBase64Map } from "./buildBase64Map.js"
import { serializeBase64Module } from "./serializeBase64Module.js"
import { generateBase64Types } from "./generateBase64Types.js"

/**
 * Scrub every icon SVG in place (strip Adobe artifacts, apply semantic classes
 * from svgStyle.config.js). Write-only-on-change, so already-clean files are
 * skipped. Returns the number of files rewritten.
 */
export function scrubAllIcons() {
  let count = 0
  for (const { name, variants } of getIcons()) {
    for (const variant of variants) {
      const filePath = path.join(rootDir, name, `${variant}.svg`)
      try {
        if (scrubSvgFile(filePath)) count++
      } catch (err) {
        console.error(`✗ Scrub failed for ${name}/${variant}.svg: ${err.message}`)
      }
    }
  }
  if (count) console.log(`✓ Scrubbed ${count} SVG file(s)`)
  return count
}

/**
 * Write index + catalog + source (js/d.ts). Throws if any icon lacks the required
 * base.svg — base is the default variant, so it must exist for every icon.
 */
export function writeIndex() {
  const icons = getIcons()

  const missingBase = findMissingBase(icons)
  if (missingBase.length) {
    throw new Error(
      `Every icon must ship a base.svg (the default variant) — add one or convert its base.ai:\n${formatMissingBase(
        missingBase
      )}`
    )
  }

  fs.writeFileSync(path.join(rootDir, "catalog.js"), generateCatalogContent(icons), "utf-8")
  fs.writeFileSync(path.join(rootDir, "catalog.d.ts"), generateCatalogTypes(icons), "utf-8")
  fs.writeFileSync(path.join(rootDir, "index.js"), generateIndexContent(icons), "utf-8")
  fs.writeFileSync(path.join(rootDir, "index.d.ts"), generateTypesContent(icons), "utf-8")
  fs.writeFileSync(path.join(rootDir, "source.js"), generateSourceContent(icons), "utf-8")
  fs.writeFileSync(path.join(rootDir, "source.d.ts"), generateSourceTypes(), "utf-8")

  // Encoded surface: the SVG-base64 data-URI map (color baked to base/#000,
  // night/#fff), written both as one index module (base64.js — set consumption,
  // read by getIconEncoded) and per-icon {name}/base64.json (individual
  // consumption). The per-icon files land inside icon folders; the icon-folder
  // watcher only reacts to .svg, so these writes don't retrigger it.
  const base64Map = buildBase64Map(icons)
  fs.writeFileSync(path.join(rootDir, "base64.js"), serializeBase64Module(base64Map), "utf-8")
  fs.writeFileSync(path.join(rootDir, "base64.d.ts"), generateBase64Types(), "utf-8")
  for (const { name } of icons) {
    fs.writeFileSync(
      path.join(rootDir, name, "base64.json"),
      `${JSON.stringify(base64Map[name], null, 2)}\n`,
      "utf-8"
    )
  }

  console.log(
    `✓ Generated index + catalog + source + base64 (js/d.ts) with ${icons.length} icons`
  )
}

/**
 * Write index.js in watch mode — logs the error instead of throwing, so a
 * transient invalid state (mid-edit) doesn't kill the watcher.
 */
export function writeIndexSafe() {
  try {
    writeIndex()
  } catch (err) {
    console.error(`✗ ${err.message}`)
  }
}
