import { getComponentToken } from "nice-styles"
import { iconSource } from "../generated/source.js"

/**
 * Drawing elements whose fill/stroke `getIcon` overrides for the built-in
 * `base`/`fill` variants — the same shape set the scrubber recognizes.
 */
const DRAW_ELEMENTS = ["path", "rect", "circle", "ellipse", "polygon", "polyline", "line"]

/** Resolve an `icon` component token to its `var(--np--icon--…)` reference. */
function iconToken(token, variant) {
  return getComponentToken("icon", { token, variant })
}

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
 * Merge a `style` declaration block into a self-closing element tag, appending to
 * any existing inline style so authored declarations are preserved.
 */
function mergeElementStyle(elementTag, styleBlock) {
  const existing = /\sstyle="([^"]*)"/
  if (existing.test(elementTag)) {
    return elementTag.replace(
      existing,
      (_match, current) => ` style="${current.replace(/;?\s*$/, ";")}${styleBlock}"`
    )
  }
  return elementTag.replace(/\s*\/?>$/, ` style="${styleBlock}"/>`)
}

/**
 * Per-element fill/stroke for the built-in variants, mirroring the React
 * `<Icon>`'s styled rules (Icon.styles.ts): `base` strokes with the color token
 * at the stroke-width token; `fill` fills with the color token. `vector-effect:
 * non-scaling-stroke` keeps stroke weight constant while scaling unless
 * `strokeScaling` is set. Returns `null` for custom variants (e.g. `3d`), whose
 * authored fill/stroke is left untouched.
 */
function variantElementStyle(variant, { colorValue, strokeWidthValue, strokeScaling }) {
  const vectorEffect = strokeScaling ? "" : "vector-effect:non-scaling-stroke;"
  if (variant === "fill") return `${vectorEffect}fill:${colorValue};stroke:none;`
  if (variant === "base") {
    return (
      `${vectorEffect}fill:none;stroke:${colorValue};` +
      `stroke-width:${strokeWidthValue};stroke-linecap:round;stroke-linejoin:round;`
    )
  }
  return null
}

/**
 * Get an icon's ready-to-inject SVG markup by name and variant — the vanilla
 * counterpart to the React `<Icon>` component, for consumers who want the raw
 * `<svg>` string without writing HTML/JSX.
 *
 * The returned string is styled from nice-styles `icon` tokens: `size` sets the
 * root width/height, `color` sets stroke (base) or fill (fill), and `strokeWidth`
 * sets base stroke weight — each a `var(--np--icon--…)` reference resolved from
 * whatever tokens are on the page (identical contract to `<Icon>`). Custom
 * variants keep their authored fill/stroke; only root sizing/color apply.
 *
 * Variant resolution matches `<Icon>`: an unknown variant falls back to `base`
 * with a console warning; an unknown name returns `undefined`.
 *
 * @param {string} name - The icon name (e.g. "check", "arrow-right").
 * @param {string} [variant="base"] - The variant stem (e.g. "fill", "3d").
 * @param {object} [options] - Presentation options mirroring `<Icon>` props.
 * @param {string} [options.size="base"] - Size token variant.
 * @param {string} [options.color="base"] - Color token variant.
 * @param {string} [options.strokeWidth="base"] - Stroke-width token variant (base variant only).
 * @param {boolean} [options.strokeScaling=false] - Keep stroke weight constant while scaling.
 * @param {string} [options.className] - Class applied to the root `<svg>`.
 * @param {string} [options.viewBox] - Override the SVG viewBox.
 * @param {string} [options.style] - Extra inline style appended to the root `<svg>`.
 * @returns {string | undefined} The SVG markup, or `undefined` if the name is unknown.
 */
export function getIcon(name, variant = "base", options = {}) {
  const variants = iconSource[name]
  if (!variants) return undefined

  let resolvedVariant = variant
  let svg = variants[variant]
  if (!svg) {
    console.warn(
      `nice-icons: icon "${name}" has no "${variant}" variant; rendering "base". ` +
        `Available: ${Object.keys(variants).join(", ")}.`
    )
    resolvedVariant = "base"
    svg = variants.base
  }

  const {
    size = "base",
    color = "base",
    strokeWidth = "base",
    strokeScaling = false,
    className,
    viewBox,
    style,
  } = options

  const sizeValue = iconToken("size", size)
  const colorValue = iconToken("color", color)
  const strokeWidthValue = iconToken("strokeWidth", strokeWidth)

  // Root: size, current color (feeds `currentColor` in custom variants), and any
  // caller class / viewBox override.
  const rootStyle = `color:${colorValue};${style ? style.replace(/;?\s*$/, ";") : ""}`
  svg = setRootAttributes(svg, {
    width: sizeValue,
    height: sizeValue,
    class: className,
    viewBox,
    style: rootStyle,
  })

  // Built-in variants: replace the class-driven fill/stroke (the embedded
  // `<style>` and element classes) with token-driven inline styles, matching
  // `<Icon>`. Custom variants keep their authored styling.
  const elementStyle = variantElementStyle(resolvedVariant, {
    colorValue,
    strokeWidthValue,
    strokeScaling,
  })
  if (elementStyle) {
    svg = svg.replace(/\s*<style\b[^>]*>[\s\S]*?<\/style>\s*/gi, "\n")
    const drawRe = new RegExp(`<(?:${DRAW_ELEMENTS.join("|")})\\b[^>]*/>`, "g")
    svg = svg.replace(drawRe, (element) =>
      mergeElementStyle(element.replace(/\sclass="[^"]*"/, ""), elementStyle)
    )
  }

  return svg
}
