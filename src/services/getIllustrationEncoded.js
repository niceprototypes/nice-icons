import { illustrationBase64 } from "../illustrations/generated/base64.js"

/**
 * Resolve an illustration's encoded data-URI from the generated
 * `illustrationBase64` map. Unlike `getIconEncoded`, there is no theme dimension
 * — an illustration's colors are baked into the SVG as authored. Resolution
 * mirrors `getIllustration`: unknown name → `undefined`; unknown variant → fall
 * back to `base` with a console warning.
 */
function resolveEncoded(name, variant) {
  const variants = illustrationBase64[name]
  if (!variants) return undefined

  const dataUri = variants[variant]
  if (!dataUri) {
    console.warn(
      `nice-icons: illustration "${name}" has no "${variant}" variant; using "base". ` +
        `Available: ${Object.keys(variants).join(", ")}.`
    )
    return variants.base
  }
  return dataUri
}

/**
 * Get an illustration's ready-to-use SVG base64 **data-URI** by name and variant
 * — the encoded counterpart to `getIllustration`. The authored colors are
 * already in the SVG, so the result renders standalone with no CSS cascade and
 * no theme: drop it straight into an `<img src>`, a CSS `url()`/`background-image`,
 * or a `mask-image`.
 *
 * Mirrors the token getter pattern: `getIllustrationEncoded` returns the usable,
 * wrapped form (`data:image/svg+xml;base64,…`); the sibling
 * `getIllustrationEncodedKey` returns the bare base64 payload. Resolution mirrors
 * `getIllustration`: unknown name → `undefined`, unknown variant → `base` + warning.
 *
 * @param {string} name - The illustration name (e.g. "nice-heart").
 * @param {string} [variant="base"] - The variant stem (most ship only "base").
 * @returns {string | undefined} The data-URI, or `undefined` if the name is unknown.
 */
export function getIllustrationEncoded(name, variant = "base") {
  return resolveEncoded(name, variant)
}

/**
 * Get an illustration's bare base64 payload — `getIllustrationEncoded` without
 * the `data:image/svg+xml;base64,` prefix. Use when composing the data-URI
 * yourself or embedding the raw base64. Same name/variant resolution; returns
 * `undefined` for an unknown name.
 *
 * @param {string} name - The illustration name.
 * @param {string} [variant="base"] - The variant stem.
 * @returns {string | undefined} The bare base64 string, or `undefined` if unknown.
 */
export function getIllustrationEncodedKey(name, variant = "base") {
  const dataUri = resolveEncoded(name, variant)
  if (dataUri === undefined) return undefined
  return dataUri.slice(dataUri.indexOf(",") + 1)
}
