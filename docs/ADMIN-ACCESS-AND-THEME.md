# Admin route protection and studio theme

## Access
All /admin and /admin/* page requests now require a valid signed session cookie and an email on CONTENT_EDITOR_EMAILS. Unauthenticated, invalid and expired sessions redirect to /login with a safe return destination. Unauthorised accounts cannot enter the admin workspace.

Sign in again after this update: older localStorage-only logins cannot unlock protected server-rendered pages. Successful sign-in sets chioma_session, an HttpOnly, SameSite=Lax cookie (Secure in production) lasting one day. The token is no longer returned by login or kept in localStorage by admin clients. The prior bearer mechanism is retained for compatible API clients, with the same editor allowlist.

Middleware protects every /api/admin/* endpoint and the private analytics, visitor-list, acquisition-list/update and draft-journal endpoints. Public artwork reading, contact submissions and public journal entries remain accessible. Requests without credentials receive 401; valid sessions without editor permission receive 403.
The admin layout also validates the cookie before rendering. Client API handling redirects to login when a session becomes invalid. The workspace checks session validity every minute and when focus returns.

Sign out uses POST /api/auth/logout, clears the HttpOnly cookie and takes the user to login. Mutation requests protected by middleware reject a mismatched Origin header. Login return destinations are constrained to /admin paths to avoid external redirects.

## Interface
Desktop navigation is a fixed left sidebar, grouped into Studio, Conversations and Insights. The active route is marked; portfolio preview, signed-in editor email and sign-out are available in the sidebar. On smaller screens, navigation becomes an expandable menu with an Escape-to-close control.

The admin area has warm neutral backgrounds, olive accents, consistent forms, cards and tables, and a dedicated overview showing artworks, published works, contact messages and subscribers. Quick actions lead to portfolio editing, journal creation and research management. Public portfolio navigation/footer do not appear inside admin pages.

## Deployment
Existing local editor configuration contains the two user-selected emails. Retain that configuration and JWT_SECRET in production; restart/redeploy to activate the session and layout changes. No production deployment or password change was performed.

## Checks
node --test tests/admin-session.test.mjs tests/artworks.test.mjs tests/password-recovery.test.mjs
19 tests cover session signatures and expiry, editor allowlist, safe redirects, private API routing, artwork publication and OTP recovery. Browser visual verification remains unavailable in this environment.

Verified against the local production build:
- All 9 admin page routes redirect unauthenticated requests to /login with their return destination.
- All 9 tested private API reads return 401 without credentials.
- Forged, expired and non-editor sessions redirect to login.
- A short-lived synthetic authorised test session rendered the sidebar and workspace, without the public footer.
- Session check, mutation Origin rejection, logout cookie expiry and public login/recovery pages passed.
- Production build and all 19 automated tests passed. Existing analytics Hook and journal-image warnings remain.
- No database writes, password changes or emails were made by the access checks. Synthetic session tokens stayed in memory.

## Brand and navigation refinement
The original transparent Chioma Okoli logo is restored in the public header/footer, login identity, admin sidebar and admin mobile bar, using a shared SiteLogo component. Browser metadata and app/icon.png use the same existing brand asset.
Public mobile navigation uses menu/close icons, labelled for assistive technology, with a 44px control and Escape-to-close support. Footer social links use labelled Instagram/LinkedIn icons.
Public navigation is now 15px on desktop and 17px in the expanded menu. The menu collapses at 1280px to preserve readable labels and avoid squeezing the full navigation beside the logo. Admin navigation is increased to 14px.
These are presentation changes; no authentication, artwork data or publishing settings were changed.

Brand verification: production build passed. The practice page serves the original logo, labelled menu icon, Instagram/LinkedIn icons and app browser-icon metadata. Login serves the restored logo. Both /chioma-okoli-logo.png and /icon.png returned HTTP 200. The previous default favicon is preserved at docs/previous-favicon.ico and no longer overrides the brand icon. Visual browser verification remains pending.

## Artwork fit and reversible logo colours
Artwork containers now follow each image's natural proportions: public portfolio cards, hero images, full-work pages, process/documentation images, admin cards and editor previews use full-width, automatic-height presentation with no crop or stretch. Portfolio image padding and hover enlargement are removed. Portrait photography retains its separate editorial layout.

Admin → Appearance (/admin/appearance) lets authorised editors select Olive & sage or Original, then Save logo theme. The setting is stored in MongoDB and applies to site logos and browser icons. Visitors read only the public theme choice from /api/branding; saving is restricted to the admin API. If settings cannot be read, the site retains the default olive theme.

The original /chioma-okoli-logo.png and the original uploaded PNG remain unchanged. The former app icon is retained as /branding/icon-original.png. The new files are /branding/chioma-okoli-olive.png and /branding/chioma-okoli-olive.svg. The PNG is rendered from a deterministic SVG colour treatment of the embedded original, preserving every alpha pixel and the exact 376 × 220 dimensions; no generative redraw was used. Rebuild variants with node scripts/build-logo-variant.cjs. Only colour is changed.

Logo checks confirmed the retained original is byte-identical to its original source, the new variant preserves the full alpha mask, and appearance settings accept only the two supported choices.

Verification after artwork-fit and appearance changes: production build passed; all 25 targeted checks passed after correcting the variant renderer to use the source's true dimensions. Original and themed logo PNGs and browser icon returned HTTP 200. Appearance page authentication and invalid-theme rejection passed; no stored appearance setting was written by the smoke test. Browser interaction, live theme-saving and visual responsive layout checks remain unverified.
