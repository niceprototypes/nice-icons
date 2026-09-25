[2026-09-14 22:30] patch: getIcon / getIllustration read icon tokens via getToken(..., { prefix: "icon" }) (getComponentToken removed from nice-styles)
[2026-09-16 17:35] minor: Add the lightning icon — catalog now 82 icons (base + fill variants)
[2026-09-18 12:47] minor: Add the lock-up and lock-down icon pair and retire the legacy lock. The old lock existed only in generated/ with no .ai source, so it could not be regenerated or edited; the new pair is sourced and covers both states. Nothing referenced the legacy name outside the catalog. Also picks up a reworked lightning path.
[2026-09-18 18:14] patch: Rebuild the palette icon from a corrected source. The previous .ai carried two leftover circle sets at different radii, so the generated base.svg emitted seven overlapping circles, and fill.svg emitted none at all. Both now render the intended five paths.
[2026-09-25 19:02] major: Retire the legacy lock icon in favour of lock-up and lock-down; consumers using name "lock" must switch
