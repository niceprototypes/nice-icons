/**
 * Index Generator for nice-icons — CLI entrypoint.
 *
 * Scans each asset surface and generates its index.js/.d.ts (one export per
 * variant), catalog.js/.d.ts (data-only names + variants), source.js/.d.ts (raw
 * SVG markup for the vanilla getters), and base64.js/.d.ts (encoded data-URIs):
 *
 *   - Icons        — `src/icons/source` → `src/icons/generated` (monochrome,
 *                    geometry-only conversion, semantic-class scrub, themed base64).
 *   - Illustrations — `src/illustrations/source` → `src/illustrations/generated`
 *                    (fixed-color conversion, cruft-only scrub, theme-less base64).
 *
 * Each surface is a flat folder addressed by folder name (`check`, `nice-heart`),
 * globally unique within its surface. Every asset must ship a `base.svg` (the
 * default variant); the generator throws if one is missing. See ./targets.js.
 *
 * The generator is split across this folder:
 * - ./targets.js             — surface descriptors (icons, illustrations)
 * - ./icons.js               — filesystem discovery + SVG reads
 * - ./generate{Thing}.js     — content builders, one pure string producer per file
 * - ./write.js               — scrub + write the generated files, per surface
 * - ./watchMode.js           — watch + regenerate
 *
 * ## Usage
 * - Build:   node scripts/generateIndex/index.js
 * - Watch:   node scripts/generateIndex/index.js --watch
 * - Convert: node scripts/generateIndex/index.js --convert [path…]   (.ai → .svg first)
 *
 * @module generateIndex
 */

import * as fs from "fs"
import * as path from "path"
import { convertAiSources } from "../convertAi.js"
import { scrubSurface, writeSurface } from "./write.js"
import { watchMode } from "./watchMode.js"
import { SURFACES } from "./targets.js"

const args = process.argv.slice(2)

// --convert [path…]: convert .ai sources into asset SVGs (nice-svg-generator)
// before scrubbing/generating. Each non-flag arg is a target — a folder
// ("nice-heart") or a single .ai file ("nice-heart/base.ai"). A target is routed
// to whichever surface(s) contain it (icons and illustrations may share a name,
// e.g. nice-heart, so both get converted). Omit all targets to convert every
// .ai across all surfaces (up-to-date svgs are skipped).
if (args.includes("--convert")) {
  const targets = args.filter((a) => !a.startsWith("--"))
  try {
    if (targets.length === 0) {
      for (const surface of SURFACES) convertAiSources("", surface)
    } else {
      for (const target of targets) {
        const hits = SURFACES.filter((s) => fs.existsSync(path.join(s.sourceDir, target)))
        if (!hits.length) throw new Error(`--convert target not found in any surface: "${target}"`)
        for (const surface of hits) convertAiSources(target, surface)
      }
    }
  } catch (err) {
    // Print a clean one-line reason (e.g. missing target) instead of a stack trace.
    console.error(`✗ ${err.message}`)
    process.exit(1)
  }
}

if (args.includes("--watch")) {
  watchMode()
} else {
  for (const surface of SURFACES) {
    scrubSurface(surface)
    writeSurface(surface)
  }
}
