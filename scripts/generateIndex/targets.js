/**
 * Surface descriptors — the single place the icon and illustration surfaces
 * differ. The generator (write.js, watchMode.js, index.js) is surface-agnostic
 * and drives each surface from one of these.
 *
 * Icons are monochrome geometry recolored downstream via tokens: the AI
 * converter emits geometry only, the scrubber strips Adobe styling and applies
 * semantic `currentColor` classes, and the encoded surface bakes `currentColor`
 * to a light/dark hex per theme.
 *
 * Illustrations are fixed-color art: the AI converter preserves authored colors
 * (`color: true`), the scrubber only removes Adobe cruft (colors kept), and the
 * encoded surface has no theme dimension (the color is already in the SVG).
 *
 * @module generateIndex/targets
 */

import * as path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { scrubSvgFile, scrubIllustrationFile } from "../scrubSvg.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
// This module sits in scripts/generateIndex/; go up two levels to the package
// root, then into src.
const srcDir = path.join(__dirname, "..", "..", "src")

/** Generated-symbol names + React export suffix, per surface. */
export const ICON_NAMING = {
  namesConst: "iconNames",
  variantsConst: "iconVariants",
  sourceConst: "iconSource",
  base64Const: "iconBase64",
  exportSuffix: "Icon",
}
export const ILLUSTRATION_NAMING = {
  namesConst: "illustrationNames",
  variantsConst: "illustrationVariants",
  sourceConst: "illustrationSource",
  base64Const: "illustrationBase64",
  exportSuffix: "Illustration",
}

/**
 * The icon surface — `src/icons/{source,generated}`. Monochrome; geometry-only
 * conversion, semantic-class scrub, light/dark theme baking in the encoded map.
 */
export const ICONS = {
  key: "icon",
  label: "icons",
  sourceDir: path.join(srcDir, "icons", "source"),
  generatedDir: path.join(srcDir, "icons", "generated"),
  convertOptions: {},
  // Some fill.ai sources leave a stroked construction copy; keep only the filled
  // paths for the fill variant (the base/stroke variant isn't paint-filtered).
  filterFillVariant: true,
  scrubFile: scrubSvgFile,
  naming: ICON_NAMING,
  // Encoded surface bakes `currentColor` to a hex per theme.
  themes: { base: "#000", night: "#fff" },
}

/**
 * The illustration surface — `src/illustrations/{source,generated}`. Fixed-color;
 * color-preserving conversion, cruft-only scrub, single (theme-less) encoded form.
 */
export const ILLUSTRATIONS = {
  key: "illustration",
  label: "illustrations",
  sourceDir: path.join(srcDir, "illustrations", "source"),
  generatedDir: path.join(srcDir, "illustrations", "generated"),
  convertOptions: { color: true },
  filterFillVariant: false,
  scrubFile: scrubIllustrationFile,
  naming: ILLUSTRATION_NAMING,
  // Colors are authored into the SVG; there is nothing to bake, so no themes.
  themes: null,
}

/** Every surface the generator builds, in output order (icons first). */
export const SURFACES = [ICONS, ILLUSTRATIONS]
