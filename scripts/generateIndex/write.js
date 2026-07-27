/**
 * Write orchestration — scrub a surface's SVGs and emit its generated files
 * (index/catalog/source/base64 + .d.ts). Bridges ./icons.js (discovery) and the
 * ./generate*.js content builders to the filesystem and the scrubber. Driven per
 * surface (icons, illustrations) from ./targets.js.
 *
 * @module generateIndex/write
 */

import * as fs from "fs"
import * as path from "path"
import { getIcons, findMissingBase, formatMissingBase } from "./icons.js"
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
 * Scrub every SVG in a surface's generatedDir in place, using the surface's
 * scrubber (icons: strip Adobe artifacts + apply semantic classes; illustrations:
 * strip cruft only, colors kept). Write-only-on-change. Returns the count rewritten.
 */
export function scrubSurface(surface) {
  let count = 0
  for (const { name, variants } of getIcons(surface.generatedDir)) {
    for (const variant of variants) {
      const filePath = path.join(surface.generatedDir, name, `${variant}.svg`)
      try {
        if (surface.scrubFile(filePath)) count++
      } catch (err) {
        console.error(`✗ Scrub failed for ${surface.label} ${name}/${variant}.svg: ${err.message}`)
      }
    }
  }
  if (count) console.log(`✓ Scrubbed ${count} ${surface.label} SVG file(s)`)
  return count
}

/**
 * Write index + catalog + source + base64 (js/d.ts) for one surface. Throws if
 * any asset lacks the required base.svg — base is the default variant, so it must
 * exist for every asset.
 */
export function writeSurface(surface) {
  const { generatedDir, naming, themes, label } = surface
  const icons = getIcons(generatedDir)

  if (!icons.length) {
    console.log(`  (no ${label} to generate — ${generatedDir} is empty)`)
    return
  }

  const missingBase = findMissingBase(icons)
  if (missingBase.length) {
    throw new Error(
      `Every ${label.replace(/s$/, "")} must ship a base.svg (the default variant) — add one or convert its base.ai:\n${formatMissingBase(
        missingBase
      )}`
    )
  }

  fs.writeFileSync(path.join(generatedDir, "catalog.js"), generateCatalogContent(icons, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "catalog.d.ts"), generateCatalogTypes(icons, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "index.js"), generateIndexContent(icons, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "index.d.ts"), generateTypesContent(icons, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "source.js"), generateSourceContent(icons, generatedDir, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "source.d.ts"), generateSourceTypes(naming), "utf-8")

  // Encoded surface: the SVG-base64 data-URI map — for icons, color baked to
  // base/#000 + night/#fff per theme; for illustrations, the authored color as-is
  // (no theme). Written both as one index module (base64.js, read by the encoded
  // getter) and per-asset {name}/base64.json (individual consumption). The per-
  // asset files land inside asset folders; the folder watcher only reacts to
  // .svg, so these writes don't retrigger it.
  const base64Map = buildBase64Map(icons, generatedDir, themes)
  fs.writeFileSync(path.join(generatedDir, "base64.js"), serializeBase64Module(base64Map, naming), "utf-8")
  fs.writeFileSync(path.join(generatedDir, "base64.d.ts"), generateBase64Types(naming, themes), "utf-8")
  for (const { name } of icons) {
    fs.writeFileSync(
      path.join(generatedDir, name, "base64.json"),
      `${JSON.stringify(base64Map[name], null, 2)}\n`,
      "utf-8"
    )
  }

  console.log(
    `✓ Generated ${label} index + catalog + source + base64 (js/d.ts) with ${icons.length} ${label}`
  )
}

/**
 * Write one surface in watch mode — logs the error instead of throwing, so a
 * transient invalid state (mid-edit) doesn't kill the watcher.
 */
export function writeSurfaceSafe(surface) {
  try {
    writeSurface(surface)
  } catch (err) {
    console.error(`✗ ${err.message}`)
  }
}
