/**
 * @fileoverview Convert Adobe Illustrator sources into icon SVGs.
 *
 * `.ai` files are PDF-compatible; nice-svg-generator reads their path geometry
 * and emits a clean SVG (no external pdf2svg / poppler dependency). Sources live
 * under `src/source/`, mirroring the flat icon tree: `src/source/{name}/{variant}.ai`
 * maps to `src/generated/{name}/{variant}.svg` — the same tree the scrubber and
 * index generator walk. The converted SVG is normalized afterward by scrubSvg.js
 * (which applies the semantic base/fill classes).
 *
 * Incremental: an `.ai` is converted only when its `.svg` is missing or older.
 *
 * @module scripts/convertAi
 */

import * as fs from "fs"
import * as path from "path"
import { convert } from "nice-svg-generator"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
// .ai sources live under src/source/; converted SVGs land in src/generated/ (the
// mirrored icon tree the scrubber + index generator walk).
const sourceDir = path.join(__dirname, "..", "src", "source")
const rootDir = path.join(__dirname, "..", "src", "generated")

/** Recursively collect every `*.ai` path under `dir`. */
function findAiFiles(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    // Recurse into category/icon folders; collect .ai leaves.
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
 * Convert `.ai` sources under `.source/[target]` to their mirrored icon SVGs.
 *
 * @param {string} [target] - Optional `src/source` path. Either a folder —
 *   convert every `.ai` inside it ("nice-logo") — or a single `.ai` file
 *   ("nice-logo/base.ai"). Omitted → all of `src/source`.
 * @returns {{ converted: string[], skipped: string[] }} Paths relative to `.source`.
 */
export function convertAiSources(target = "") {
  const base = target ? path.join(sourceDir, target) : sourceDir
  if (!fs.existsSync(base)) {
    throw new Error(
      `--convert target not found: "src/source/${target}" does not exist. ` +
        `Pass a path relative to src/source — a folder ("nice-logo") ` +
        `or a single .ai file ("nice-logo/base.ai") — or omit the value to convert all.`
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
    throw new Error(`Not an .ai file or folder: .source/${target}`)
  }

  const converted = []
  const skipped = []

  for (const aiPath of aiFiles) {
    const rel = path.relative(sourceDir, aiPath) // e.g. github/base.ai
    const svgPath = path.join(rootDir, rel.replace(/\.ai$/i, ".svg"))

    // Incremental — leave up-to-date svgs alone.
    if (!isStale(aiPath, svgPath)) {
      skipped.push(rel)
      continue
    }

    fs.mkdirSync(path.dirname(svgPath), { recursive: true })
    try {
      fs.writeFileSync(svgPath, convert(fs.readFileSync(aiPath), "ai"))
    } catch (err) {
      // convert() throws a clear message on unsupported (non-basic-shape) content.
      throw new Error(`AI→SVG conversion failed on ${rel}: ${err.message}`)
    }
    converted.push(rel)
  }

  if (!aiFiles.length) {
    console.log(`  (no .ai files under .source/${target || ""})`)
  } else {
    if (converted.length) {
      console.log(`✓ Converted ${converted.length} .ai → .svg via nice-svg-generator:`)
      for (const r of converted) console.log(`  ${r} → ${r.replace(/\.ai$/i, ".svg")}`)
    }
    if (skipped.length) console.log(`  (${skipped.length} up-to-date, skipped)`)
  }

  return { converted, skipped }
}
