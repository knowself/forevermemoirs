# ForeverMemoirs 2.0 — Design System & UI/UX Architecture

> **Brand Core:** *"No life story should go untold."*  
> **Aesthetic Archetype:** Cinematic Archival Heirloom (Hermosa Beach Documentary Craft meets Modern AI Laboratory).

---

## 1. Design Philosophy & Brand Identity

ForeverMemoirs 2.0 is a modern revival of the Hermosa Beach personal documentary studio (originally founded in 2020). The design language moves deliberately away from sterile corporate SaaS or generic cartoonish AI applications. Instead, it evokes the gravitas, warmth, and timelessness of an **A&E Biography documentary**, an **antique Kodak shoebox**, and a **fine art museum archive**.

### Core Visual Principles
1. **Archival Respect Over Tech Novelty:** Technology serves family heritage. Visual elements highlight tactile photographic memory (grain, sepia, warm light) rather than AI gimmicks.
2. **Emotional Gravitas & Reverence:** Microcopy and imagery honor the dignity of family elders, ancestral history, and generational continuity.
3. **Immediate Visual Proof:** Customers see the exact restoration difference upfront through interactive before-and-after scrubbing before making any financial commitment.
4. **Unconditional Trust & Privacy:** Clear, repeated affirmations of the zero-risk guarantee (*Love it or $0*) and strict privacy policy (*Your memories never train public models*).

---

## 2. Color Palette & Atmospheric System

The visual theme uses a tailored dark archival palette punctuated by champagne gold leafing and warm parchment accents:

| Token | Hex / Value | Usage & Meaning |
|---|---|---|
| **Obsidian Ink (`ink-950`)** | `#0d0b0a` | Deep master background; provides high-contrast canvas for vintage photography. |
| **Charcoal Ink (`ink-900`)** | `#171412` | Card panels, form containers, elevated modules. |
| **Champagne Gold (`gold-500`)** | `#c89e27` | Primary brand accent; buttons, divider lines, active status indicators. |
| **Radiant Gold (`gold-300`)** | `#e0c46c` | Gradient highlights, glowing headings, interactive handles. |
| **Archival Parchment (`parchment-100`)** | `#f8f4eb` | Primary typography; warm ivory that is softer on the eyes than pure `#ffffff`. |
| **Muted Parchment (`parchment-200/70`)**| `rgba(239, 230, 213, 0.7)` | Secondary descriptions, captions, and metadata. |
| **Emerald Verification** | `#34d399` | Live status dots, turnaround badges, verified quality checks. |

### Atmospheric Texture & Glassmorphism
- **Film Grain (`.film-grain`):** Subtle radial overlay replicating 35mm motion picture grain.
- **Radial Gold Aura (`.bg-radial-gold`):** Soft ambient light pools positioned behind hero headings and call-to-action cards.
- **Glassmorphic Paneling (`.glass-card`):** Dark translucent surfaces with `backdrop-filter: blur(16px)` and delicate `rgba(200, 158, 39, 0.15)` gold hairline borders.

---

## 3. Typography Hierarchy

The typographic system pairs classical serif authority with modern, highly legible sans-serif utility:

```
Headings & Display  ─── Cinzel / Playfair Display (Serif, Editorial, Dramatic)
Body & Form Inputs  ─── Plus Jakarta Sans (Clean, Modern, Accessible)
Metadata & Telemetry ─── Monospace (Timecodes, Turnaround, Model Metrics)
```

- **H1 (Hero):** `font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight`, utilizing `.gold-text-gradient` on emotional keywords (*"go untold"*).
- **H2 (Sections):** `font-serif text-3xl sm:text-4xl font-bold text-parchment-100`.
- **H3 (Cards & Modules):** `font-serif text-xl sm:text-2xl font-bold`.
- **Eyebrow Badges:** `text-xs uppercase tracking-widest font-semibold text-gold-300`.
- **Body:** `text-sm sm:text-base text-parchment-200/80 leading-relaxed`.

---

## 4. Key Interactive Components

### 4.1. Before/After Split Comparison Slider (`BeforeAfterSlider.tsx`)
- **Purpose:** Demonstrates the restoration pipeline on an authentic 1948 grandfather-and-granddaughter portrait with deep creases, fold scars, and water stains.
- **Interaction:**
  - Mouse click-and-drag and mobile touch swipe across the photograph.
  - Floating badges (*"Original (Faded & Scratched)"* vs *"Restored Master (CodeFormer + Human QC)"*) dynamically fade depending on handle position.
  - Vertical champagne gold divider line with center arrow pill handle.
- **Telemetry Strip:** Four live metrics below the comparison:
  1. *Face Fidelity:* 100% Genuine (Never alters identity)
  2. *Resolution:* 4K Archival (Real-ESRGAN + CodeFormer)
  3. *Quality Control:* Human Master QC (Verified frame by frame)
  4. *Turnaround:* 48 Hours (Fast digital delivery)

### 4.2. Cinematic Documentary Showcase (`CinematicShowcase.tsx`)
- **Purpose:** Bridges the gap between photo restoration and documentary memoir films ($997 – $2,997).
- **Interaction:**
  - 16:9 35mm documentary still of an intimate grandmother interview.
  - Interactive playback toggle with live pulsing audio waveform animation.
  - HUD overlay featuring broadcast timecode (`TC 01:24:08:14`) and recording badge (`REC 4K`).
  - Narrative column explaining the remote Zoom interview direction process.

### 4.3. Interactive Offer Ladder (`OfferLadder.tsx`)
- **Purpose:** Presents the 5 business tiers with category filtering and clear price-to-value anchors.
- **Interaction:**
  - Filter pills: *All Packages (5)* | *Photo Restoration ($49 – $149)* | *Documentaries & Vaults ($297 – $2,997)*.
  - **The 5 Tiers:**
    1. **Memory Rescue ($49):** The low-barrier entry point; single photo, 48h turnaround.
    2. **The Shoebox ($149):** Highlighted as *Most Popular Gift* with subtle gold glow elevation; 5 photos + 60s musical video tribute.
    3. **The Memoir Film ($997):** Signature personal documentary; remote Zoom session + 25 restored photos.
    4. **The Biography ($2,997):** Multi-session generational legacy chronicle.
    5. **LifeCharts 2.0 ($297/yr):** Continuous family video diary with annual year-end film cut.
  - Each card includes direct pre-selected checkout routing (`/order?tier=[id]`).

### 4.4. Restoration Pipeline Walkthrough (`RestorationPipeline.tsx`)
- **Purpose:** Demystifies the technical process into 5 reassuring steps:
  1. *Capture & Upload (Zero Risk)*
  2. *Facial Fidelity Engine (CodeFormer)*
  3. *Archival Texture Repair (Real-ESRGAN)*
  4. *Human Master QC (Essential)*
  5. *Archival Delivery (48-Hour Turnaround)*

### 4.5. Trust Badges & Accordion FAQ (`TrustAndFAQ.tsx`)
- **Purpose:** Overcomes customer hesitation regarding photo safety, AI alteration, and privacy.
- **Badges:** Love It Or $0 Guarantee • Vault-Grade Privacy • 48-Hour Turnaround.
- **Accordion:** Interactive expandable drawers answering common questions with animated `+` rotation handles.

---

## 5. Page-by-Page User Experience Flow

### 5.1. Home Page (`/`)
1. **Hook:** Cinematic headline, Hermosa Beach badge, primary and secondary CTAs, live stats strip.
2. **Proof:** Interactive Before/After slider allowing users to manipulate photo restoration in real time.
3. **Process:** 5-step pipeline illustrating human + AI balance.
4. **Cinematic Vision:** Video showcase highlighting the full memoir film experience.
5. **Ladder:** 5-tier pricing grid with interactive filters.
6. **Reassurance:** Trust seals and expandable FAQ.
7. **Closing CTA:** Archival banner leading into the order funnel.

### 5.2. About Page (`/about`)
- **Narrative Arc:** Traces the company's origins from Hermosa Beach, CA (in-person camera crews, $1,375–$9,495, DVDs) to the 2.0 Revival (remote Zoom direction, local AI restoration, accessible $49 entry).
- **Comparison Table:** Side-by-side contrast between ForeverMemoirs 1.0 (2020) and ForeverMemoirs 2.0 (Today).
- **The 3 Ethical Pillars:**
  1. *Never Alter a Face* (Strict CodeFormer fidelity weights).
  2. *Archival Client Rights* (Zero public AI training).
  3. *Human Master QC* (Every restoration verified by an experienced editor).

### 5.3. Order & Commission Page (`/order`)
- **URL Parameter Sync:** Automatically reads `?tier=[id]` from navigation links and sets active package.
- **4-Step Integrated Form:**
  1. *Package Selection Grid:* Live radio card selectors showing price, turnaround, and deliverables.
  2. *Client Details:* Full name and email inputs.
  3. *Drag-and-Drop Photo Uploader:* Instant browser thumbnail preview with badge for additional files.
  4. *Family Story Notes:* Helpful contextual prompts (decades, names, specific damage areas).
- **Live Commission Summary Sidebar:** Real-time updates showing turnaround window, guarantee seal, and checklist of deliverables.
- **Celebration State:** On submission, transitions to an elegant confirmation card explaining next steps and upload vault instructions.

---

## 6. Interaction & Micro-Animation Details

- **Sticky Navigation Transition:** Header smoothly shifts from transparent to frosted obsidian glass (`backdrop-blur-md`) with gold underline when scrolled past 20px.
- **Hover Transitions:** Buttons feature gradient brightness expansion, slight scale shifts (`hover:scale-[1.02]`), and subtle gold drop shadows (`shadow-gold-500/25`).
- **Pulsing Status Dots:** Emerald and gold status indicators employ subtle heartbeat keyframe animations to signify active studio operations.
- **Responsive Touch Scrubbing:** The Before/After slider supports unified mouse and touch coordinate tracking with boundary clamping (`0% – 100%`).

---

## 7. Accessibility & Performance Benchmarks

- **WCAG Contrast:** All body text meets WCAG AA standards using high-contrast parchment ivory (`#f8f4eb`) against deep dark ink (`#0d0b0a`).
- **Semantic Structure:** Proper `h1`–`h4` heading hierarchy, `<main>`, `<header>`, `<footer>`, `<nav>`, and `<section>` landmarks.
- **Image Preloading:** High-resolution comparison assets are preloaded via Next.js link headers for zero-flicker slider interaction.
- **Zero Heavy External Runtimes:** Built entirely on standard React 19, Next.js 16 App Router, Tailwind CSS, and lightweight CSS transforms with no bulky UI component libraries.
