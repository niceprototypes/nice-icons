import type { IllustrationName } from "./getIllustrationEncoded"

/** Presentation options for `getIllustration`. Unlike `getIcon`, there is no
 * color/stroke option — an illustration keeps its authored colors. */
export interface GetIllustrationOptions {
  /** Size token variant (default "base"). Sets the root `<svg>` width/height. */
  size?: string
  /** Class applied to the root `<svg>`. */
  className?: string
  /** Override the SVG viewBox. */
  viewBox?: string
  /** Extra inline style appended to the root `<svg>`. */
  style?: string
}

/**
 * Get an illustration's ready-to-inject SVG markup by name and variant — the
 * vanilla counterpart to the React `<Illustration>` component. Never recolors
 * (illustrations carry fixed authored colors); only the root `<svg>` is sized/
 * classed. An unknown variant falls back to `base` with a console warning; an
 * unknown name returns `undefined`.
 */
export function getIllustration(
  name: IllustrationName,
  variant?: string,
  options?: GetIllustrationOptions
): string | undefined
