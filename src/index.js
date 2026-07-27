/**
 * @fileoverview Public package entry for nice-icons.
 *
 * Surfaces everything from the package root — the generated icon and
 * illustration exports plus the consumable service functions — so consumers
 * import from `"nice-icons"` directly:
 *
 *   import { getIcon, CheckBaseIcon, getIllustration, NiceHeartBaseIllustration } from "nice-icons"
 *
 * Two asset surfaces ship side by side: monochrome, token-recolored **icons**
 * (`getIcon`/`getIconEncoded`) and fixed-color **illustrations**
 * (`getIllustration`/`getIllustrationEncoded`). The subpath exports
 * (`nice-icons/get-icon`, `/catalog`, `/illustration-catalog`, …) remain for
 * narrow/direct access, but the root is the intended surface.
 *
 * @module nice-icons
 */

export * from "./icons/generated/index.js"
export * from "./illustrations/generated/index.js"
export * from "./services/getIcon.js"
export * from "./services/getIconEncoded.js"
export * from "./services/getIllustration.js"
export * from "./services/getIllustrationEncoded.js"
