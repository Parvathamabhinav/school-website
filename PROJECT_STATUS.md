# Project status

Reusable premium school website platform (Next.js 16.4, React 19.3, TypeScript, Tailwind CSS 4, GSAP 3). One codebase serves any school: school content lives in `data/school.ts` (typed by `types/school.ts`), and deployment settings in `config/` and environment variables. Everything in the repository today is development content for the fictional "Example Academy".

_Last reviewed: 2026-10-09 (platform reusability audit)._

## Validation status

- **Re-run for this review:** `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. Every route is static (`○`).
- **Browser checks (headless Chrome, production build):**
  - **Each new page** (Academics, Campus, Gallery, Events) was checked when it was built at 375, 768, 1024, 1440 and 1920px. Checks covered overflow, images, console errors, links, keyboard use, reduced motion and no-JavaScript rendering, plus Gallery filters and viewer, and Events date grouping under simulated dates.
  - **For this review:** every route was rechecked at 375 and 1440px. All internal links return 200.
- **Never done:** real devices, screen readers, delivery to a real enquiry provider.
- **Known console noise:** a "preloaded image not used" warning appears occasionally, and only during the automated rapid-scroll test.

## Routes

| Route | Content source | Status |
| --- | --- | --- |
| `/` | `hero`, `impact`, `story`, `learning`, `campus`, `achievements`, `studentLife`, `admissionsCta` | Committed |
| `/about` | `about` | Committed |
| `/academics` | `academics` | Committed |
| `/campus` | `campusPage` | Committed |
| `/admissions` | `admissions` (with enquiry form) | Committed |
| `/contact` | `contactPage` + `contact`, `location`, `socialLinks` (with message form) | Committed |
| `/gallery` | `galleryPage` + `gallery` | Committed |
| `/events` | `eventsPage` + `events` + `location.timeZone` | Committed |
| `/design-system` | Internal showcase | 404 in production unless `ENABLE_DESIGN_SYSTEM=true`; `noindex` |
| `/sitemap.xml`, `/robots.txt` | `siteConfig.publishedRoutes`, `siteConfig.url` | Lists the eight public routes |

- **Shared chrome:** the navbar, mobile menu, footer and announcement bar render on every route from the root layout.
- **Navigation:** every navigation link now resolves. There are no legal pages (privacy, accessibility); `footer.legalLinks` is empty.
- **Missing data:** each internal page calls `notFound()` if its content model is missing, so a school can switch a page off by omitting its data.

## Where school-specific configuration lives

| Area | Where | Classification |
| --- | --- | --- |
| Name, short name, tagline, founding year | `data/school.ts` | Central. `shortName` and `tagline` are not rendered anywhere |
| Logo | `brand.logo` (optional; otherwise a text wordmark) | Central; no logo supplied |
| Favicon | `brand.favicon` → `public/icons/favicon.svg` | Central path, but the SVG has the default colours hardcoded |
| Colours | `brand.colors` → CSS variables (`config/theme.ts`) → semantic tokens in `app/globals.css` | Central. The error red is fixed in CSS |
| Typography | `app/fonts.ts` (Newsreader, Inter) | Hardcoded in code; changing fonts means a code edit |
| Contact and location | `contact`, `location` | Central; placeholders. `socialLinks`, `officeHours`, `admissionsEmail` and `mapUrl` are empty |
| Time zone | `location.timeZone` (`"UTC"`) | Central; placeholder |
| Navigation and navbar action | `config/navigation.ts` | Central, but in config rather than school data |
| Page content | One optional block per page in `data/school.ts` | Central; all development content |
| Gallery and events | `gallery`, `events` arrays + categories in the page blocks | Central; illustrative |
| Footer | `footer` + navigation + contact | Central; `legalLinks` empty |
| Metadata | `seo`, each page's `seo`; canonical origin from `NEXT_PUBLIC_SITE_URL` | Central; depends on deployment setup |
| Published routes | `siteConfig.publishedRoutes` (`config/site.ts`) | Central, but must be kept in step with the pages by hand |
| Photography | `data/development-photography.ts`, referenced only from `data/school.ts` | Central; development stock |
| Enquiry delivery | `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | External setup, not yet configured |
| Interface wording | Inside components ("Close", "Theme", "Featured", form messages) | Hardcoded English. Generic, not school-specific, but not translatable |

- **Unused fields:** `programs`, `facilities`, `testimonials` and `videos` are required in the `School` type but are not rendered anywhere, so a new school must still supply them (empty arrays work). `principal` is optional and also unused.

## Architecture

- **Content only in data:** components hold no school facts or image paths. Optional blocks render only when supplied; each page model is optional in `School`.
- **Design system:** tokens in `app/globals.css`, exposed as semantic utilities (`type-*`, `grid-editorial`, `py-section-*`, `theme-inverse`). The primitives are `Section`, `Container`, `ResponsiveImage` (aspect and `sizes` presets in `lib/media/presets.ts`), `ButtonLink`/`TextLink`, `Reveal` and `ScrollDepth`.
- **Motion:**
  - GSAP presets respect reduced motion.
  - Content stays visible if JavaScript is slow or absent (CSS failsafe plus a `noscript` override).
  - Never animate an element with its own CSS opacity transition (`ButtonLink`, `TextLink`); wrap it in a `<div>`.
- **Fully static pages:** the copyright year comes from `env.BUILD_YEAR` in `next.config.ts`, because reading the clock during prerender is an error under Cache Components.
- **Events dates:**
  - `lib/dates/events.ts` formats dates at build time without reading the clock.
  - The browser decides "upcoming" versus "past" from today in `location.timeZone`. Before that, and without JavaScript, the page shows a neutral "school calendar".
  - Malformed dates fail the build.
- **Interactive pieces:**
  - **Gallery:** theme filters, plus a native `<dialog>` viewer with focus return and scroll lock. Each photo also links to its image file, so it works without JavaScript.
  - **Events:** category filters.
  - Both hide their filters until they work and when the content is too small to need them.
- **Phone links:** every `tel:` link goes through `lib/utils/tel.ts`, so schools can write numbers in their own format.

## Photography

- **Registry:** 60 entries in `data/development-photography.ts`. Each has alt text, dimensions, a blur placeholder and an Unsplash credit (Unsplash License).
  - Files are local WebP in `public/images/development/`.
  - Every entry is used, every file exists, and nothing is unregistered.
  - The laboratory photo appears twice (homepage and Campus), deliberately.
- **Replacing photos:** edit data only. Captions and notes on Campus, Gallery and Events say the photos are illustrative.
- **Swap before any public demo:**
  - **Real institutions recognisable:** `graduation` (Achievements), `libraryStudy` (homepage hero), `campusWalk` (School Story building inscription), `campusArrival` (Admissions; a university archway), `friendsCourtyard` (Student Life; uniform crest).
  - **Adults rather than pupils:** several homepage Learning and Student Life photos, and `welcomingClass` (Admissions).
  - **Same subject twice:** two athletics-track photos on the homepage (`schoolAthletics`, `sportsField`).
  - **Minor:** `schoolGarden` shows a child younger than school age; `footballPitch` has a small plaque; `makingTogether` shows a 3D-printer brand.
- **For a real school:** use the school's own photographs, with consent for identifiable pupils. Stock photos are licensed, but the people in them have not agreed to represent a particular school.

## Enquiry forms

- **Forms:** two, `/admissions#enquire` and `/contact`, built from one component (`components/forms/EnquiryForm.tsx`). Fields and labels come from each page's `enquiry.form` data.
- **Kind:** each form has its own server action (`submitAdmissionsEnquiry`, `submitContactEnquiry`), so the server fixes the kind and the browser can't change it. The webhook payload's `type` is `admissions-enquiry` or `contact-enquiry`.
- **Validation:** the same rules run in the browser and on the server (`lib/enquiries/validation.ts`), derived from the form's data. The server checks everything again, including lengths, allowed options and consent.
- **Spam protection:** a hidden honeypot field and a 3-second minimum fill time. Server actions are same-origin only. **There is no rate limiting**; add it at the host or the provider.
- **Delivery:** `lib/enquiries/delivery.ts` (server only) POSTs JSON to `ENQUIRY_WEBHOOK_URL` with `Authorization: Bearer ENQUIRY_WEBHOOK_SECRET`, a 10-second timeout, no redirects, and a `submissionId` that stays the same on a retry. In production it sends nothing unless the URL is `https://` and the secret is set. The intended receiver is an n8n workflow (email plus Google Sheets row), **not yet built**. The full contract and setup steps are in [docs/enquiry-webhook.md](docs/enquiry-webhook.md). Logs contain no personal data.
- **No false success:** a confirmation appears only when the provider answers 2xx with `{ "received": true, "submissionId": <same id> }`. Without a webhook the form says nothing was sent; on rejection or timeout it says delivery could not be confirmed. Either way it shows the school's email and phone. Forms work without JavaScript.
- **Before production:**
  - Configure the provider and route by `type`.
  - Send real test enquiries from both forms.
  - Confirm failure messages by pointing at a failing endpoint.
  - Add rate limiting, and check the privacy note against the school's policy.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Canonical links, Open Graph URLs, sitemap, robots. **Falls back to `http://localhost:3000`** if unset |
| `ENQUIRY_WEBHOOK_URL` | Yes, for working forms | Server only. Without it the forms report that nothing was sent |
| `ENQUIRY_WEBHOOK_SECRET` | Yes, in production | Server only. Bearer token checked by the webhook (n8n Header Auth) |
| `ENABLE_DESIGN_SYSTEM` | Optional | `true` exposes `/design-system` in production (e.g. a preview deployment) |

`.env.example` documents every variable. Builds go through `scripts/next-production.mjs`, which sets `NODE_ENV=production`.

## Known issues

- **Placeholder claims that read as facts:**
  - The announcement bar says "Admissions for the 2027–28 academic year are now open".
  - `seo.description` calls the school "an independent school".
  - The hero shows "Est. 1965" and the impact figures (labelled illustrative).
- **Disabled `/design-system` 404:** it renders without a title or icon link, so browsers request `/favicon.ico` (404). Internal route only.
- **Sitemap upkeep:** `publishedRoutes` must be updated by hand when a page is added or switched off.
- **Small tap targets:** text links are 24–27px tall. That meets WCAG 2.2 AA but is smaller than buttons.
- **Lists that can't be shared as links:** Gallery and Events filters don't change the page address.
- **Brief neutral list:** on Events, the "school calendar" view shows briefly before the page splits events into groups.

## Outstanding work

1. **Replace development content** with the school's verified details, photographs, events and time zone. Remove or confirm the announcement and the "independent school" wording.
2. **Connect enquiries:** build the n8n workflow from [docs/enquiry-webhook.md](docs/enquiry-webhook.md), set the environment variables, run the listed delivery tests, and add rate limiting.
3. **Set `NEXT_PUBLIC_SITE_URL`** on every deployment.
4. **Add legal pages** (privacy, accessibility) and `footer.legalLinks`.
5. **Test on real devices and with screen readers.**
6. **Optional platform hardening:**
   - Make the unused `School` fields optional.
   - Move fonts and navigation into school configuration.
   - Derive `publishedRoutes` from the configured pages.
   - Fail the production build when `NEXT_PUBLIC_SITE_URL` is missing.

## Git state

All work is committed on `main` (nothing pushed). The latest commits are:

- `e41b446 fix: centralise phone links and add homepage canonical`
- `e342a83 feat: add gallery page`
- `7bad42f feat: add events page`
- `docs: update project status`, which updates this file
