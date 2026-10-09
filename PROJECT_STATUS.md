# Project status

Reusable premium school website platform (Next.js 16.4, React 19.3, TypeScript, Tailwind CSS 4, GSAP 3). One codebase is configured per school through `data/school.ts`; all content in the repository today is development content for the fictional "Example Academy".

_Last reviewed: 2026-10-09._

## How this was verified

- **Re-run for this review:** `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass. The build lists `/`, `/about`, `/admissions`, `/contact`, `/design-system`, `/robots.txt` and `/sitemap.xml`, all static (`○`).
- **Earlier browser QA:** headless Chrome via the DevTools protocol, against production builds at 375, 768, 1024, 1440 and 1920px. It covered overflow, console errors, image loading, layout shift, keyboard focus, reduced motion, no-JavaScript rendering, link and anchor destinations, and form behaviour. That QA was **not** re-run for this review; re-run it after any change.
- **Never done:** testing on real devices, testing with screen readers, and delivery to a real enquiry provider.

## Git state

- **Committed:** the homepage, shared navigation and footer, and the design system. The last commit is `f7c0385 fix: replace abstract placeholders with development photography`.
- **Uncommitted:** the Admissions, Contact and About pages and the shared enquiry form system.

| Status | Files |
| --- | --- |
| Modified | `.env.example`, `app/globals.css`, `config/site.ts`, `data/development-photography.ts`, `data/school.ts`, `types/school.ts` |
| New: routes | `app/about/page.tsx`, `app/admissions/page.tsx`, `app/contact/page.tsx` |
| New: components | `components/about/*` (5), `components/admissions/*` (5), `components/contact/*` (3), `components/forms/EnquiryForm.tsx` |
| New: form logic | `lib/enquiries/actions.ts`, `lib/enquiries/delivery.ts`, `lib/enquiries/validation.ts` |
| New: photos | `public/images/development/about/*` (4), `public/images/development/admissions/*` (2) |

There are no secrets in the working tree; `.env.example` is the only env file. `.next/` and `next-env.d.ts` are ignored.

## Completed features

### Shared, committed

- **Design system:** tokens in `app/globals.css`, the type scale, the 12-column editorial grid and inverse theme, and an internal showcase at `/design-system`. In production the showcase returns 404 unless `ENABLE_DESIGN_SYSTEM=true`.
- **Navigation:** announcement bar, navbar (scroll-aware; the mobile menu uses a native `<dialog>` with focus containment and scroll lock), skip link.
- **Footer:** rendered once by the root layout on every route. It holds identity, navigation from `config/navigation.ts`, and contact details from `school.contact`/`school.location`.
- **Motion:** `Reveal` (GSAP presets, no-JS failsafe, reduced motion) and `ScrollDepth`.
- **Images:** `ResponsiveImage` (aspect presets, focal points, optional art-directed phone image, lazy by default).
- **SEO:** metadata helper `createPageMetadata` with canonical URLs. The sitemap lists `siteConfig.publishedRoutes` only.

### Homepage `/`, committed

The sections, in order:
1. Hero
2. Impact
3. School Story
4. Learning (interactive tabs on desktop)
5. Campus (interactive explorer)
6. Achievements (interactive ledger)
7. Student Life (editorial collage)
8. Admissions call to action

All image slots use real development photography.

### Admissions `/admissions`, uncommitted

- **Sections:** hero, a five-step process (`#process`), "what parents need to know", FAQ (native `<details>`), enquiry form (`#enquire`).
- **Form fields:** name, email, consent, and optional phone, year group and message.

### Contact `/contact`, uncommitted

- **Sections:** a typographic hero, the contact directory from school data, and a general message form (`#message`).
- **Form fields:** name, email, subject, message, consent, and optional phone.
- **Directory:** office hours, the directions link (only from `location.mapUrl`), the admissions email and social links each appear only when configured.

### About `/about`, uncommitted

- **Sections:** a wide-photo hero, Our story (`#story`, linked from the homepage), Philosophy, Values (four, data-driven), and a closing next step to `/admissions` and `/contact`.
- **Labels:** every narrative section shows a visible "illustrative" note.

## Architecture and design decisions

- **Content only in data:** components hold no school-specific copy or image paths. Each page model is optional in `School` (`types/school.ts`), and a page without data calls `notFound()`.
- **Photography credits:** every development photo is listed in `data/development-photography.ts` with alt text, dimensions, blur placeholder and Unsplash credit. Assets are local WebP files in `public/images/development/`. To replace a photo, edit data only.
- **Fully static pages:** every route renders as `○`. The footer's copyright year comes from `env.BUILD_YEAR` in `next.config.ts`, set at build time, because reading the clock during prerender is an error under Cache Components. The year updates on the next build.
- **Enquiry forms, in `lib/enquiries/`:**
  - **Shared validation:** the browser and server use the same rules, derived by `enquiryRules()` from each form's data.
  - **Server actions:** there are two entry points, `submitAdmissionsEnquiry` and `submitContactEnquiry`. Each fixes the enquiry kind on the server, so a visitor can't change it.
  - **Shared handler:** both run one validation step, with a honeypot field and a 3-second minimum fill time against bots.
  - **Delivery:** one `server-only` webhook adapter POSTs JSON with `type` set to `admissions-enquiry` or `contact-enquiry`. Settings are `ENQUIRY_WEBHOOK_URL` and the optional `ENQUIRY_WEBHOOK_SECRET` (sent as a Bearer token).
  - **No false success:** success is shown only when the provider returns a 2xx status. Without a provider, the form says nothing was sent and shows the school's email and phone.
  - **No-JS:** forms work without JavaScript through the server action. Logs contain no personal data.
- **One form component:** `components/forms/EnquiryForm.tsx` serves both pages. Its fields come from content; the wording of notices ("enquiry"/"message") is chosen by the form's kind.
- **Error colour token:** `--color-error` (with an inverse-theme value) was added to the design system for validation messages, which always carry text as well.
- **Reveal caveat:** `Reveal` must never animate an element that has its own CSS opacity transition, such as `ButtonLink` or `TextLink`, or it can end at opacity 0. Wrap links in a `<div>` inside staggered reveals; every existing usage does this.
- **Anchor offset:** in-page anchors clear the sticky navbar through the global `[id] { scroll-margin-top }` rule.

## Known issues

- **Stale comment:** in `data/school.ts`, above `admissionsCta`, a comment says `/admissions` and `/contact` are planned and "neither page exists yet". Both now exist, so the comment needs updating; it doesn't affect behaviour.
- **Links that return 404:** `/academics`, `/campus`, `/gallery` and `/events` are not built, but the navbar and footer link to them.
- **Favicon on one internal page:** the disabled `/design-system` route's 404 omits the icon link, so browsers request `/favicon.ico`, which also 404s. This affects that internal route only.
- **No rate limiting:** add it at the hosting or provider layer.
- **Small tap targets:** text links are 24–27px tall. That meets WCAG 2.2 AA's 24px minimum but is smaller than buttons.
- **QA-only console message:** a "preloaded image not used" warning appears only during the automated rapid-scroll test. It did not appear on normal cold loads.

## Unfinished work and placeholders

- **Enquiry delivery isn't configured.** Both forms report that nothing was sent until `ENQUIRY_WEBHOOK_URL` is set. Delivery has only been tested against a local mock webhook.
- **All content is development data, to replace before launch:**
  - School name, address, phone and email; `socialLinks` is empty, and there are no `officeHours`, `admissionsEmail`, `mapUrl` or legal links.
  - Impact statistics, which are labelled illustrative.
  - Admissions process, FAQ and year groups; Contact subjects; About story, philosophy and values; the "Est. 1965" year.
- **Development photography to swap before any public demo:**
  - **Real institutions recognisable:** the Achievements graduation photo, the homepage hero library, the School Story building inscription, the Admissions campus archway (a university), and the Student Life uniform crest.
  - **Adults rather than pupils:** several Learning, Student Life and Admissions photos.
  - **Repeated subject:** two athletics-track photos on the homepage.
- **Planned pages not built:** Academics, Campus, Gallery, Events, and legal pages.
- **Not tested:** real devices and screen readers.

## Next steps

1. **Commit the uncommitted work** after review, in logical commits. Shared files need partial staging; nothing should be pushed without approval.
   - `feat: add admissions page and enquiry form`
   - `feat: add contact page with shared enquiry form`
   - `feat: add about page`
2. **Fix the stale `admissionsCta` comment** in `data/school.ts`.
3. **Connect enquiries:** choose the provider, set `ENQUIRY_WEBHOOK_URL`/`ENQUIRY_WEBHOOK_SECRET` on the host, route by `type`, then test real delivery and add rate limiting.
4. **Replace development content and photography** in `data/school.ts` and `data/development-photography.ts` with the school's verified details.
5. **Build the remaining pages:** Academics, Campus, Gallery, Events and legal pages. Add each to `siteConfig.publishedRoutes` as it ships.
6. **Test on real devices and with screen readers** before launch.
