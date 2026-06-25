# KI4KMU

Website für den **KMU-KI-Podcast** – der Schweizer Podcast für KMU-Inhaber und Führungskräfte, die Künstliche Intelligenz praxisnah einsetzen wollen.

🌐 **Live:** [wyst933.github.io/KI4KMU](https://wyst933.github.io/KI4KMU)

## Struktur

```
├── index.html          # Homepage
├── podcast.html        # Über den Podcast
├── episoden.html       # Episodenübersicht
├── workshop.html       # Workshop Landing Page (CHF 1'800)
├── blog.html           # Blog-Übersicht
├── ueber.html          # Über Stefan
├── kontakt.html        # Kontaktformular
├── impressum.html      # Impressum
├── datenschutz.html    # Datenschutzerklärung
├── 404.html            # Fehlerseite
├── feed.xml            # Podcast RSS-Feed
├── sitemap.xml         # SEO Sitemap
├── robots.txt          # Search Engine Instructions
├── manifest.json       # PWA Manifest
├── .nojekyll           # GitHub Pages: disable Jekyll
├── episodes/           # Episode-Detailseiten (EP01–EP08)
├── blog/               # Blog-Artikel (6 Artikel)
└── assets/
    ├── css/main.css    # Design System
    ├── js/main.js      # Vanilla JS
    ├── svg/            # Favicon
    └── images/         # OG Image
```

## Tech Stack

- **Pure HTML/CSS/JS** – kein Build-Step, kein Framework
- **GitHub Pages** – kostenlos, direkt aus dem Repo
- **Google Fonts** – Inter
- **Canvas API** – Particle-Hintergrund
- **IntersectionObserver** – Scroll-Reveal-Animationen

## Deployment

Automatisch via GitHub Actions bei jedem Push auf `main`.

## Seiten

| Seite | Beschreibung |
|-------|-------------|
| `/` | Homepage mit Hero, Episoden, Workshop-CTA, Blog-Preview |
| `/workshop.html` | Workshop Landing Page – prominenter CHF 1'800 CTA |
| `/episoden.html` | Alle 8 Episoden |
| `/blog.html` | 6 Blog-Artikel |
| `/episodes/ep01–08.html` | Einzelne Episode-Seiten |
| `/blog/*.html` | Einzelne Blog-Artikel |

## Monetarisierung

Der Workshop „KI-Standortbestimmung für KMU" (CHF 1'800) ist prominent integriert:
- Hero-Sektion: CTA-Button
- Dedizierte Landing Page (`workshop.html`)
- CTA-Sektion auf der Homepage
- Workshop-CTA auf jeder Episoden- und Blogartikelseite
- Nav: „Workshop buchen"-Button durchgehend sichtbar

---
*© 2025 Stefan Wyder – KMU-KI-Podcast*
