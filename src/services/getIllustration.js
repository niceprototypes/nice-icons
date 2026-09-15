import { getToken } from "nice-styles"
import { illustrationSource } from "../illustrations/generated/source.js"

/**
 * Set (or replace) attributes on the root `<svg>` tag. Existing attributes of the
 * same name are overwritten; new ones are appended. `null`/`undefined`/`false`
 * values are skipped, so callers can pass optional attributes directly.
 */
function setRootAttributes(svg, attributes) {
  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrString) => {
    let next = attrString
    for (const [name, value] of Object.entries(attributes)) {
      if (value == null || value === false) continue
      const existing = new RegExp(`\\s${name}="[^"]*"`)
      const declaration = ` ${name}="${value}"`
      next = existing.test(next) ? next.replace(existing, declaration) : `${next}${declaration}`
    }
    return `<svg${next}>`
  })
}

/**
 * Get an illustration's ready-to-inject SVG markup by name and variant — the
 * vanilla counterpart to the React `<Illustration>` component, for consumers who
 * want the raw `<svg>` string without writing HTML/JSX.
 *
 * Unlike `getIcon`, an illustration carries its own authored, fixed colors, so
 * this NEVER recolors: no stroke/fill token, no `currentColor`. Only the root is
 * touched — `size` sets the `<svg>` width/height (from the nice-styles `icon`
 * size token, so illustrations scale consistently with icons), plus optional
 * `className`, `viewBox`, and `style`. Every fill in the body is left untouched.
 *
 * Variant resolution mirrors `getIcon`: an unknown variant falls back to `base`
 * with a console warning; an unknown name returns `undefined`.
 *
 * @param {string} name - The illustration name (e.g. "nice-heart").
 * @param {string} [variant="base"] - The variant stem (most illustrations ship only "base").
 * @param {object} [options] - Presentation options.
 * @param {string} [options.size="base"] - Size token variant (sets root width/height).
 * @param {string} [options.className] - Class applied to the root `<svg>`.
 * @param {string} [options.viewBox] - Override the SVG viewBox.
 * @param {string} [options.style] - Extra inline style appended to the root `<svg>`.
 * @returns {string | undefined} The SVG markup, or `undefined` if the name is unknown.
 */
export function getIllustration(name, variant = "base", options = {}) {
  const variants = illustrationSource[name]
  if (!variants) return undefined

  let svg = variants[variant]
  if (!svg) {
    console.warn(
      `nice-icons: illustration "${name}" has no "${variant}" variant; rendering "base". ` +
        `Available: ${Object.keys(variants).join(", ")}.`
    )
    svg = variants.base
  }

  const { size = "base", className, viewBox, style } = options
  const sizeValue = getToken("size", size, { prefix: "icon" })

  return setRootAttributes(svg, {
    width: sizeValue,
    height: sizeValue,
    class: className,
    viewBox,
    style,
  })
}
