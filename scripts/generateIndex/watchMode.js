/**
 * Watch mode — regenerate on icon add/remove and scrub-then-regenerate on SVG
 * edits. Kept separate from ./write.js so the one-shot build path stays free of
 * long-lived watchers.
 *
 * @module generateIndex/watchMode
 */

import * as fs from "fs"
import * as path from "path"
import { scrubSvgFile } from "../scrubSvg.js"
import { rootDir, getIcons } from "./icons.js"
import { scrubAllIcons, writeIndexSafe } from "./write.js"

/**
 * Watch for changes and regenerate. Watches the root for icon folders being
 * added or removed, and every icon folder for SVG edits.
 */
export function watchMode() {
  console.log("Watching for icon changes...")
  scrubAllIcons()
  writeIndexSafe()

  // Watch the root for icon folders being added or removed. The generated output
  // files (index.js, catalog.js, *.d.ts) also live here — ignore their writes so
  // regenerating doesn't retrigger the watcher.
  fs.watch(rootDir, { recursive: false }, (_eventType, filename) => {
    if (!filename || filename.startsWith(".")) return
    if (/\.(js|d\.ts)$/.test(filename)) return
    console.log(`Icon directory changed: ${filename}`)
    writeIndexSafe()
  })

  // Watch each icon folder for SVG edits, scrubbing the just-saved file.
  for (const { name } of getIcons()) {
    const iconPath = path.join(rootDir, name)
    fs.watch(iconPath, (_eventType, filename) => {
      if (!filename || !filename.endsWith(".svg")) return
      // Scrub the just-saved file. Writing a cleaned version triggers one more
      // change event, but the scrub is idempotent so that pass is a no-op
      // (identical content -> no write -> no further event): no loop.
      const filePath = path.join(iconPath, filename)
      try {
        if (fs.existsSync(filePath) && scrubSvgFile(filePath)) {
          console.log(`✓ Scrubbed ${name}/${filename}`)
        }
      } catch (err) {
        console.error(`✗ Scrub failed for ${name}/${filename}: ${err.message}`)
      }
      console.log(`SVG changed: ${name}/${filename}`)
      writeIndexSafe()
    })
  }
}
