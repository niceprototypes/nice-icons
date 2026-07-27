/**
 * @fileoverview Convert Adobe Illustrator sources into asset SVGs.
 *
 * `.ai` files are PDF-compatible; nice-svg-generator reads their path geometry
 * and emits a clean SVG (no external pdf2svg / poppler dependency). Sources live
 * under a surface's `sourceDir`, mirroring the flat asset tree:
 * `{sourceDir}/{name}/{variant}.ai` maps to `{generatedDir}/{name}/{variant}.svg`
 * — the same tree the scrubber and index generator walk. The converted SVG is
 * normalized afterward by scrubSvg.js.
 *
 * Surface-aware: icons convert geometry-only and paint-filter their fill variant;
 * illustrations convert with `color: true` (authored colors preserved) and are
 * not paint-filtered. The surface descriptor (see ./generateIndex/targets.js)
 * supplies `sourceDir`, `generatedDir`, `convertOptions`, and `filterFillVariant`.
 *
 * Incremental: an `.ai` is converted only when its `.svg` is missing or older.
 *
 * @module scripts/convertAi
 */

import * as fs from "fs"
import * as path from "path"
import { convert } from "nice-svg-generator"

/** Recursively collect every `*.ai` path under `dir`. */
function findAiFiles(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    // Recurse into category/asset folders; collect .ai leaves.
    if (entry.isDirectory()) out.push(...findAiFiles(full))
    else if (entry.name.toLowerCase().endsWith(".ai")) out.push(full)
  }
  return out
}

/** True when the target svg is missing or older than the source ai. */
function isStale(aiPath, svgPath) {
  if (!fs.existsSync(svgPath)) return true
  return fs.statSync(aiPath).mtimeMs > fs.statSync(svgPath).mtimeMs
}

/**
 * Convert `.ai` sources under a surface's `sourceDir/[target]` to their mirrored
 * asset SVGs in the surface's `generatedDir`.
 *
 * @param {string} target - Optional path relative to the surface's `sourceDir`.
 *   Either a folder — convert every `.ai` inside it ("nice-heart") — or a single
 *   `.ai` file ("nice-heart/base.ai"). Empty → all of the surface's sourceDir.
 * @param {object} surface - Surface descriptor: `{ sourceDir, generatedDir,
 *   convertOptions, filterFillVariant, label }`.
 * @returns {{ converted: string[], skipped: string[] }} Paths relative to sourceDir.
 */
export function convertAiSources(target = "", surface) {
  const { sourceDir, generatedDir, convertOptions = {}, filterFillVariant = false, label = "assets" } = surface
  const base = target ? path.join(sourceDir, target) : sourceDir
  if (!fs.existsSync(base)) {
    throw new Error(
      `--convert target not found: "${target}" does not exist under the ${label} source. ` +
        `Pass a path relative to the source — a folder ("nice-heart") ` +
        `or a single .ai file ("nice-heart/base.ai") — or omit the value to convert all.`
    )
  }

  // A folder converts every .ai inside; a single .ai file converts just that one.
  const stat = fs.statSync(base)
  let aiFiles
  if (stat.isDirectory()) {
    aiFiles = findAiFiles(base)
  } else if (base.toLowerCase().endsWith(".ai")) {
    aiFiles = [base]
  } else {
    throw new Error(`Not an .ai file or folder: ${target}`)
  }

  const converted = []
  const skipped = []

  for (const aiPath of aiFiles) {
    const rel = path.relative(sourceDir, aiPath) // e.g. github/base.ai
    const svgPath = path.join(generatedDir, rel.replace(/\.ai$/i, ".svg"))

    // Incremental — leave up-to-date svgs alone.
    if (!isStale(aiPath, svgPath)) {
      skipped.push(rel)
      continue
    }

    fs.mkdirSync(path.dirname(svgPath), { recursive: true })
    // Fill icons are semantically all-fill; keep only filled paths so a stroked
    // construction copy left in a fill.ai is dropped. Only icons paint-filter;
    // illustrations keep every painted path. Illustrations pass `color: true`
    // (via convertOptions) so authored fills survive.
    const variant = path.basename(aiPath).replace(/\.ai$/i, "")
    const keep = filterFillVariant && variant === "fill" ? "fill" : undefined
    try {
      fs.writeFileSync(svgPath, convert(fs.readFileSync(aiPath), "ai", { ...convertOptions, keep }))
    } catch (err) {
      // convert() throws a clear message on unsupported (non-basic-shape) content.
      throw new Error(`AI→SVG conversion failed on ${rel}: ${err.message}`)
    }
    converted.push(rel)
  }

  if (!aiFiles.length) {
    console.log(`  (no .ai files under the ${label} source${target ? `/${target}` : ""})`)
  } else {
    if (converted.length) {
      console.log(`✓ Converted ${converted.length} ${label} .ai → .svg via nice-svg-generator:`)
      for (const r of converted) console.log(`  ${r} → ${r.replace(/\.ai$/i, ".svg")}`)
    }
    if (skipped.length) console.log(`  (${skipped.length} ${label} up-to-date, skipped)`)
  }

  return { converted, skipped }
}
