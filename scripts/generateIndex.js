/**
 * Index Generator for nice-icons
 *
 * This script scans icon directories and generates index.js with exports.
 * It can run in watch mode to automatically regenerate when SVGs change.
 *
 * ## Usage
 * - Build: node scripts/generateIndex.js
 * - Watch: node scripts/generateIndex.js --watch
 *
 * @module generate-index
 */

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = path.join(__dirname, "..")

/**
 * Convert icon name to PascalCase export name
 * e.g., "arrow" -> "Arrow", "some-icon" -> "SomeIcon"
 */
function toPascalCase(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/**
 * Get all icon directories (folders containing stroke.svg and fill.svg)
 */
function getIconDirs() {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true })
  return entries
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      if (entry.name.startsWith(".")) return false
      if (entry.name === "scripts" || entry.name === "node_modules") return false

      // Check if directory contains stroke.svg or fill.svg
      const iconPath = path.join(rootDir, entry.name)
      const hasStroke = fs.existsSync(path.join(iconPath, "stroke.svg"))
      const hasFill = fs.existsSync(path.join(iconPath, "fill.svg"))
      return hasStroke || hasFill
    })
    .map((entry) => entry.name)
    .sort()
}

/**
 * Generate index.js content from icon directories
 */
function generateIndexContent(iconDirs) {
  const lines = []

  // Generate exports for each icon
  for (const iconName of iconDirs) {
    const pascalName = toPascalCase(iconName)
    const iconPath = path.join(rootDir, iconName)

    if (fs.existsSync(path.join(iconPath, "stroke.svg"))) {
      lines.push(
        `export { default as ${pascalName}StrokeIcon } from "./${iconName}/stroke.svg";`
      )
    }
    if (fs.existsSync(path.join(iconPath, "fill.svg"))) {
      lines.push(
        `export { default as ${pascalName}FillIcon } from "./${iconName}/fill.svg";`
      )
    }
  }

  // Add blank line before iconNames export
  lines.push("")

  // Generate iconNames array
  lines.push("export const iconNames = [")
  for (const iconName of iconDirs) {
    lines.push(`  "${iconName}",`)
  }
  lines.push("];")
  lines.push("")

  return lines.join("\n")
}

/**
 * Write index.js file
 */
function writeIndex() {
  const iconDirs = getIconDirs()
  const content = generateIndexContent(iconDirs)
  const indexPath = path.join(rootDir, "index.js")

  fs.writeFileSync(indexPath, content, "utf-8")
  console.log(`✓ Generated index.js with ${iconDirs.length} icons`)
}

/**
 * Watch for changes and regenerate
 */
function watchMode() {
  console.log("Watching for icon changes...")
  writeIndex()

  // Watch for directory changes (new icons added/removed)
  fs.watch(rootDir, { recursive: false }, (eventType, filename) => {
    // Ignore non-directory changes and special files
    if (filename.startsWith(".") || filename === "index.js" || filename === "scripts") {
      return
    }

    const fullPath = path.join(rootDir, filename)
    // Check if it's a directory (or was a directory that got deleted)
    try {
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        console.log(`Icon directory changed: ${filename}`)
        writeIndex()
      }
    } catch {
      // Directory was deleted
      console.log(`Icon directory removed: ${filename}`)
      writeIndex()
    }
  })

  // Watch for SVG file changes within icon directories
  const iconDirs = getIconDirs()
  for (const iconName of iconDirs) {
    const iconPath = path.join(rootDir, iconName)
    fs.watch(iconPath, (eventType, filename) => {
      if (filename && filename.endsWith(".svg")) {
        console.log(`SVG changed: ${iconName}/${filename}`)
        writeIndex()
      }
    })
  }
}

// Main execution
const args = process.argv.slice(2)
if (args.includes("--watch")) {
  watchMode()
} else {
  writeIndex()
}
