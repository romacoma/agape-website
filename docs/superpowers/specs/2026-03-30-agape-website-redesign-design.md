# Agape Ukraine Website Redesign — Design Specification

**Date:** 2026-03-30
**Status:** Approved
**Stack:** HTML + CSS + JavaScript (static, modular)
**Hero video source:** https://www.agapeukraine.com/wp-content/uploads/2025/10/%D1%81%D1%82%D0%B5%D0%BB%D0%B0-%D0%90%D0%B3%D0%B0%D0%BF%D0%B5_2-1.mp4
**Future migration:** WordPress

---

## 1. Project Overview

Corporate website for the Agape Ukraine Rehabilitation Complex (ГО «Агапе Україна»). Replaces the current outdated site at agapeukraine.com with a modern, accessible, bilingual website.

### Goals (priority order)

1. **Client conversion:** Visitors learn about rehabilitation → read reviews → fill out the JotForm application
2. **Information:** News, social/community activities for people with disabilities
3. **Donor/partner engagement:** Donation info and partner visibility

### Target audiences

- People with acquired disabilities (age 16+) and their families — primary
- Foreign donors and partners — secondary (English version)
- General public interested in rehabilitation services

---

## 2. Navigation Structure

7 main menu items, 1 dropdown:

| # | Menu Item (UA) | Menu Item (EN) | Submenu |
|---|---|---|---|
| 1 | Головна | Home | — |
| 2 | Про нас | About Us | — |
| 3 | Реабілітація | Rehabilitation | — |
| 4 | Діяльність | Activities | Студії, Ретрити, Транспорт, Майстерня, Поїздки на Херсонщину |
| 5 | Новини | News | — |
| 6 | Ресурси | Resources | — |
| 7 | Контакти | Contacts | — |

Persistent elements:
- **CTA button** "Заповнити анкету" / "Fill Application" → JotForm (https://form.jotform.com/212691368195363)
- **Language switcher** UA | EN

---

## 3. Bilingual Approach

**Approach:** Separate HTML files per language.

- Ukrainian pages in root: `/index.html`, `/about.html`, etc.
- English pages in `/en/`: `/en/index.html`, `/en/about.html`, etc.
- CSS and JS are shared (no duplication)
- Header/footer partials: `header-uk.html`, `header-en.html`, `footer-uk.html`, `footer-en.html`
- Language switcher links directly to the corresponding page in the other language

**SEO benefit:** Each language has its own URL, indexable by search engines. `hreflang` tags on all pages.

---

## 4. File Structure

```
agape/
├── index.html                    # UA Home
├── about.html                    # UA About
├── rehabilitation.html           # UA Rehabilitation
├── activities.html               # UA Activities (overview)
├── activities-studios.html       # UA Studios
├── activities-retreats.html      # UA Retreats
├── activities-transport.html     # UA Transport
├── activities-workshop.html      # UA Workshop
├── activities-kherson.html       # UA Kherson trips
├── news.html                     # UA News
├── resources.html                # UA Resources
├── contacts.html                 # UA Contacts
│
├── en/                           # English versions
│   ├── index.html
│   ├── about.html
│   ├── rehabilitation.html
│   ├── activities.html
│   ├── activities-studios.html
│   ├── activities-retreats.html
│   ├── activities-transport.html
│   ├── activities-workshop.html
│   ├── activities-kherson.html
│   ├── news.html
│   ├── resources.html
│   └── contacts.html
│
├── partials/
│   ├── header-uk.html
│   ├── header-en.html
│   ├── footer-uk.html
│   └── footer-en.html
│
├── css/
│   ├── variables.css             # Design tokens
│   ├── reset.css                 # CSS reset
│   ├── base.css                  # Body, typography, utilities
│   ├── layout.css                # Grid, containers, sections
│   ├── components/
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── hero.css
│   │   ├── gallery.css
│   │   ├── testimonials.css
│   │   └── forms.css
│   └── pages/
│       ├── home.css
│       ├── about.css
│       ├── rehabilitation.css
│       ├── activities.css
│       ├── news.css
│       ├── resources.css
│       └── contacts.css
│
├── js/
│   ├── main.js                   # Entry point
│   ├── utils/
│   │   └── include.js            # Header/footer loader
│   └── components/
│       ├── header.js             # Sticky, burger menu
│       ├── testimonials.js       # Carousel
│       ├── gallery.js            # Lightbox
│       └── animations.js         # Scroll animations
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── team/
│   │   ├── gallery/
│   │   └── partners/
│   ├── icons/
│   └── fonts/
│
└── docs/
    └── superpowers/specs/
```

---

## 5. Design System

### 5.1 Color Palette (derived from logo)

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary | Dark Blue | #1A4F8F | Headers, nav, primary buttons, links |
| Primary Light | Mid Blue | #2D6AB4 | Hover states, accents |
| Primary Dark | Deep Blue | #0F3460 | Footer bg, overlays |
| Accent | Red | #CC2229 | CTA buttons ("Fill Application"), important highlights |
| Accent Hover | Dark Red | #A51B21 | CTA hover state |
| Secondary | Golden Yellow | #E8A829 | Icons, decorative elements, badges |
| Neutral 50 | Near White | #F8F9FA | Alternating section backgrounds |
| Neutral 100 | Light Gray | #E9ECEF | Dividers, borders |
| Neutral 600 | Gray | #6C757D | Secondary text |
| Neutral 900 | Near Black | #212529 | Body text |
| White | White | #FFFFFF | Card backgrounds, header |
| Success | Green | #28A745 | Positive indicators |

### 5.2 Typography

| Element | Font | Weight | Size | Reason |
|---|---|---|---|---|
| Headings (h1–h3) | Montserrat | 600–700 | 32–48px | Modern, clean, professional |
| Subheadings (h4–h6) | Montserrat | 500 | 20–24px | Consistency |
| Body text | Open Sans | 400 | 16–18px | Excellent readability, warm |
| Buttons/nav | Montserrat | 600 | 14–16px | Clarity at small sizes |

Font source: Google Fonts.

### 5.3 Spacing Scale

| Token | Value | Usage |
|---|---|---|
| --space-xs | 4px | Micro spacing |
| --space-sm | 8px | Between elements |
| --space-md | 16px | Card padding |
| --space-lg | 32px | Between blocks |
| --space-xl | 64px | Between sections |
| --space-2xl | 96px | Large section spacing |
| --container | 1200px | Max content width |
| --radius-sm | 4px | Buttons, inputs |
| --radius-md | 8px | Cards |
| --radius-lg | 16px | Large blocks |

### 5.4 Breakpoints

| Name | Width | Device |
|---|---|---|
| Mobile | < 576px | Phones |
| Tablet | 576–991px | Tablets |
| Desktop | 992–1199px | Laptops |
| Large | ≥ 1200px | Large screens |

---

## 6. Shared Components

### 6.1 Header

**Layout:** Logo (left) → nav items (center) → language switcher + CTA button (right)

**Behavior:**
- Sticky on scroll (fixed to top)
- Transparent → white: on hero sections starts transparent with white text, gains white bg + shadow on scroll
- Dropdown on "Діяльність": hover/click reveals 5 sub-page links
- Mobile: burger menu (☰) → slide-in panel from right
- CTA "Заповнити анкету": always visible, red (accent), links to JotForm
- Language switcher: UA | EN, current language highlighted, click navigates to corresponding language page

### 6.2 Footer

**Layout:** 3 columns (desktop) → 1 column (mobile)

- Column 1: Navigation (mirrors header)
- Column 2: Contact info (phone, email, address, hours) + social media icons (Facebook, Instagram, YouTube)
- Column 3: Partner logos (7 organizations) + "Donate" button
- Bottom bar: Copyright

**Style:** Dark blue background (#0F3460), white text

### 6.3 Buttons

| Type | Style | Usage |
|---|---|---|
| Primary CTA | Red bg (#CC2229), white text, rounded | "Заповнити анкету" |
| Secondary | Blue bg (#1A4F8F), white text | "Детальніше", "Перейти" |
| Outline | Transparent bg, blue border, blue text | Secondary actions |
| Text link | No border, underline on hover | Navigation links |

All buttons: hover → 15% darker, transition 0.3s, focus → visible outline for accessibility.

---

## 7. Page Designs

### 7.1 Home (index.html)

**Sections in order:**

1. **Hero** (full viewport, VIDEO background)
   - Full-screen **video background** (MP4 from current site — aerial shots of Agape complex)
   - `<video>` tag: autoplay, muted, loop, playsinline
   - Gradient overlay on top of video (semi-transparent dark)
   - Fallback: poster image for slow connections / unsupported browsers
   - Main heading + tagline/slogan (white text over overlay)
   - 2 buttons: CTA red "Заповнити анкету" + secondary blue "Дізнатись більше"

2. **Activities** (6 cards)
   - Grid: 3×2 (desktop) → 2×3 (tablet) → 1×6 (mobile)
   - Each card: icon + title + short description (2 lines) + "Детальніше →"
   - Hover: lift 4px + shadow

3. **About preview** (2 columns)
   - Left: photo of center/team
   - Right: text with key facts (20+ years, physical therapy, accessible territory, professional team)
   - Button "Більше про нас →"

4. **Rehabilitation preview** (3 service blocks)
   - Light gray background
   - 3 services with icons: physical therapy, occupational therapy, speech therapy
   - CTA button "Заповнити анкету"

5. **Testimonials** (carousel)
   - Auto-play slider (5 sec intervals)
   - Arrows ← → + dot navigation
   - Touch swipe on mobile
   - Quote text + name + diagnosis + year

6. **Latest news** (3 cards)
   - 3 most recent news items: photo + date + title + excerpt
   - Button "Усі новини →"

7. **CTA block** (full-width)
   - Blue gradient background
   - Heading "Готові зробити перший крок?"
   - CTA button + phone number

### 7.2 About (about.html)

- **Hero**: smaller (40vh), team photo, title
- **History**: timeline — founding → key milestones → present (20+ years)
- **Mission & values**: text + 3-4 icon blocks
- **Team**: photo grid with name, position, brief description
- **CTA**: "Join us" block with application button

### 7.3 Rehabilitation (rehabilitation.html)

- **Hero**: rehabilitation process photo, title
- **Services**: expanded cards — physical therapy, occupational therapy, speech therapy, fitness, care. Each with icon, description, photo
- **Target audience**: spinal cord injury, TBI, stroke, orthopedic conditions. Age 16+, acquired conditions only
- **Team**: key specialists with photos
- **Territory**: photo gallery — accessible facilities, equipment, rooms, nature
- **Admission process**: Step 1: Application → Step 2: Review → Step 3: Invitation
- **CTA**: large block with "Заповнити анкету" button

### 7.4 Activities (activities.html)

- **Hero**: general title "Наша діяльність"
- **5 activity areas**: large preview cards with photos and descriptions, each links to sub-page

**Sub-pages** (activities-studios/retreats/transport/workshop/kherson.html):
- Same template: Hero → Description with photos → Photo gallery with lightbox → CTA

### 7.5 News (news.html)

- **Hero**: small, title "Новини"
- **News list**: cards with photo + date + title + 2-line excerpt. Grid: 3 per row
- **Pagination**: "Load more" button (static pagination initially)

Note: News are hardcoded in static HTML. Will become dynamic WordPress Posts after migration.

### 7.6 Resources (resources.html)

- **Hero**: title "Ресурси"
- **Tabs**: 4 categories — For Adults · For Children · Video · Education
- **Content**: list of cards with links/materials, filtered by tab selection

### 7.7 Contacts (contacts.html)

- **Hero**: title "Контакти"
- **Contact info**: phone, email, address, working hours + embedded Google Maps
- **Social media**: Facebook, Instagram, YouTube with icons
- **Support section**: donation info, bank details, ways to donate
- **Partners**: logos of 7 partner organizations from current site

---

## 8. JavaScript Components

| Component | File | Responsibility |
|---|---|---|
| Include | js/utils/include.js | Loads header/footer via fetch(), detects language from URL path |
| Header | js/components/header.js | Sticky on scroll, transparent→white transition, burger menu toggle, active nav highlight |
| Testimonials | js/components/testimonials.js | Carousel: auto-play (5s), prev/next arrows, dots, touch swipe, pause on hover |
| Gallery | js/components/gallery.js | Lightbox: click photo → fullscreen, arrows ← →, keyboard (Esc, ←, →), touch swipe |
| Animations | js/components/animations.js | IntersectionObserver: fade-in, slide-up on scroll. Class `.animate-on-scroll` on elements |
| Main | js/main.js | Entry point: calls include.js → initializes all components after DOM load |

---

## 9. Animations & Micro-interactions

| Element | Effect |
|---|---|
| Cards | Hover → lift 4px + shadow (transform + box-shadow, 0.3s) |
| Buttons | Hover → 15% darker bg. Click → scale(0.98) |
| Sections | Scroll → fade-in from below (opacity 0→1, translateY 20→0) |
| Header | Scroll → bg transparent to white (transition 0.3s) |
| Gallery | Lightbox → fade-in overlay + scale image |
| Burger menu | Slide-in from right (transform translateX) |

---

## 10. WordPress Migration Path

| Static HTML Element | WordPress Equivalent |
|---|---|
| partials/header-*.html | header.php in theme |
| partials/footer-*.html | footer.php in theme |
| Each HTML page | WordPress page template |
| CSS files | style.css + wp_enqueue_style() in functions.php |
| JS files | wp_enqueue_script() in functions.php |
| News (static cards) | WordPress Posts (WP_Query) |
| /en/ folder | Polylang or WPML plugin |
| Photo gallery | ACF Gallery field or WP Gallery |
| Testimonials | Custom Post Type "Testimonials" |

---

## 11. Key Information

- **Organization:** ГО «Агапе Україна»
- **Address:** с. Боратин, вул. Педагогічна 14, Луцький район, Волинська обл., 45605
- **Phone:** +38 066 217 40 18 (Mon-Fri, 09:00-17:00)
- **Email:** infoagape.ua@gmail.com
- **Application form:** https://form.jotform.com/212691368195363
- **Current site:** https://www.agapeukraine.com/
- **Partner organizations:** pravdapro.org, joniandfriends.org, lifewithoutlimbs.org, hart.ca, aesalsace.free.fr, christian-horizons.org, escif.org
- **Church partnership:** Церква «Фіміам» (fimiam.lutsk.ua)
