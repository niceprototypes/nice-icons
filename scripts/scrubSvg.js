/**
 * SVG scrubber for nice-icons.
 *
 * Removes Adobe Illustrator artifacts (generator comment, `id="Layer_1"`, the
 * `<defs><style>.st0{…}</style></defs>` block, and `class="st…"`) and replaces
 * them with the semantic classes from `svgStyle.config.js`, applied per variant.
 * Pure string transform: deterministic and idempotent, so re-running on an
 * already-scrubbed file yields identical output (the watcher relies on this to
 * avoid a write/rewrite loop).
 *
 * ## Usage
 * - Programmatic: `scrubSvg(content, "base" | "fill" | …) -> string`
 * - CLI (stdout):  `node scripts/scrubSvg.js box/base.svg`
 * - CLI (in place): `node scripts/scrubSvg.js box/base.svg --write`
 *
 * @module scrub-svg
 */

import * as fs from "fs"
import { fileURLToPath } from "url"
import config from "./svgStyle.config.js"

// SVG drawing primitives that should receive the semantic classes. Container
// and metadata elements (`svg`, `g`, `defs`, `style`) are intentionally excluded.
const DRAW_ELEMENTS = ["path", "rect", "circle", "ellipse", "polygon", "polyline", "line"]

/** Build the inline `<style>` body from a variant's class list, config order preserved. */
function buildStyleBody(classNames) {
  return classNames
    .map((name) => {
      const decls = config.classes[name]
      if (!decls) return ""
      const body = Object.entries(decls)
        .map(([prop, value]) => `${prop}:${value}`)
        .join(";")
      return `.${name}{${body}}`
    })
    .filter(Boolean)
    .join("")
}

/**
 * Derive the variant key from a file path or name — the svg filename stem
 * (`base.svg` → "base", `fill.svg` → "fill", `3d.svg` → "3d"). Variants are
 * open-ended; the stem is looked up in svgStyle.config's `variants`, and a stem
 * with no entry there gets no semantic classes (artifact-scrub only). Defaults to
 * "base" when no stem can be read.
 */
export function variantFromFilename(file) {
  const match = /([^/\\]+)\.svg$/i.exec(file)
  return match ? match[1] : "base"
}

/**
 * Scrub one SVG string for the given variant. Returns normalized markup.
 */
export function scrubSvg(content, variant) {
  let svg = content

  // 1. Drop XML comments (the Adobe generator banner).
  svg = svg.replace(/<!--[\s\S]*?-->/g, "")
  // 2. Drop the Adobe class definitions: a <defs> that wraps a <style>, plus any
  //    standalone <style> element.
  svg = svg.replace(/<defs>\s*<style>[\s\S]*?<\/style>\s*<\/defs>/g, "")
  svg = svg.replace(/<style>[\s\S]*?<\/style>/g, "")
  // 3. Drop Illustrator's root id.
  svg = svg.replace(/\s+id="Layer_1"/g, "")
  // 4. Drop every existing class attribute (Adobe's .st… assignments).
  svg = svg.replace(/\s+class="[^"]*"/g, "")

  // 4b. Strip pdf2svg (Poppler) export artifacts. The AI→pdf2svg pipeline emits
  //     pt-unit width/height, an unused xlink namespace, and hardcoded
  //     presentation attributes (rgb() colors, opacity, miterlimit, and the
  //     stroke width/caps the semantic classes already provide). Removing them
  //     is a pure string strip — coordinates and `transform` matrices are left
  //     untouched, so geometric precision is preserved. `fill-rule` is kept (it
  //     controls compound-fill holes). Idempotent: no-op on already-clean icons.
  svg = svg
    .replace(/\s+xmlns:xlink="[^"]*"/g, "")
    .replace(/\s+(?:width|height)="[0-9.]+pt"/g, "")
    .replace(/\s+fill="none"/g, "")
    .replace(/\s+fill="rgb\([^)]*\)"/g, "")
    .replace(/\s+fill-opacity="[0-9.]+"/g, "")
    .replace(/\s+stroke="none"/g, "")
    .replace(/\s+stroke="rgb\([^)]*\)"/g, "")
    .replace(/\s+stroke-opacity="[0-9.]+"/g, "")
    .replace(/\s+stroke-miterlimit="[0-9.]+"/g, "")
    .replace(/\s+stroke-width="[0-9.]+(?:px)?"/g, "")
    .replace(/\s+stroke-linecap="[a-z]+"/g, "")
    .replace(/\s+stroke-linejoin="[a-z]+"/g, "")

  // 4c. Drop exact-duplicate drawing elements. Illustrator's "PDF Compatible"
  //     stream can retain history — the same path painted more than once with
  //     identical geometry and transform. With the class attributes stripped
  //     above, such duplicates are byte-identical, so keep the first occurrence
  //     of each element and remove the rest. Only exact matches are removed:
  //     paths that differ in `d` or `transform` (a nudged copy, a distinct
  //     shape) are always preserved, and the pass is a no-op once deduped.
  {
    const drawRe = new RegExp(`<(?:${DRAW_ELEMENTS.join("|")})\\b[^>]*/>`, "g")
    const seen = new Set()
    svg = svg.replace(drawRe, (el) => {
      const key = el.replace(/\s+/g, " ").trim()
      if (seen.has(key)) return ""
      seen.add(key)
      return el
    })
  }

  const classNames = config.variants[variant] || []

  // 5. Apply the variant's semantic classes to each drawing element.
  if (classNames.length) {
    const classAttr = ` class="${classNames.join(" ")}"`
    const tagRe = new RegExp(`<(${DRAW_ELEMENTS.join("|")})\\b`, "g")
    svg = svg.replace(tagRe, (_m, tag) => `<${tag}${classAttr}`)
  }

  // 6. Inject the minimal <style> immediately after the opening <svg> tag.
  const styleBody = buildStyleBody(classNames)
  if (styleBody) {
    svg = svg.replace(/(<svg\b[^>]*>)/, `$1\n  <style>${styleBody}</style>`)
  }

  // 7. Collapse blank lines left behind by the removals and normalize trailing newline.
  svg = svg.replace(/[ \t]*\n(?:[ \t]*\n)+/g, "\n").replace(/\s*$/, "\n")

  return svg
}

/**
 * Scrub a file on disk. Writes only when the content actually changes (keeps the
 * watcher idempotent). Returns true if the file was rewritten.
 */
export function scrubSvgFile(filePath) {
  const original = fs.readFileSync(filePath, "utf-8")
  const scrubbed = scrubSvg(original, variantFromFilename(filePath))
  if (scrubbed === original) return false
  fs.writeFileSync(filePath, scrubbed, "utf-8")
  return true
}

// CLI: print to stdout, or rewrite in place with --write.
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const [file, ...flags] = process.argv.slice(2)
  if (!file) {
    console.error("usage: node scripts/scrubSvg.js <path/to/icon.svg> [--write]")
    process.exit(1)
  }
  if (flags.includes("--write")) {
    const changed = scrubSvgFile(file)
    console.log(changed ? `✓ scrubbed ${file}` : `· unchanged ${file}`)
  } else {
    process.stdout.write(scrubSvg(fs.readFileSync(file, "utf-8"), variantFromFilename(file)))
  }
}
