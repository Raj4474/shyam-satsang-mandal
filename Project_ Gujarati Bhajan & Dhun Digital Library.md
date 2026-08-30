# Project: Gujarati Bhajan & Dhun Digital Library

## Project Overview

Create a premium, modern, spiritual, and fully responsive web application for preserving and sharing Gujarati Bhajans, Dhuns, and the life history of spiritual personalities.

The website will act as a digital library where users can explore devotional content written by different saints, poets, family members, and spiritual personalities such as Gangasati, Panbai, Amesh Kankad, Shamjibapa, and others.

The platform must be fully customizable through an admin dashboard so that new content, authors, images, audio files, and categories can be added without changing the website code.

The website should be built using Next.js with a scalable and clean architecture.

---

# Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- PostgreSQL / Supabase
- Prisma ORM or Supabase Database
- NextAuth or Supabase Auth
- Supabase Storage for images, audio, and documents

The website should be optimized for:

- Mobile devices
- Tablets
- Desktop
- Gujarati language content
- Fast loading
- SEO
- Accessibility

---

# Main Website Sections

The website will have three primary sections:

1. શામજીબાપાનું જીવન ચરિત્ર
2. ભજન
3. ધૂન

Additional sections:

- Home
- સંત / લેખકો
- ફોટો ગેલેરી
- About
- Contact

---

# 1. Home Page

The homepage should have a premium spiritual and peaceful appearance.

## Hero Section

Display a beautiful spiritual background or subtle abstract pattern.

Main heading:

"ભજન, ધૂન અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય"

Subheading:

"સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ."

Primary buttons:

- જીવન ચરિત્ર વાંચો
- ભજન જુઓ
- ધૂન સાંભળો

---

## Main Category Section

Display three large cards.

### Card 1

Title:

શામજીબાપાનું જીવન ચરિત્ર

Description:

શામજીબાપાના જીવન, વિચારો અને આધ્યાત્મિક યાત્રા વિશે જાણો.

---

### Card 2

Title:

ભજન

Description:

ગંગાસતી, પાનબાઈ અને અન્ય સંતોના ભજનોનો સંગ્રહ.

---

### Card 3

Title:

ધૂન

Description:

ભક્તિમય ધૂન વાંચો અને સાંભળો.

---

## Featured Content

Display:

- Featured Bhajans
- Featured Dhuns
- Recently Added Content
- Featured Saints / Authors

---

# 2. જીવન ચરિત્ર Section

Create a detailed biography section for શામજીબાપા.

Possible content blocks:

- પરિચય
- જન્મ અને પરિવાર
- બાળપણ
- આધ્યાત્મિક યાત્રા
- જીવનના મહત્વપૂર્ણ પ્રસંગો
- ઉપદેશ અને વિચારો
- ફોટો ગેલેરી
- વિડિયો
- સમયરેખા

The admin should be able to dynamically create, edit, reorder, and delete biography sections.

---

# 3. Bhajan Section

The Bhajan section should display all Bhajans.

Users should be able to browse Bhajans by author.

Example authors:

- ગંગાસતી
- પાનબાઈ
- અમેશ કાંકદ
- શામજીબાપા
- અન્ય

Do not hardcode authors.

Authors must be dynamically created from the admin dashboard.

---

## Bhajan Listing Page

Each Bhajan card should display:

- Bhajan title
- Author name
- Short excerpt
- Date added
- Audio availability

Include:

- Search
- Filter by author
- Filter by category
- Sort by latest
- Sort alphabetically

---

## Bhajan Detail Page

Each Bhajan should have its own dedicated page.

Display:

- Bhajan title
- Author
- Category
- Full Gujarati lyrics
- Audio player if available
- PDF download if available
- Related Bhajans

Reading experience should be clean and distraction-free.

Features:

- Increase font size
- Decrease font size
- Dark/light reading mode
- Share button
- Copy text button

Gujarati text should be large and highly readable.

---

# 4. Dhun Section

The Dhun section will work similarly to the Bhajan section.

Each Dhun can contain:

- Title
- Author
- Full lyrics
- Audio
- Video link
- PDF document
- Description

Users should be able to browse Dhuns by author.

Example structure:

ધૂન

→ ગંગાસતી

→ પાનબાઈ

→ અમેશ કાંકદ

→ શામજીબાપા

→ અન્ય

This structure must be dynamic.

---

# 5. Author / Saint System

Create a reusable Author entity.

Each Author should contain:

- Name
- Gujarati Name
- Profile Image
- Short Biography
- Full Biography
- Birth information
- Tags
- Featured status

Each Author page should display:

- Profile image
- Biography
- Total Bhajans
- Total Dhuns
- Related content

Example URL:

/authors/gangasati

The same author can have:

- Multiple Bhajans
- Multiple Dhuns
- Biography content

---

# 6. Search System

Create a global search system.

Users should be able to search:

- Bhajan title
- Dhun title
- Author name
- Keywords

Search results should be categorized.

Example:

Search results for "ગંગાસતી"

Bhajans

Dhuns

Authors

---

# 7. Audio System

Create a reusable audio player.

Features:

- Play
- Pause
- Progress bar
- Volume control
- Duration
- Next
- Previous

Optional:

- Playlist support
- Continuous Dhun playback

The audio player should work well on mobile devices.

---

# 8. Admin Dashboard

Create a secure admin dashboard.

URL:

/admin

Admin authentication is required.

Dashboard sections:

- Dashboard Overview
- Manage Bhajans
- Manage Dhuns
- Manage Authors
- Manage જીવન ચરિત્ર
- Media Library
- Homepage Settings
- Website Settings

---

# Manage Bhajans

Admin should be able to:

- Add Bhajan
- Edit Bhajan
- Delete Bhajan
- Draft Bhajan
- Publish Bhajan
- Select Author
- Add lyrics
- Upload audio
- Upload PDF
- Upload cover image
- Mark as featured

Fields:

- Title
- Slug
- Author
- Category
- Lyrics
- Description
- Audio
- PDF
- Cover Image
- Featured
- Status
- Published Date

---

# Manage Dhuns

Admin should be able to:

- Add Dhun
- Edit Dhun
- Delete Dhun
- Select Author
- Add lyrics
- Upload audio
- Upload video
- Upload PDF
- Mark as featured

Fields:

- Title
- Slug
- Author
- Description
- Lyrics
- Audio
- Video URL
- PDF
- Featured
- Status

---

# Manage Authors

Admin can:

- Create new author
- Edit author
- Delete author
- Upload profile image
- Add biography

Fields:

- Name
- Gujarati Name
- Slug
- Profile Image
- Short Description
- Full Biography
- Featured

---

# Manage જીવન ચરિત્ર

The biography section should use dynamic content blocks.

Admin can add blocks such as:

- Text
- Image
- Image Gallery
- Timeline
- Quote
- Video
- Audio

Admin should also be able to drag and reorder sections.

---

# Media Library

Create a media management system.

Support:

- Images
- Audio files
- PDF files
- Videos

Features:

- Upload
- Preview
- Delete
- Copy URL
- Select media while creating content

---

# Homepage Settings

Admin should be able to change:

- Hero title
- Hero description
- Hero image
- Featured Bhajans
- Featured Dhuns
- Featured Authors
- Homepage section order

---

# Database Structure

## Authors

id

name

gujaratiName

slug

profileImage

shortBio

fullBio

featured

createdAt

updatedAt

---

## Bhajans

id

title

slug

authorId

description

lyrics

audioUrl

pdfUrl

coverImage

featured

status

publishedAt

createdAt

updatedAt

---

## Dhuns

id

title

slug

authorId

description

lyrics

audioUrl

videoUrl

pdfUrl

coverImage

featured

status

publishedAt

createdAt

updatedAt

---

## Biography Sections

id

title

slug

content

type

mediaUrl

sortOrder

published

createdAt

updatedAt

---

# Suggested Folder Structure

app/

├── page.tsx

├── about/

│   └── page.tsx

├── biography/

│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx

├── bhajans/

│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx

├── dhuns/

│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx

├── authors/

│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx

├── search/

│   └── page.tsx

├── admin/

│   ├── page.tsx
│   │
│   ├── bhajans/
│   │   ├── page.tsx
│   │   ├── new/
│   │   └── [id]/
│   │       └── edit/
│   │
│   ├── dhuns/
│   │
│   ├── authors/
│   │
│   ├── biography/
│   │
│   ├── media/
│   │
│   └── settings/
│
└── layout.tsx


components/

├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MobileMenu.tsx
│
├── bhajan/
│   ├── BhajanCard.tsx
│   ├── BhajanReader.tsx
│   └── BhajanFilters.tsx
│
├── dhun/
│   ├── DhunCard.tsx
│   └── DhunPlayer.tsx
│
├── author/
│   ├── AuthorCard.tsx
│   └── AuthorProfile.tsx
│
├── biography/
│   ├── Timeline.tsx
│   └── BiographyBlock.tsx
│
├── audio/
│   └── AudioPlayer.tsx
│
└── ui/

lib/

├── db.ts
├── utils.ts
└── supabase.ts

types/

├── bhajan.ts
├── dhun.ts
├── author.ts
└── biography.ts

---

# Design Direction

The design should feel:

- Spiritual
- Peaceful
- Premium
- Traditional but modern
- Clean
- Easy to read

Avoid making the website look like a typical corporate website.

---

# Color Palette

Primary:

Warm Saffron / Orange

Secondary:

Deep Maroon

Background:

Soft Cream / Off-white

Accent:

Muted Gold

Text:

Dark Brown / Charcoal

Use subtle gradients and textures inspired by:

- Indian spirituality
- Temple architecture
- Traditional Gujarati patterns
- Handwritten manuscripts

Do not overuse decorative elements.

The interface should remain clean and modern.

---

# Typography

Gujarati content is the primary focus.

Use a highly readable Gujarati font.

Bhajan and Dhun reading pages should have:

- Large typography
- Comfortable line height
- Centered reading layout
- Maximum readable width
- Font size controls

---

# Mobile First Requirements

The website should be designed mobile-first.

Important:

- Bottom-friendly navigation
- Large touch targets
- Easy audio controls
- Readable Gujarati text
- Responsive cards
- No horizontal scrolling

The website should look premium on both mobile and desktop.

---

# Important Architecture Rule

Do not hardcode:

- Authors
- Bhajan categories
- Dhun categories
- Homepage featured content
- Biography sections

Everything should be manageable from the admin dashboard.

The system should be designed so that new content types, authors, and media can be added in the future without restructuring the application.

---

# Goal

Create a long-term digital spiritual archive where Gujarati Bhajans, Dhuns, biographies, audio recordings, and cultural heritage can be preserved and easily accessed by future generations.

The platform should be elegant, simple for visitors, and extremely easy for the administrator to manage.