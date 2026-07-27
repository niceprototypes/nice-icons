import type { illustrationNames } from "../illustrations/generated/catalog"

/**
 * Every registered illustration name — the literal union derived from the
 * generated catalog. Passing a name outside this set is a compile error, so a
 * typo is caught before it becomes a silent `undefined` at runtime.
 */
export type IllustrationName = (typeof illustrationNames)[number]

/**
 * Get an illustration's ready-to-use SVG base64 data-URI by name and variant —
 * the encoded counterpart to `getIllustration`. Colors are authored into the SVG
 * (no theme dimension), so it renders standalone: usable directly as an
 * `<img src>`, CSS `url()`, or `mask-image`. Returns the wrapped
 * `data:image/svg+xml;base64,…` form; the sibling `getIllustrationEncodedKey`
 * returns the bare payload. Unknown variant → `base` + warning; unknown name →
 * `undefined`.
 */
export function getIllustrationEncoded(name: IllustrationName, variant?: string): string | undefined

/**
 * Get an illustration's bare base64 payload — `getIllustrationEncoded` without
 * the `data:image/svg+xml;base64,` prefix. Same name/variant resolution;
 * `undefined` for an unknown name.
 */
export function getIllustrationEncodedKey(name: IllustrationName, variant?: string): string | undefined
