# El Shaddai Worship Center — Website

A premium React site built with Vite, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # local development
npm run build    # production build -> dist/
```

## Add your real media

**Easier option:** once the Content Admin is set up (see "Content Admin (Decap CMS)" below), almost every image and text field listed here can be edited through `/admin` instead — upload a photo, save, done, no file system or code involved. The list below is for anyone editing files directly instead.

The app references the following files in `/public` — drop your real assets in with these exact names and everything will pick them up automatically:

- `public/logo.png` — transparent church logo (used in navbar and footer)
- `public/hero-video.mp4` — homepage full-screen hero video
- `public/about-sanctuary.jpg`
- `public/headers/about.jpg`, `services.jpg`, `ministries.jpg`, `sermons.jpg`, `contact.jpg`, `give.jpg` — 42vh subpage header backgrounds
- `public/leaders/founder.jpg`, `head-pastor.jpg`
- `public/leaders/founder-early.jpg` — small archival/early-ministry photo shown alongside the founder's main portrait on the About page
- `public/leaders/head-pastor-family.jpg` — small family photo shown alongside the head pastor's main portrait on the About page
- `public/ministries/youth.jpg`, `sunday-school.jpg`, `women.jpg`
- `public/sermons/sermon-1.jpg` … `sermon-4.jpg`
- `public/services/sunday-first.jpg`, `sunday-second.jpg`, `fasting-prayer.jpg`, `saturday-worship.jpg` — photo-backed service cards on `/services`
- `public/glimpses/glimpse-1.jpg`, `glimpse-2.jpg`, `glimpse-3.jpg` — the "Glimpses of Worship" photo strip on the homepage (small / large / small)
- `public/og-image.jpg` — 1200×630px image shown when the site is shared on WhatsApp, Facebook, iMessage, etc. Use the logo on a solid background, or a wide sanctuary/hero photo — avoid small text, it gets cropped on some platforms.

Until real files are added, image areas will appear blank/placeholder-grey — everything else (layout, animation, copy, routing) is fully functional.

## Things to personalize

- Real names for the Founder Apostle and Head Pastor in `src/pages/About.jsx`
- Sermon titles, scripture references, and YouTube links in `src/pages/Sermons.jsx`
- Bank account number and IFSC in `src/pages/Give.jsx`
- Social links (`#`) in `src/components/Footer.jsx` and `src/pages/About.jsx`
- "Watch Live" YouTube link in `src/pages/Home.jsx`
- Google Map embed URL in `src/pages/Contact.jsx` (currently a text-query embed — swap in your verified Place ID for precision)

## Notes

- The "Next Service" badge on `/services` is computed live from the visitor's local time/day against the weekly schedule.
- The navbar starts fully transparent and transitions to a dark glass background after ~40px of scroll.
- Page transitions use Framer Motion fade/slide; respects `prefers-reduced-motion`.

## New: Live service embed

The homepage checks the schedule every minute (`src/lib/schedule.js`) and automatically shows an embedded YouTube live player in a "Live Now" section whenever a service is in progress — no manual toggling required. Outside service hours it just shows the regular "Watch Live" button linking out to YouTube.

**To activate it for real:**
1. Open `src/pages/Home.jsx` and find the line `const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID'`.
2. Replace it with your channel's real ID (starts with `UC...`) — find it under **YouTube Studio → Settings → Channel → Advanced settings**.
3. Make sure the channel has an active live stream during the times in `SCHEDULE`; otherwise the embed will show "offline."

The schedule itself now lives in one place — `src/lib/schedule.js` — and is shared by both the homepage live-detection and the `/services` page, so editing service times only needs to happen once.

## New: WhatsApp community (Contact page)

A WhatsApp card on `/contact` offers two actions: joining a group, and messaging the church directly.

**To activate it for real:**
1. In `src/pages/Contact.jsx`, replace `https://chat.whatsapp.com/YOUR_INVITE_CODE` with your actual WhatsApp group invite link (generate this from the group's "Invite via link" option in the WhatsApp app).
2. Replace `919876543210` in the `wa.me` link with the real church contact number, in `<country code><number>` format with no `+`, spaces, or dashes.

## New: 404 page

Any URL that doesn't match a real route (`src/App.jsx`'s catch-all `path="*"`) now shows an on-brand `src/pages/NotFound.jsx` instead of a blank crash — dark ink background, the same ridge-divider seam used elsewhere, serif "404," and two ways back in: **Back to Home** and **Contact Us**.

Nothing to configure here — it works automatically for any bad link, typo'd URL, or removed page.

## New: Sitemap, robots.txt, and per-page SEO

**`public/robots.txt`** and **`public/sitemap.xml`** — already list all seven real routes. Both files are served automatically at `/robots.txt` and `/sitemap.xml`.

**To activate for real:**
1. Once the site is deployed, replace every instance of `https://www.elshaddaiworshipcenter.org` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the actual live domain.
2. Submit `https://<your-domain>/sitemap.xml` to [Google Search Console](https://search.google.com/search-console) so Google indexes all pages, not just the homepage.

**Per-page browser titles & descriptions** — every page now renders a `<Seo title="..." description="..." />` component (`src/components/Seo.jsx`) that updates the browser tab title and meta description as people navigate. This helps real visitors (accurate tab titles, better bookmarks) and Google's crawler, which does execute JavaScript.

**To edit a page's title/description:** open the page file (e.g. `src/pages/Services.jsx`) and edit the `title`/`description` props on its `<Seo ... />` line near the top of the JSX.

### Social sharing previews (WhatsApp / Facebook) — important limitation

This site is a client-rendered single-page app (no server-side rendering). When someone shares a link in WhatsApp or Facebook, those platforms' preview bots fetch the page **without running any JavaScript** — they only ever see the static tags already sitting in `index.html`. That means:

- ✅ Sharing **any** page's link will show a proper preview card (title, description, image) — because `index.html` has solid Open Graph and Twitter tags set site-wide.
- ⚠️ Every shared link will show the **same** preview (the homepage's title/description/image), regardless of which actual page was shared — the `<Seo>` component's per-page updates only apply after JavaScript runs, which these bots skip.

**To activate the site-wide preview:**
1. Add a real `public/og-image.jpg` (1200×630px) — see the media checklist above.
2. Once deployed, replace `https://www.elshaddaiworshipcenter.org` in `index.html`'s Open Graph tags with the real domain.

**If distinct previews per page ever matter** (e.g. wanting the Give page to preview differently than the homepage when shared), the fix is adding a prerendering step to the build — either a static-site generator migration (Next.js, Astro) or a Vite prerendering plugin that generates a separate static HTML file per route at build time. That's a real scope increase, not a quick toggle, so it's left for later if it turns out to matter.

## New: Analytics (Google Analytics 4)

A guarded GA4 snippet is already in `index.html` — it's completely inert (no network requests, nothing sent) until a real Measurement ID is set, so it's safe to leave as-is during development.

**To activate it for real:**
1. Create a free GA4 property at [analytics.google.com](https://analytics.google.com) and copy its Measurement ID (looks like `G-XXXXXXXXXX`).
2. In `index.html`, find `window.GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'` and replace the placeholder with the real ID.
3. Deploy — GA4 will start tracking automatically, no other code changes needed.

Once it's running, GA4's **Pages and screens** report under **Engagement** will show exactly what you were asking about — which pages actually get visited (Services and Contact are worth checking first) — without needing to add anything else to the codebase.

If a simpler, privacy-friendlier option is preferred, [Plausible](https://plausible.io) works too: it's just a single `<script>` tag pointed at your domain, no cookie consent banner legally required in most cases. Swap the GA4 snippet for Plausible's script tag in the same spot in `index.html` if that's the preferred route instead.

## New: Content Admin (Decap CMS) — edit text, images, and links without touching code

The site now has a visual admin panel at **`/admin`** that lets anyone edit sermons, service times, contact details, bank details, leadership bios, and every image on the site through simple forms — no code, no terminal, no backend server to run.

### How it works

- `/admin` is [Decap CMS](https://decapcms.org) (formerly Netlify CMS), a free open-source tool. It's just a few extra files bundled into this same site — not a separate app.
- Every field you see in the admin panel maps to a JSON file under `src/content/`. When someone saves a change in `/admin`, Decap CMS commits that change directly to this GitHub repo.
- That commit triggers your host (Netlify/Vercel/etc.) to automatically rebuild and redeploy — typically live within 1–2 minutes.
- There's no database and nothing to host yourself — GitHub is the only "backend," and you already need it to store the code anyway.

### What's editable through `/admin`

| Section in `/admin` | Controls |
|---|---|
| Site Settings | Logo, hero video, YouTube channel ID, social links |
| Contact Info | Phone, email, address, WhatsApp group link & number, Google Maps embed |
| Give | UPI ID, bank account name/number/IFSC |
| Leadership | Founder & Head Pastor names, bios, quote, photos, social links |
| About Page Content | The big opening statement, founding story text, sanctuary photo |
| Page Header Photos | The background photo on every subpage header |
| Homepage Glimpses | The 3 photos in the "Glimpses of Worship" strip |
| Weekly Service Schedule | Day, times, notes, photos for each service |
| Ministries | Title, description, photo for each of the 3 ministries |
| Sermons | Fully repeatable — add, edit, or remove sermons individually with title, scripture, speaker, date, thumbnail, and YouTube link |

Anything not in this list (the hero title text, button labels, hard-coded page copy like paragraph structure) still lives in the `.jsx` files and needs a code edit — this covers the content that actually changes week to week.

### Setup — this part requires one-time technical setup

Getting `/admin` from "built" to "actually logging in and saving" needs your hosting platform's auth wired up. The config here assumes **Netlify hosting**, because Netlify provides login (Identity) and git-commit permission (Git Gateway) for free with zero custom backend code — the simplest path to "edit without a backend."

**If hosting on Netlify:**
1. Deploy this site to Netlify (connect the GitHub repo — standard Netlify flow).
2. In the Netlify dashboard: **Site settings → Identity → Enable Identity**.
3. Still in Identity settings: **Registration → set to "Invite only"** (so random people can't sign up).
4. **Identity → Services → Git Gateway → Enable Git Gateway** (this is what lets Decap CMS commit to the repo on a logged-in user's behalf, without them needing their own GitHub account or personal access token).
5. **Identity → Invite users** — enter the email address(es) of whoever should be able to edit content (e.g. church office staff). They'll get an email invite to set a password.
6. Visit `https://<your-site>/admin`, log in with that email/password — the CMS dashboard loads.

**If hosting elsewhere (Vercel, etc.):** Netlify Identity/Git Gateway won't be available. The alternative is Decap CMS's `github` backend, which needs a small OAuth proxy — either a free one-click deploy of [decap-cms-oauth-provider](https://github.com/decaporg/decap-cms-oauth-provider) or (with Vercel specifically) a couple of serverless functions. This is a bit more setup than the Netlify path but still has no server for you to maintain long-term. Update `public/admin/config.yml`'s `backend:` section accordingly if going this route — happy to help set this up when you know the target host.

### Uploaded images

Images uploaded through `/admin` land in `public/images/uploads/` and get committed to the repo alongside everything else — they become permanent site assets, not stored anywhere external.

### A note on the "Internal ID" field on Services and Ministries

The Services and Ministries sections in `/admin` have a field called "Internal ID" (or a locked dropdown, for Ministries). This connects each entry to code that decides things like which icon to show or how the "Next Service" countdown works — don't change these values, but everything else on those entries (times, titles, photos, descriptions) is safe to edit freely.
