# ⚽ Calcio Live Card

> Beautiful, animated, multilingual football cards for Home Assistant.
> Companion frontend for the [Calcio Live integration](https://github.com/Bobsilvio/calcio-live).

🇮🇹 **[Versione italiana](README.it.md)** · 🇬🇧 English (you are here)

[![Sample](https://storage.ko-fi.com/cdn/generated/zfskfgqnf/2025-03-07_rest-7d81acd901abf101cbdf54443c38f6f0-dlmmonph.jpg)](https://ko-fi.com/silviosmart)

---

## ✨ What's inside

A set of **7 Lovelace cards** for Home Assistant that turn the [Calcio Live](https://github.com/Bobsilvio/calcio-live) sensors into a polished, premium football dashboard:

| Card | Type | Shows |
|---|---|---|
| 🏅 **Standings** | `calcio-live-classifica` | League table with zone-colored rank badges (CL/EL/relegation), gold shimmer on the top spot |
| ⚽ **Team** | `calcio-live-team` | Single match: live score, form pills, season record, top scorer, broadcast, attendance |
| 📋 **Matches list** | `calcio-live-matches` | Day-grouped matches with live highlight, FT badges, broadcast chip |
| 📰 **News** | `calcio-live-news` | Article feed with images, headlines, relative dates |
| 👥 **Lineup** | `calcio-live-lineup` | Starting XI of both teams + bench, formation, jersey numbers |
| ⏱ **Timeline** | `calcio-live-timeline` | Minute-by-minute event log (goals, cards, subs, halftime) |
| 🏆 **Bracket** | `calcio-live-bracket` | Knockout phase: list view OR tournament tree with central trophy |

### Highlights

- 🌍 **Multilingual** — English / Italian / French / Spanish, auto-detected from your HA locale
- 🎨 **Premium design** — glassmorphism, gradients, aurora background, smooth animations
- 🔔 **Goal celebration** — opt-in: confetti burst, flash animation, big "GOAL!" banner, vibration
- ⚡ **Live updates** — pulse on live matches, in-card toasts (opt-in, no notification spam in HA)
- 🏆 **Bracket card** — 2 styles: clean list OR full tournament tree with trophy + SVG arrow connectors
- 📱 **Responsive** — works on mobile/tablet/desktop dashboards

---

## 🎬 Live preview

A self-contained showcase page is available with all cards rendered using realistic data:

- **Open locally**: clone the repo and open [`preview.html`](preview.html) in any browser (no setup needed — bundle is inlined).
- **Live demo**: deploy via GitHub Pages from the `/docs` folder → `https://<your-fork>.github.io/calcio-live-card/preview.html`

The preview includes a **language toggle** (EN/IT/FR/ES) and **theme toggle** (light/dark) so you can see how every card behaves.

---

## 📦 Installation (HACS)

1. Add this repository to HACS as a **Dashboard** custom repository: `https://github.com/Bobsilvio/calcio-live-card`
   ![Installation](images/installazione-git.png)
2. Search for **Calcio Live Card** in HACS → install.
   ![HACS](images/hacs.png)
3. Restart Home Assistant and **hard-refresh** the dashboard (Ctrl+F5 / Cmd+Shift+R).

> Make sure you have the [Calcio Live integration](https://github.com/Bobsilvio/calcio-live) installed (≥ v2.8.1) for the cards to receive data.

---

## 🃏 Cards reference

All cards share two common options:

| Option | Description |
|---|---|
| `entity` | The Calcio Live sensor to read from. The editor auto-filters compatible entities. |
| `language` | Force a specific UI language: `auto` (default, follows HA locale), `en`, `it`, `fr`, `es`. |

### 🏅 Classifica · Standings

```yaml
type: custom:calcio-live-classifica
entity: sensor.calciolive_classifica_italian_serie_a
max_teams_visible: 12
hide_header: false
selected_group: ''
show_event_toasts: false
```

- **Rank badges** color-coded by qualification zone: gold for the top, indigo for Champions, orange for Europa, red for relegation.
- The **top spot** has an animated gold shimmer.
- Sticky table header during scroll.

<img src="images/classifica.png" alt="Classifica" width="400">

### ⚽ Team · single match

```yaml
type: custom:calcio-live-team
entity: sensor.calciolive_next_serie_a_internazionale
show_event_toasts: false
```

Shows the next/live/finished match for one team:
- Big scoreboard with team logos as background
- Form pills (last 5 results: V/N/P or W/D/L by language)
- Season record chip (`14W · 6D · 14L`)
- Top scorer chip with goals count
- Broadcast chip for upcoming matches (`📺 DAZN`)
- Attendance chip for finished matches (`👥 75,923 spectators`)
- Live stats bars (possession / shots / on target) when match is in progress
- Click **Details** to open a popup with full lineups + timeline + head-to-head precedents

<img src="images/squadra.png" alt="Team card" width="400">

### 📋 Matches list · all matches

```yaml
type: custom:calcio-live-matches
entity: sensor.calciolive_all_serie_a
max_events_visible: 5
max_events_total: 50
hide_past_days: 0
show_finished_matches: true
hide_header: false
show_event_toasts: false
```

- Day-grouped: **Today** / **Yesterday** / **Tomorrow** / `dd MMM`
- Live matches: red highlight bar + glow
- Mini TV chip on upcoming matches
- Click any row → details popup

<img src="images/squadra-tutte.png" alt="Matches list" width="400">

### 📰 News card

```yaml
type: custom:calcio-live-news
entity: sensor.calciolive_news_ita_1
max_articles: 5
hide_header: false
hide_images: false
```

Article feed: headline, description (max 2 lines), image, category, relative date (`3 hours ago`). Click opens the article.

### 👥 Lineup card

```yaml
type: custom:calcio-live-lineup
entity: sensor.calciolive_next_serie_a_internazionale
hide_header: false
```

- Two columns (home / away) with starting XI
- Player photos (when available), jersey numbers, position labels
- Tactical formation displayed (e.g. `4-3-3`)
- Bench section
- Auto-collapses to one column on mobile

> Available shortly before kick-off (when ESPN publishes the rosters).

### ⏱ Timeline card

```yaml
type: custom:calcio-live-timeline
entity: sensor.calciolive_next_serie_a_internazionale
reverse_order: true
hide_header: false
```

Minute-by-minute event log:
- ⚽ goal (gold dot)
- 🟨 yellow card / 🟥 red card
- 🔄 substitution
- ⏸ halftime / ▶ second half / 🏁 end
- Each event shows minute, player, team, description

### 🏆 Bracket card

```yaml
type: custom:calcio-live-bracket
entity: sensor.calciolive_bracket_uefa_champions
style: tree         # 'list' (default) or 'tree' (with central trophy)
hide_header: false
compact: false
tree_show_playoffs: false
```

Two visual styles:

- **list** (default): rounds as side-by-side columns with full match details (1st leg, 2nd leg, aggregate, winner).
- **tree**: tournament-style tree with the **trophy in the center**, mirrored sides, mini-tie cards with team abbreviations, and **SVG bracket connectors** with arrow markers between rounds.

The bracket sensor is auto-created by the integration for cup competitions:
- UEFA Champions League / Europa League / Conference League / Euro / Nations League / Women's CL
- FIFA World Cup / Women's World Cup / Club World Cup
- CONCACAF Champions / Gold Cup / Nations League
- Coppa Italia / FA Cup / EFL Cup / Copa del Rey / DFB-Pokal / Coupe de France

---

## 🔥 Goal celebration sequence

When `show_event_toasts: true` is set on the Team card, a **calcio_live_goal** event for that match triggers a multi-effect celebration:

1. **Card flash** — animated colored border ring
2. **Radial light burst** — golden vignette overlay
3. **Big "GOAL!" banner** — pulsing yellow text with stroke (1.5s)
4. **Score number pop** — scale + glow on the new score
5. **Logo bounce** — the scoring team's logo rotates and scales
6. **Confetti** — 36 particles burst (6 colors + emojis ⚽🎉✨🔥⭐)
7. **Mobile vibration** — `[180, 80, 180, 80, 280]` if supported
8. **Toast banner** — dark with gold border, 4s

All in-card, no Home Assistant persistent notifications.

---

## 🌍 Multilingual

All UI strings are translated via a centralized `i18n.js` dictionary with **75+ keys** in **English, Italian, French, Spanish**.

The card auto-detects from `hass.locale.language` (your HA UI language). To force a specific language regardless of HA settings, set `language: en|it|fr|es` in the card YAML or pick from the editor dropdown.

Examples:
| Key | EN | IT | FR | ES |
|---|---|---|---|---|
| `card.bracket` | Bracket | Tabellone | Tableau | Cuadro |
| `round.r16` | Round of 16 | Ottavi di finale | Huitièmes de finale | Octavos de final |
| `time.today` | Today | Oggi | Aujourd'hui | Hoy |
| `event.yellow_card` | Yellow Card | Cartellino giallo | Carton jaune | Tarjeta amarilla |

---

## 💝 Support

If you like this work, consider supporting development:

[![PayPal](https://img.shields.io/badge/Donate-PayPal-%2300457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/donate/?hosted_button_id=Z6KY9V6BBZ4BN)
[![Ko-fi](https://img.shields.io/badge/Buy_me_a_coffee-Ko--fi-%23FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/silviosmart)

Follow on social:

[![TikTok](https://img.shields.io/badge/Follow_TikTok-%23000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://www.tiktok.com/@silviosmartalexa)
[![Instagram](https://img.shields.io/badge/Follow_Instagram-%23E1306C?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/silviosmartalexa)
[![YouTube](https://img.shields.io/badge/Subscribe_YouTube-%23FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@silviosmartalexa)

## 🎥 Video guide

The video is based on v2.0.1; from v2.1.0 the graphical layer was introduced. The current major redesign and new cards are documented in this README.

[Watch on YouTube](https://www.youtube.com/watch?v=K-FAJmwsGXs)

## 📜 License

ISC — see [LICENSE](LICENSE).

Data is provided by ESPN public APIs.
