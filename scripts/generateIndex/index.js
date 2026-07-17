/**
 * Index Generator for nice-icons — CLI entrypoint.
 *
 * Scans the flat icon set under `src/generated/` — each icon is a folder holding
 * a required `base.svg` plus any optional variant svgs (`fill.svg`, `3d.svg`, …) —
 * and generates index.js/index.d.ts (one export per variant), catalog.js/.d.ts
 * (data-only names + variants), and source.js/.d.ts (raw SVG markup for the
 * vanilla `getIcon`).
 *
 * Icons live in a single flat folder and are addressed by their folder name
 * (`check`, `nice-logo`), which is therefore globally unique — there are no
 * category folders (grouping, e.g. in Storybook, is maintained by hand). Every
 * icon must ship a `base.svg` (the default variant an `<Icon>` falls back to);
 * the generator throws if one is missing.
 *
 * The generator is split across this folder:
 * - ./icons.js               — filesystem discovery + SVG reads
 * - ./generate{Thing}.js     — content builders, one pure string producer per file
 * - ./write.js               — scrub + write the generated files
 * - ./watchMode.js           — watch + regenerate
 *
 * ## Usage
 * - Build:   node scripts/generateIndex/index.js
 * - Watch:   node scripts/generateIndex/index.js --watch
 * - Convert: node scripts/generateIndex/index.js --convert [path]   (.ai → .svg first)
 *
 * @module generateIndex
 */

import { convertAiSources } from "../convertAi.js"
import { scrubAllIcons, writeIndex } from "./write.js"
import { watchMode } from "./watchMode.js"

const args = process.argv.slice(2)

// --convert [path…]: convert .source .ai files into icon SVGs (nice-svg-generator)
// before scrubbing/generating. Each non-flag arg is a target — a folder
// ("nice-logo") or a single .ai file ("nice-logo/base.ai") — and more than one may
// be passed to convert several icons at once ("heart github check"). Omit all to
// convert every .ai under .source.
if (args.includes("--convert")) {
  const targets = args.filter((a) => !a.startsWith("--"))
  try {
    if (targets.length === 0) {
      convertAiSources()
    } else {
      for (const target of targets) convertAiSources(target)
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
  scrubAllIcons()
  writeIndex()
}
