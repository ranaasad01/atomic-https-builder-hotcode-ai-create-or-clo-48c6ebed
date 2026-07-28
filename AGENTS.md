# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
https://builder.hotcode.ai create or clone this site exactly same

## Goal
Build a pixel-perfect clone of builder.hotcode.ai — an AI website generator SaaS landing page with all sections, plus dedicated Pricing, Examples, FAQ, and Contact pages.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #F8F7FF`, `--foreground: #1E1B4B`, `--muted: #6B7280`, `--primary: #7C3AED`, `--accent: #A78BFA`, `--border: #EDE9FE`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`contact`, `cta`, `docs`, `examples`, `faq`, `features`, `footer`, `generate`, `hero`, `how`, `nav`, `pricing`, `projects`, `tutorial`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
