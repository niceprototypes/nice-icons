import type { iconNames } from "../generated/catalog"

/**
 * Every registered icon name — the literal union derived from the generated
 * catalog. Passing a name outside this set is a compile error, so a typo like
 * `"arrow-down"` (the real name is `"arrow-bottom"`) is caught before it becomes
 * a silent `undefined` at runtime.
 */
export type IconName = (typeof iconNames)[number]

/** Encoding options for the base64 icon accessors. */
export interface GetIconEncodedOptions {
  /** Color theme: "base" (#000) or "night" (#fff). Default "base". */
  theme?: "base" | "night"
}

/**
 * Get an icon's ready-to-use SVG base64 data-URI by name, glyph variant, and
 * color theme — the encoded counterpart to `getIcon`. Color is baked in
 * (`base` = #000, `night` = #fff), so it renders standalone (no CSS cascade):
 * usable directly as an `<img src>`, CSS `url()`, or `mask-image`. Returns the
 * wrapped `data:image/svg+xml;base64,…` form; the sibling `getIconEncodedKey`
 * returns the bare payload. Unknown variant → `base` + warning; unknown name →
 * `undefined`.
 */
export function getIconEncoded(
  name: IconName,
  variant?: string,
  options?: GetIconEncodedOptions
): string | undefined

/**
 * Get an icon's bare base64 payload — `getIconEncoded` without the
 * `data:image/svg+xml;base64,` prefix. Same name/variant/theme resolution;
 * `undefined` for an unknown name.
 */
export function getIconEncodedKey(
  name: IconName,
  variant?: string,
  options?: GetIconEncodedOptions
): string | undefined
