# Website content

The navigation opens four independent pages in the same browser tab:

| Page | Address | Content |
| --- | --- | --- |
| Home | `/` | Introduction, selected publications, recent news |
| Publications | `/publications/` | First-author, corresponding-author, and other publications, newest first in each group |
| Experience | `/experience/` | Research internships and education |
| Honors & Talks | `/honors-talks/` | Honors, awards, and invited talks |

## Editing content

- **Introduction:** `_pages/includes/intro.md`.
- **Publications:** `_data/publications.yml`. This is the shared source for Home and Publications. Set `authorship` to `first-author`, `corresponding-author`, or `other` to choose its section in the complete list. Each paper belongs to one section; a first and corresponding author paper goes in `first-author` while retaining its `†` author marker. Entries are newest first within each section, with undated papers at the end. Set `selected: true` and `selected_order` to feature a paper on Home. Supply a real `image`, its dimensions, `image_alt`, and a one-sentence `summary`. The complete list shows titles, authors, venues, and available links without images. Use `**Wen Yin**` to highlight the author and `†` for the corresponding author. Leave `year` empty when it is unknown.
- **News:** `_data/news.yml`, newest first, with dates as `YYYY-MM`. Home shows five entries; older entries remain under “Earlier news”. The old `_pages/includes/news.md` remains as legacy input to the separate GitHub profile updater and is not used by the website.
- **Internships:** `_pages/includes/internships.md`. Tongji University is the current research internship, supervised by Zheng Lian. Its start date has not been supplied, so the page shows “Current” for Tongji. The Vivo internship ran from April to October 2026.
- **Education:** `_pages/includes/others.md`, newest first.
- **Tongji logo:** `images/internship/tongji.png`, the original transparent PNG from the university's [School Identity page](https://www.tongji.edu.cn/xxgk1/xxbs1.htm), supplied at [images/badge.png](https://www.tongji.edu.cn/images/badge.png). Display it proportionally without cropping or recoloring.
- **Honors and awards:** `_pages/includes/honers.md`.
- **Invited talks:** `_pages/honors-talks.md`. Add confirmed talks with a date, title, and host. The vivo invitation in June 2026 is recorded in Chinese.
- **Navigation:** `_data/navigation.yml`.

Page structure lives in `_pages/` and shared publication markup in `_includes/publication.html`. Existing record-page interior styles remain in `_sass/_profile-pages.scss`; the blue homepage and persistent shell are scoped in `_sass/_profile-shell.scss`.

## Shared shell

`_layouts/default.html` mounts the navigation, `_includes/profile-card.html`, and the independently scrolling `#page-content` reading pane. `assets/js/site.js` progressively enhances the four real page URLs: it replaces only the right article, updates navigation and page metadata, and restores reading position on browser history traversal. Loading failures fall back to ordinary page navigation. The original initializer skips this shell so it cannot re-enable whole-document scrolling or a second sticky sidebar.

The homepage introduction keeps the lab logo inline immediately after the institute name and the original dynamic Scholar badge inline after `15+ papers`. Preserve these relationships when editing `_pages/includes/intro.md`. Scholar citation values continue to come from the original external badge endpoint.

The introduction uses the available inner width and a heading without a forced break. Its background/goal grid is 2.6:1, with aligned heading tops and paragraph bottoms. Publication venue and resources share a wrapping metadata row; the homepage shows the full topic (Multimodal Emotion Recognition) at the far right, or the configured `topic_abbreviation` (VER) with its expanded name accessible. Education splits institution, degree and final location into separate elements for a compact desktop row and readable mobile reflow. These publication and education changes were explicitly requested in the user's browser review.

The left profile stays on the left on mobile. Short landscape screens use a compact identity group and hide the duplicate profile research summary to keep all five contact links visible. The homepage still includes the complete research description. Manrope and Source Sans 3 are self-hosted in `assets/fonts/` with OFL licenses; the other three pages retain their original interior typography.

`PRODUCT.md`, `DESIGN.md`, `.impeccable/`, and `docs/` are development references excluded from Jekyll output. See `docs/blue-profile-validation.md` for the validation record.

Original publication URLs and venue labels are preserved during the migration; check their accuracy when updating publication records.

Publication titles are plain text. The `url` field supplies the Paper link below each entry; additional Code and Project links come from `links`. A Paper entry in `links` is not displayed a second time.

## Local preview

Use a Ruby version compatible with `Gemfile.lock`, then run:

```sh
bundle exec jekyll serve
```

The Home, Publications, Experience, and Honors & Talks pages all support direct navigation and refresh. Older Home section bookmarks are forwarded to their corresponding pages by `assets/js/site.js`.
