/**
 * Watch mode — regenerate on asset add/remove and scrub-then-regenerate on SVG
 * edits, across every surface (icons, illustrations). Kept separate from
 * ./write.js so the one-shot build path stays free of long-lived watchers.
 *
 * @module generateIndex/watchMode
 */

import * as fs from "fs"
import * as path from "path"
import { getIcons } from "./icons.js"
import { scrubSurface, writeSurfaceSafe } from "./write.js"
import { SURFACES } from "./targets.js"

/** Watch for changes and regenerate, per surface. */
export function watchMode() {
  console.log("Watching for asset changes...")
  for (const surface of SURFACES) {
    scrubSurface(surface)
    writeSurfaceSafe(surface)
    watchSurface(surface)
  }
}

/**
 * Watch one surface: the generatedDir for asset folders being added or removed,
 * and every asset folder for SVG edits (scrubbing the just-saved file). No-op if
 * the surface has no generatedDir yet.
 */
function watchSurface(surface) {
  const { generatedDir, scrubFile, label } = surface
  if (!fs.existsSync(generatedDir)) return

  // Watch the root for asset folders being added or removed. The generated
  // output files (index.js, catalog.js, *.d.ts) also live here — ignore their
  // writes so regenerating doesn't retrigger the watcher.
  fs.watch(generatedDir, { recursive: false }, (_eventType, filename) => {
    if (!filename || filename.startsWith(".")) return
    if (/\.(js|d\.ts)$/.test(filename)) return
    console.log(`${label} directory changed: ${filename}`)
    writeSurfaceSafe(surface)
  })

  // Watch each asset folder for SVG edits, scrubbing the just-saved file. Writing
  // a cleaned version triggers one more change event, but the scrub is idempotent
  // so that pass is a no-op (identical content -> no write -> no further event).
  for (const { name } of getIcons(generatedDir)) {
    const assetPath = path.join(generatedDir, name)
    fs.watch(assetPath, (_eventType, filename) => {
      if (!filename || !filename.endsWith(".svg")) return
      const filePath = path.join(assetPath, filename)
      try {
        if (fs.existsSync(filePath) && scrubFile(filePath)) {
          console.log(`✓ Scrubbed ${label} ${name}/${filename}`)
        }
      } catch (err) {
        console.error(`✗ Scrub failed for ${label} ${name}/${filename}: ${err.message}`)
      }
      console.log(`${label} SVG changed: ${name}/${filename}`)
      writeSurfaceSafe(surface)
    })
  }
}
