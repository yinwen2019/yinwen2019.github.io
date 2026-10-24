# Navigation motion

The user requested a smoother, more refined shared-navigation experience using the installed Impeccable animate workflow.

- Focal moment: one shared selection background travels between the four navigation links, keeping the reader's place legible.
- Continuity: only the reading pane transitions. Its outgoing visible region crossfades for140ms while the incoming article moves18px into place over300ms. The header and identity rail remain mounted and stationary.
- Feedback: the selection moves immediately when a route is requested; delayed loading keeps the existing article visible. Intent-based HTML prefetch and conservative idle warming reduce waiting. Requests to the same route share one in-flight load; stale requests cannot commit over a newer choice.
- Budget: no new dependency or whole-document screenshot. Only one clipped, inert outgoing article exists during a transition and is removed afterward or on interruption. Animations use transform/opacity. Reduced-motion users receive an immediate content update and selection change without spatial animation. Save-Data and slow connections skip speculative loads.

Existing URLs, modifier clicks, keyboard focus, browser history and saved scroll positions remain supported.

## Validation

- Instrumented local fixtures observed the actual Web Animations API calls: selection280ms, article entrance300ms/from18px, exit140ms/to10px in the opposite direction. Four fixture routes warmed once; subsequent clicks reused their cache.
- A reduced-motion + Save-Data fixture recorded zero animation calls and zero speculative fetches. Keyboard activation then fetched exactly one destination and focused `page-content`. No OS preferences were changed.
- Rapid consecutive navigation ended on the latest requested route; outgoing copies were removed and their cloned descendants carried no IDs.
- A stable580px reading position was restored exactly by Back. Desktop header/rail remained y=0/64; mobile y=0/96.
- At390×844 the two-row marker rectangle matched the active link exactly, including42px height. Article scrollWidth/clientWidth both268px; no horizontal overflow.
- A temporary local server rejected every enhanced Publications fetch with503 while serving ordinary navigation normally. The browser fell back to the real URL, rendered all13 publications, and cleared loading state.
- The production preview had no captured JavaScript console errors. Temporary instrumented pages were removed; no test hooks ship.
