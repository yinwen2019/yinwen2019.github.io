# Blue profile implementation validation

Validated locally on 2026-10-24. The new homepage and shared shell are the implementation scope; the other three pages retain their interior markup and content.

- Jekyll build completed successfully. JavaScript syntax checks and `git diff --check` passed.
- Built article text for Publications, Experience, and Honors & Talks was compared with the pre-redesign build: unchanged.
- Verified the lab logo follows the institute name inline, and the original dynamic Scholar badge follows `15+ papers` inline. Both images loaded in the browser.
- Tested the four navigation routes, Home's full-publications link, direct section URLs, refresh, legacy publication bookmarks, and keyboard activation. Keyboard navigation moves focus to the reading pane.
- The right pane scrolled to 1300px while the header remained at y=0 and profile rail at y=64. Browser Back restored that 1300px position.
- Tested figure enlargement and Escape-to-close, plus the Earlier news disclosure.
- A temporary local test server delayed Experience and returned 503 for the first Publications fetch. Rapid clicks ended on the latest requested route; the failed fetch fell back to ordinary static navigation and rendered all 13 publications.
- At 390×844, the profile remains on the left, all five contact/profile links are visible, and Home, Experience and Honors & Talks have no horizontal content overflow. Header y=0, rail y=96, and the reading pane scrolls separately.
- Direct fragment visits were checked after enabling clipped outer overflow: header y=0 and rail y=64, without outer-document scrolling.
- Final screenshots: `.impeccable/review/desktop.png` (1440×900), `mobile.png` (390×844), and `user-1280.png` (1280×720). No JavaScript console errors were observed.
- Independent finish review requested one compact-height correction. The corrected 844×390 capture is `.impeccable/review/landscape.png`: all five links have 44px targets and their centers hit the correct anchors, with the last link ending at y=373.65 inside the 390px viewport. The reviewer scored F1 resolved and its introduced regressions clear (`disposition: ship`, at that correction's scope).
- Development briefs, PRODUCT.md, DESIGN.md, docs and tests are excluded from Jekyll output.

Limitations: Impeccable's automated detector could not start because its local engine is not installed. The live Google Scholar badge remains dependent on its existing external endpoint. No publication destinations or academic claims were changed during this UI work.
