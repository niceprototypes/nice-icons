/** Presentation options mirroring the React `<Icon>` component's props. */
export interface GetIconOptions {
  /** Size token variant (default "base"). Sets the root `<svg>` width/height. */
  size?: string
  /** Color token variant (default "base"). Sets stroke (base) or fill (fill). */
  color?: string
  /** Stroke-width token variant (default "base"). Applies to the `base` variant only. */
  strokeWidth?: string
  /** Keep stroke weight constant while scaling (default false). */
  strokeScaling?: boolean
  /** Class applied to the root `<svg>`. */
  className?: string
  /** Override the SVG viewBox. */
  viewBox?: string
  /** Extra inline style appended to the root `<svg>`. */
  style?: string
}

/**
 * Get an icon's ready-to-inject SVG markup by name and variant — the vanilla
 * counterpart to the React `<Icon>` component. Styled from nice-styles `icon`
 * tokens. An unknown variant falls back to `base` with a console warning; an
 * unknown name returns `undefined`.
 */
export function getIcon(name: string, variant?: string, options?: GetIconOptions): string | undefined
