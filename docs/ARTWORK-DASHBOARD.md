# Artwork dashboard guide

## Where to manage content
Sign in at /login, then open /admin/manageartworks. Upload Artwork at /admin/upload opens the same full editor for a new work.

The editor supports:
- Title, year, medium/materials, dimensions, series, category and theme.
- Conceptual description.
- Main image, alt text, and up to 24 additional images with captions and types (detail, process, light study, installation, full work). Upload JPEG, PNG or WebP files under 5 MB directly, or use existing Cloudinary/local image URLs.
- Reordering additional images.
- Up to 8 YouTube/Vimeo process video links. Video files should first be uploaded to the artist's video account.
- Exhibition history, process notes and EVA research observations.
- Explicit related artwork selections.
- Selected portfolio, homepage feature and EVA research placement.
- Display order (lower numbers appear first), acquisition availability, optional private reference price.
- Draft/published and reversible archive controls.

Save artwork after uploading images or changing fields. Unsaved image uploads may remain in Cloudinary; removal from a work does not delete the stored original.

## Visibility
A published, unarchived work appears in the public portfolio or archive. Selected portfolio marks the curated selection. Homepage displays the first eight published featured works in display order; its hero uses the first feature, otherwise the first selected work, otherwise the first public work. EVA marking includes the work on the research page, linking to its full documentation.
Drafts and archived works are hidden from public lists and detail pages. Archive does not permanently delete a record.
A description is required before publishing a newly edited work. Existing filename-based entries are retained until reviewed. Dates and materials are never invented.
Acquisition available changes the work's contact link to an acquisition enquiry. Optional internal prices are excluded from public artwork responses.

## Existing portfolio
The original seven curated works appear automatically in the dashboard. The first save stores an override in MongoDB; it is not necessary to edit lib/portfolio.js. Source slugs remain stable after renaming or archiving. Legacy database records matching an original title are adopted rather than duplicated. No production migration or content write was performed during implementation.

## Editor setup
Set CONTENT_EDITOR_EMAILS in .env.local for local use, and in the hosting environment for production:
CONTENT_EDITOR_EMAILS=artist@example.com,editor@example.com

Use existing registered login emails. Restart the local server / redeploy after changing environment variables. Artwork management and media uploads now require a signed login token whose email is on that allowlist, matching the Studio Notes access model. No email address is automatically granted access.
MongoDB stores the content; Cloudinary stores image uploads using the existing environment configuration.
Published edits are read dynamically; they do not require a rebuild. Reload an already-open public page to see saved changes.

## Scope
This dashboard manages artwork content and its placement. Studio Notes remains at /admin/journal. Artist biography, general page text, site-wide exhibition CV and CV PDF are separate from artwork records and are not made editable by this change.

## Validation
Run node --test tests/artworks.test.mjs for schema, URL validation, seed merging, publication/privacy and editor-authorisation checks.
Production build can be isolated from a running developer server by setting NEXT_BUILD_DIR=.next-artwork-check before npm run build; use that same variable with npm run start to preview that build.
Live database saves and Cloudinary uploads still need a check with an authorised editor account. Browser visual verification was unavailable in this session.

## Verified results
- Eight automated artwork tests passed.
- Isolated production build passed; only existing analytics/journal warnings remain.
- /admin/manageartworks, /admin/upload, /selected-works and /research returned HTTP 200.
- Nine unauthorised API checks returned 403, covering artwork list/create/update, both legacy update/upload paths, media upload, latest/top-viewed and request reads.
- Database and Cloudinary environment variables are present. CONTENT_EDITOR_EMAILS is not configured; no account was automatically authorised.
- No live database write or Cloudinary upload test was performed.

## EVA images and aligned image frames
The five artist-supplied EVA images are included as editable portfolio seed records (eva-study-01 through eva-study-05), with local assets under public/eva/. Public EVA Foam Research lists them through the existing artwork API. Temporary archive labels EVA foam study 01–05 are used rather than invented titles; descriptions identify visible subject matter and state that titles, dates and dimensions await confirmation.

Admin → EVA media (/admin/eva) lists EVA entries, opens the full artwork editor, and defaults new entries to EVA research / Mixed Media. Edit details and publish new entries there. Delete moves an entry to Deleted, hides it from public pages and preserves a tombstone so an original seeded entry cannot reappear. Show → Deleted allows restoring it as an unpublished draft; media originals are retained. Delete/restore use the existing authorised admin API.

Portfolio and admin grids now have equal square image frames. Images are centered and contained at their largest uncropped size, so title/details start at the same height within each row. Documentation thumbnails use the same treatment. Large hero/detail views retain their full image proportions.
The public header name and professional-title text is hidden with scoped CSS; the logo remains visible and the name remains available in the Home link's accessible label.

The unrelated commerce SaaS document was not treated as instructions for this artist website.

Verification: production build and all 27 automated tests passed. All five supplied EVA assets, the public research route and authorised EVA admin page returned 200. Unauthenticated entry removal returned 401; unsupported restore actions returned 400. No live artwork records were changed by verification. The supplied entries are merged into the existing read-time editable portfolio system; edits/deletion tombstones persist to MongoDB on the first admin action. Restart the local app to load the extended Artwork model. Live save/delete and visual browser checks remain pending.

## CV, homepage portrait and navigation icons
The supplied four-page artist CV is available unchanged at /documents/chioma-favour-okoli-cv.pdf, with View PDF and Download controls on /cv. Its copied bytes match the supplied file exactly. Selected education, exhibitions, curatorial experience and research on the CV page now follow that document; the MFA entry retains the document's "in view" qualification.
The original PDF's four pages were rendered and inspected. The source PDF was not edited.

The homepage's main image now uses /chioma_okoli.jpg, the same image used on About, with an artist caption and a link to /about. Featured artworks remain in the selected-works section below.
Home is first in the public navigation. The header's text wordmark remains hidden, as previously requested.
Page-link arrow characters are replaced by Lucide SVG icons across shared links, artwork cards, homepage/exhibition links, admin links, login/recovery links and enquiry submission. Printing uses a printer icon and CV download/open actions have their corresponding icons. Non-navigation text describing the relationship between painting and sculpture is retained.
Temporary PDF inspection dependencies live only under ignored tmp/pdf-review; website package dependencies were not changed.

Verification: production build passed. HTTP checks confirmed the homepage uses the About portrait in its main image, Home is present in navigation, and page-link arrows render as SVG icons. The CV page offers View/Download controls; the served PDF is byte-identical to the supplied file and is served as application/pdf. The homepage check used an isolated unavailable-database preview configuration, with no persistent environment changes or live data writes. Browser visual review remains pending.

## Homepage opening viewport
The small “An evolving artistic practice” and “Identity. Material. Memory.” labels are removed. The opening section is now a two-column desktop composition with the introduction on the left and the full portrait on the right. Its portrait height is tied to the viewport with space reserved for the header and caption.
At 800px and below, the portrait comes first, immediately below the header, followed by a smaller headline and compact introduction. The portrait remains centered and uncropped. Featured artwork fetching is isolated in a Suspense boundary so a slow artwork database does not block the opening portrait and copy.
Browser preview access was attempted but the browser host is unavailable; visual viewport verification remains pending.

Opening-layout verification: production build passed. A streaming HTTP check returned 200, confirmed the portrait appears before the copy in document order, and confirmed both small introductory labels are absent. In an isolated preview with a deliberately slow unavailable database, portrait markup arrived before the artwork response completed (about 1.1s versus 4.0s in that check). No persistent configuration or live data was changed. Responsive visual checks could not run because the browser host is unavailable.
