import { iconBase64 } from "../generated/base64.js"

/**
 * Resolve an icon's encoded data-URI from the generated `iconBase64` map,
 * mirroring `getIcon`'s resolution: unknown name → `undefined`; unknown variant
 * → fall back to `base` with a console warning; unknown theme → fall back to the
 * variant's `base` theme with a warning.
 */
function resolveEncoded(name, variant, theme) {
  const variants = iconBase64[name]
  if (!variants) return undefined

  let themes = variants[variant]
  if (!themes) {
    console.warn(
      `nice-icons: icon "${name}" has no "${variant}" variant; using "base". ` +
        `Available: ${Object.keys(variants).join(", ")}.`
    )
    themes = variants.base
  }

  const dataUri = themes[theme]
  if (!dataUri) {
    console.warn(
      `nice-icons: icon "${name}" variant has no "${theme}" theme; using "base". ` +
        `Available: ${Object.keys(themes).join(", ")}.`
    )
    return themes.base
  }
  return dataUri
}

/**
 * Get an icon's ready-to-use SVG base64 **data-URI** by name, glyph variant, and
 * color theme — the encoded counterpart to `getIcon`. The color is baked in
 * (`base` = #000, `night` = #fff), so the result renders standalone with no CSS
 * cascade: drop it straight into an `<img src>`, a CSS `url()`/`background-image`,
 * or a `mask-image`.
 *
 * Mirrors the token getter pattern: `getIconEncoded` returns the usable, wrapped
 * form (`data:image/svg+xml;base64,…`, like `getConstant`'s `var(...)`); the
 * sibling `getIconEncodedKey` returns the bare base64 payload (like
 * `getConstantKey`). Resolution mirrors `getIcon`: unknown name → `undefined`,
 * unknown variant → `base` + warning.
 *
 * @param {string} name - The icon name (e.g. "check", "file").
 * @param {string} [variant="base"] - The glyph variant stem ("base" stroke, "fill").
 * @param {object} [options] - Encoding options.
 * @param {string} [options.theme="base"] - Color theme: "base" (#000) or "night" (#fff).
 * @returns {string | undefined} The data-URI, or `undefined` if the name is unknown.
 */
export function getIconEncoded(name, variant = "base", { theme = "base" } = {}) {
  return resolveEncoded(name, variant, theme)
}

/**
 * Get an icon's bare base64 payload — `getIconEncoded` without the
 * `data:image/svg+xml;base64,` prefix. Use when composing the data-URI yourself
 * or embedding the raw base64. Same name/variant/theme resolution as
 * `getIconEncoded`; returns `undefined` for an unknown name.
 *
 * @param {string} name - The icon name.
 * @param {string} [variant="base"] - The glyph variant stem.
 * @param {object} [options] - Encoding options.
 * @param {string} [options.theme="base"] - Color theme: "base" (#000) or "night" (#fff).
 * @returns {string | undefined} The bare base64 string, or `undefined` if unknown.
 */
export function getIconEncodedKey(name, variant = "base", { theme = "base" } = {}) {
  const dataUri = resolveEncoded(name, variant, theme)
  if (dataUri === undefined) return undefined
  return dataUri.slice(dataUri.indexOf(",") + 1)
}