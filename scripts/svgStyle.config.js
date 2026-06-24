/**
 * Semantic SVG styling config for nice-icons.
 *
 * Adobe Illustrator exports each icon with an arbitrary, inconsistent class
 * (`.st0` meaning `fill:none` in one file and `fill:#231f20` in another) plus a
 * generator comment and `id="Layer_1"`. The scrubber (`scrubSvg.js`) strips all
 * of that and re-applies the semantic classes defined here, keyed by variant —
 * so every icon ships self-contained and uniform, and the whole set is retuned
 * from this one file.
 *
 * `variants` maps a file variant (derived from `stroke.svg` / `fill.svg`) to the
 * ordered list of semantic classes applied to its drawing elements. `classes`
 * maps each semantic class to its CSS declarations, emitted into an inline
 * `<style>` in every SVG (the only styling that survives a raw `<img>`).
 */
export default {
  variants: {
    stroke: ["no-fill", "stroke"],
    fill: ["fill"],
  },
  classes: {
    "no-fill": { fill: "none" },
    fill: { fill: "currentColor" },
    stroke: {
      stroke: "currentColor",
      "stroke-width": "1.5px",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    },
  },
}
