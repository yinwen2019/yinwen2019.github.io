---
name: "Wen Yin's academic website"
description: "A persistent blue researcher profile beside a focused academic reading pane."
colors:
  profile-ink: "#203b53"
  profile-muted: "#4c657a"
  profile-link: "#245b87"
  profile-rail: "#edf3f9"
  profile-wash: "#edf5fc"
  profile-rule: "#dce5ee"
  reading-surface: "#ffffff"
  navigation-hover: "#f3f7fb"
  navigation-current: "#e5eff8"
  contact-hover: "#dfeaf5"
  record-muted: "#59636c"
  record-rule: "#e3e7eb"
  record-accent: "#224b8d"
typography:
  display:
    fontFamily: "Manrope, Trebuchet MS, sans-serif"
    fontSize: "clamp(20px, 2.8cqi, 28px)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  identity:
    fontFamily: "Manrope, Trebuchet MS, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, Trebuchet MS, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Source Sans 3, Trebuchet MS, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Trebuchet MS, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  record-body:
    fontFamily: "Trebuchet MS, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  focus: "3px"
  figure: "4px"
  control: "5px"
  introduction: "8px"
  portrait: "50%"
spacing:
  link-gap: "6px"
  control-block: "8px"
  mobile-pane-inline: "14px"
  row-gap: "16px"
  pane-inline-compact: "20px"
  context-stack-gap: "24px"
  featured-gap: "26px"
  anchor-clearance: "28px"
  context-gap: "32px"
  home-section: "28px"
  publication-row: "12px"
  featured-row: "18px"
  experience-row: "12px"
  content-bottom: "48px"
components:
  navigation-link:
    textColor: "{colors.profile-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 15px"
  navigation-link-hover:
    backgroundColor: "{colors.navigation-hover}"
    textColor: "{colors.profile-link}"
  navigation-link-current:
    backgroundColor: "{colors.navigation-current}"
    textColor: "{colors.profile-link}"
  profile-rail:
    backgroundColor: "{colors.profile-rail}"
    textColor: "{colors.profile-ink}"
    padding: "32px 24px"
    width: "240px"
  research-introduction:
    backgroundColor: "{colors.profile-wash}"
    textColor: "{colors.profile-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.introduction}"
    padding: "16px 24px"
  publication-resource:
    textColor: "{colors.profile-link}"
  news-disclosure:
    textColor: "{colors.profile-link}"
    padding: "2px 0 8px"
---

# Design System: Wen Yin's academic website

## Overview

**Creative North Star: "A stable researcher identity beside changing academic content."**

The user-selected blue profile direction pairs a pale identity rail with a white reading surface. The atmosphere is restrained and readable: identity remains visible while academic material moves through the right pane. Existing portraits, laboratory and institution marks, and research figures provide the imagery.

The shared shell and homepage use the new type pairing. Record interiors retain their established typography. User-approved refinements compact Publications and Experience; Honors & Talks retains its established layout.

**Key Characteristics:**

- Persistent identity and navigation across four public routes.
- Pale blue tonal surfaces, blue links, and fine dividers.
- Manrope identity, Source Sans 3 homepage reading, and retained Trebuchet record interiors.
- Original academic imagery and inline affiliation and citation assets.

## Colors

A single blue accent family supports cool, pale surfaces and legible dark text. The frontmatter contains the normative color values.

### Primary

- **Profile Blue** (`profile-link`): shared-shell links, homepage venue labels, focus outlines, and the current navigation text.
- **Current Blue Wash** (`navigation-current`): the current route's navigation background.
- **Hover Blue Wash** (`navigation-hover`): hovered and pending navigation backgrounds.
- **Contact Blue Wash** (`contact-hover`): profile-link hover background.
- **Record Blue** (`record-accent`): retained record-page venue labels and existing accent details.

### Neutral

- **Blue Ink** (`profile-ink`): shell and homepage text.
- **Slate Blue** (`profile-muted`): secondary identity text, inactive navigation, and homepage publication metadata.
- **Profile Mist** (`profile-rail`): the persistent left rail.
- **Research Mist** (`profile-wash`): the homepage research introduction.
- **Cool Rule** (`profile-rule`): rail and header boundaries and homepage section rules.
- **Reading White** (`reading-surface`): header, reading pane, and portrait border.
- **Record Slate** (`record-muted`) and **Record Rule** (`record-rule`): existing muted metadata and row dividers inside record pages.

## Typography

**Display Font:** Manrope, with Trebuchet MS and sans-serif fallbacks.\
**Body Font:** Source Sans 3 on Home, with Trebuchet MS and sans-serif fallbacks.\
**Record Font:** Trebuchet MS, with Helvetica and sans-serif fallbacks.

The rounded, compact display face carries identity and wayfinding; the homepage reading face supports longer research text. Both self-hosted families provide regular, medium, and semibold weights (400, 500, 600) with font-display swap.

- **Display:** the introduction headline uses the frontmatter fluid role, balanced wrapping, and a mobile override (22px, line-height 1.35).
- **Identity:** the English name uses the identity role; the Chinese name sits on a separate line (18px). Intermediate and mobile sizes are (22px/16px) and (16px/14px).
- **Title:** homepage section headings use the title role, reducing on mobile (18px).
- **Body:** homepage paragraphs use the body role, reducing on mobile (16px). Introduction paragraphs stop at a readable measure (74ch).
- **Context:** academic background and long-term goal text uses a slightly smaller reading size (16px, line-height 1.65), reducing on mobile (15px).
- **Label:** navigation uses the label role, reducing on mobile (12px). Homepage publication venue, title, author, and summary sizes are (14px, 18px, 15px, 16px).
- **Records:** the three record interiors retain the record-body role and their existing heading scale, including main section headings (1.4rem) and year headings (1.25rem). Dates use tabular numerals.

## Layout

The application fills the viewport and clips document scrolling. Navigation and reading content align to a centered 1360px layout, with a persistent navigation row (64px) and a left identity rail beside a flexible right reading pane. The shell and right scrollport extend to the browser's right edge even on wider screens; matching outer gutters preserve the original content width and rail position. Only that right pane scrolls; its desktop padding is (34px 38px 0), plus the outer right gutter, with bottom content space (48px), stable scrollbar gutter, and anchor clearance (28px).

| Viewport condition | Rail | Reading-pane padding | Navigation |
| --- | --- | --- | --- |
| Above 1023px | 240px | 34px 38px 0 | 64px row |
| Up to 1023px | 200px | 26px 26px 0 | 64px row |
| Up to 759px | 156px | 24px 20px 0 | 64px row |
| Up to 480px | 94px | 18px 14px 0 | 96px, two-column links |

Home reduces the reading pane's top padding to 20px on desktop, 16px at widths up to 1023px, and 12px at widths up to 480px; other routes retain the table's padding.

The homepage context grid uses a wider academic-background column beside the goal column (2.6:1), with the context gap token. Each column has a heading row and flexible paragraph row, keeping heading tops and paragraph bottoms aligned. It stacks at the first shell breakpoint. Featured publications use a figure/text grid (0.85:1.65), with the featured gap token, stacking at the second breakpoint. At the narrowest breakpoint, news dates stack above their text.

At compact height (at most 650px) and width (at least 481px), the profile becomes a small two-column identity group: portrait (52px) beside name and role. The duplicate research summary hides, location follows, and all five profile links keep a minimum height (44px). The ordinary mobile rail also hides the duplicate summary and keeps its five links at that minimum height.

Internship dates move under the text at (924px). Education uses date, flexible institution, degree, then location, all on one line where space permits. Education type is (14px), dates (13px), row padding (10px), and column gaps (12px/16px). At (759px), date and institution stack above a degree/location row, with location last and right aligned. At (599px), institution marks shrink and other dated lists use narrower date columns. These do not replace the shared-shell breakpoints.

Printing releases the fixed viewport, hides the navigation and profile rail, and allows the reading content to flow normally.

## Elevation & Depth

The shell and homepage are flat. Pale fills, white reading space, and single-pixel dividers convey grouping. Publication figures and the citation badge explicitly suppress image shadows, including on hover. The portrait uses a white border; there is no raised card or shadow scale for the redesigned surface.

## Shapes

The main shell is rectangular. Gentle rounding distinguishes the research introduction, navigation/contact targets, and figures through the frontmatter radius roles. The portrait is circular with a white border (4px desktop, 2px mobile and compact height). Focus uses a visible blue outline (2px), offset from links (3px) and inset within the scrolling pane (−3px).

## Components

### Persistent profile rail

The portrait, bilingual name, role, research summary, location, and five contact/research links form one identity region. The links are Email, DBLP, GitHub, Google Scholar, and ORCID. External profiles open in a new tab with the existing safety attributes. Hover adds the contact wash; keyboard focus keeps the shared outline. The rail remains present across route changes.

### Navigation and reading pane

Navigation is text-led with one shared rounded selection background and no bottom indicator stroke. Current state uses `aria-current="page"`; the background follows the requested link immediately using a transform-only FLIP animation (280ms, `cubic-bezier(.16,1,.3,1)`). Pending loading lowers its opacity to0.65. Resizing, font loading and the mobile two-row layout remeasure the marker. Hover feedback remains140ms. Without JavaScript, the original current-link background remains visible. Links retain their42px navigation target height.

Route changes preserve the header and profile DOM, replace only the right article, update title and page metadata, and retain per-route scroll positions and browser history. The incoming article fades in and travels18px according to route direction over300ms with `cubic-bezier(.16,1,.3,1)`. One clipped, inert outgoing copy moves10px the opposite way and fades out over140ms, then is removed. Rapid navigation cancels and removes old transitions before creating the next one; the latest request alone can commit. Reduced-motion preference removes this animation and CSS transitions. Loading state is announced politely and the pane exposes `aria-busy`; keyboard navigation focuses the pane. Ordinary URLs and a full-page fallback remain available. Hover, pointer intent and keyboard focus prefetch route HTML; conservative idle warming fills the remaining route cache. In-flight loads are shared, and Save-Data or slow connections disable speculative loading.

### Research introduction and affiliations

The research introduction is the primary tinted container, using the frontmatter padding and radius. Its paragraph fills the available inner width. The heading has no forced break and uses container-relative type to stay on one desktop line, with natural narrow-screen wrapping. Introduction padding is (16px 24px), reducing to (16px 18px) below 760px and (14px) below 481px. The gap between its heading and paragraph is (10px). Bold phrases use semibold emphasis. The original dynamic Google Scholar badge remains inline after “15+ papers,” displayed at (105px × 20px). The laboratory logo follows the institute name inline, vertically centered; its maximum dimensions are (148px × 32px), reducing on mobile (100px × 24px).

### Section headings and publications

Selected Publications uses an (8px) top margin after the news archive; other homepage sections keep their existing spacing. Section headings align a heading and optional route link on a shared baseline, wrap when necessary, and end in a fine rule. The optional link has a minimum height (40px). Publication metadata places venue then Paper/Code/Project in one wrapping row above the title. Featured task labels align at the row's right edge. Multimodal Emotion Recognition is displayed in full; VER retains its expanded accessible name. Venue labels use (16px); homepage paper titles use (17px) above (16px) summary text, and record-page paper titles use (15px) above (14px) author text. Title line heights are (1.35) on Home and (1.3) in Publications; authors use (1.35), summaries (1.45). Resource links retain a minimum height (44px). Publication row padding is (12px), featured rows (18px), and group spacing (20px). For side-by-side featured rows, a (10px) bottom inset on the text body balances the metadata link hit area so visible text and figure share a vertical center; the inset resets to zero when the figure stacks above the text at759px. Figure hover reduces opacity (0.86) over (140ms, ease); opening a figure uses the existing image gallery enhancement.

### News disclosure and dated records

Recent news uses unboxed date/text rows and tabular dates. Its list starts (8px) below the heading, with row padding (3px 0) and line-height (1.45); stacked mobile rows use padding (4px 0). Earlier news remains a native details/summary disclosure with a minimum summary height (44px), preserving keyboard operation and browser disclosure semantics. Experience uses (24px/12px) heading margins, (12px) internship row padding, (16px) row gaps, and (15px) supporting text. Education follows the compact horizontal layout above. Honors and talks retain their established dated rows.

## Do's and Don'ts

### Do:

- **Do** preserve the persistent header and identity rail while only the right pane scrolls and changes.
- **Do** scope the new reading type to Home; keep record-page typography and the approved compact publication and education layouts.
- **Do** preserve original figures, author portrait, inline laboratory logo, and dynamic Scholar citation badge.
- **Do** keep all five profile links usable in mobile and compact landscape layouts.
- **Do** retain visible keyboard focus, native URLs, browser history, loading announcements, and reduced-motion behavior.

### Don't:

- **Don't** turn the identity rail into a full-width scrolling banner.
- **Don't** add raised card shadows to the flat homepage surfaces and research figures.
- **Don't** replace the dynamic citation badge with a static citation count.
