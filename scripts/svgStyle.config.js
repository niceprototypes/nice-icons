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
 * `variants` maps a file variant (the svg filename stem — `base`, `fill`, `3d`, …)
 * to the ordered list of semantic classes applied to its drawing elements.
 * `base` is the default/required variant (formerly `stroke`): an outline drawn in
 * `currentColor`. A variant with no entry here (e.g. a future `3d`) is scrubbed of
 * Adobe artifacts but keeps its own authored styling. `classes` maps each semantic
 * class to its CSS declarations, emitted into an inline `<style>` in every SVG (the
 * only styling that survives a raw `<img>`).
 */
export default {
  variants: {
    base: ["no-fill", "stroke"],
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
