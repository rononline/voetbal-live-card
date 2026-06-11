# ⚽ Voetbal Live Card

Mooie, geanimeerde voetbalkaarten voor Home Assistant.  
Companion voor de [Voetbal Live integratie](https://github.com/rononline/voetbal-live).

Fork van [Calcio Live Card](https://github.com/Bobsilvio/calcio-live-card) door @Bobsilvio — uitgebreid met Nederlandse vertaling, bugfixes en extra features.

---

## ✨ Kaarten

| Kaart | Type | Toont |
|---|---|---|
| 🏅 **Stand** | `calcio-live-classifica` | Klassement met gekleurde zones (CL / EL / degradatie), goud voor #1 |
| ⚽ **Team** | `calcio-live-team` | Wedstrijd: live score, vorm-pills, seizoensrecord, topscorer, TV-zender, toeschouwers |
| 📋 **Wedstrijden** | `calcio-live-matches` | Dagsgegroepeerde wedstrijden met live-markering en FT-badge |
| 📰 **Nieuws** | `calcio-live-news` | Artikelfeed met afbeeldingen en relatieve datum |
| 👥 **Opstelling** | `calcio-live-lineup` | Basiself van beide teams, formatie, rugnummers |
| ⏱ **Tijdlijn** | `calcio-live-timeline` | Minuut-voor-minuut log (doelpunten, kaarten, wissels) |
| 🏆 **Schema** | `calcio-live-bracket` | KO-schema: lijstweergave of toernooi-boom met centrale trofee |

### Features
- 🌍 **Meertalig** — Nederlands / Engels / Italiaans / Frans / Spaans, automatisch via HA-taalinstelling
- 🎨 **Animaties** — live-pulsering, score-pop, doelpunt-confetti + banner
- 🔔 **In-card toasts** — optioneel bij doelpunten en kaarten, zonder HA-notificatiespam
- 🏆 **Bracket** — lijst-stijl of toernooi-boom met SVG-pijlverbindingen
- 📱 **Responsive** — werkt op mobiel, tablet en desktop

---

## 📸 Screenshots

| Stand | Team | Wedstrijden |
|---|---|---|
| ![Stand](images/classifica.png) | ![Team](images/squadra.png) | ![Wedstrijden](images/campionato.png) |

---

## 📦 Installatie via HACS

1. Voeg de repository toe als **custom repository** in HACS:  
   `https://github.com/rononline/voetbal-live-card` — categorie: **Dashboard**
2. Installeer **Voetbal Live Card** via HACS
3. Herstart Home Assistant en doe een harde refresh van het dashboard (Ctrl+F5 / Cmd+Shift+R)

> Zorg dat de [Voetbal Live integratie](https://github.com/rononline/voetbal-live) geïnstalleerd is.

---

## 🃏 Kaart-referentie

Alle kaarten hebben twee gemeenschappelijke opties:

| Optie | Beschrijving |
|---|---|
| `entity` | De Voetbal Live sensor. De editor filtert automatisch compatibele sensoren. |
| `language` | Taal forceren: `auto` (volgt HA-instelling), `nl`, `en`, `it`, `fr`, `es` |
| `skin` | `dark` (standaard) of `light` |

### 🏅 Stand

```yaml
type: custom:calcio-live-classifica
entity: sensor.calciolive_classifica_ned_1
max_teams_visible: 18
hide_header: false
show_event_toasts: false
```

### ⚽ Team

```yaml
type: custom:calcio-live-team
entity: sensor.calciolive_next_ned_1_feyenoord_rotterdam
show_event_toasts: true
score_size: normal    # normal / big / huge
```

Bij `show_event_toasts: true` triggert een doelpunt een complete viering:
confetti-burst, knipperend kaartrand, groot "GOAL!"-banner, score-animatie en trilling op mobiel.

### 📋 Wedstrijden

```yaml
type: custom:calcio-live-matches
entity: sensor.calciolive_all_ned_1
max_events_visible: 6
max_events_total: 50
show_finished_matches: true
hide_past_days: 0
show_event_toasts: false
```

### 📰 Nieuws

```yaml
type: custom:calcio-live-news
entity: sensor.calciolive_news_ned_1
max_articles: 5
hide_images: false
```

### 👥 Opstelling

```yaml
type: custom:calcio-live-lineup
entity: sensor.calciolive_next_ned_1_feyenoord_rotterdam
```

> Beschikbaar kort voor de aftrap (zodra ESPN de opstellingen publiceert).

### ⏱ Tijdlijn

```yaml
type: custom:calcio-live-timeline
entity: sensor.calciolive_next_ned_1_feyenoord_rotterdam
reverse_order: true   # nieuwste bovenaan
```

### 🏆 Schema

```yaml
type: custom:calcio-live-bracket
entity: sensor.calciolive_bracket_uefa_champions
style: tree           # 'list' (standaard) of 'tree'
compact: false
tree_show_playoffs: false
```

Het bracket-sensor wordt automatisch aangemaakt voor bekertoernooien:  
Champions League, Europa League, Conference League, KNVB Beker, Copa del Rey, WK, EK, en meer.

---

## 🌍 Meertalig

Alle UI-teksten worden vertaald via `src/i18n.js` met **80+ sleutels** in vijf talen.

| Sleutel | NL | EN | IT | FR | ES |
|---|---|---|---|---|---|
| `time.today` | Vandaag | Today | Oggi | Aujourd'hui | Hoy |
| `event.goal` | Doelpunt | Goal | Goal | But | Gol |
| `round.r16` | Achtste finales | Round of 16 | Ottavi | Huitièmes | Octavos |
| `status.halftime` | Rust | Halftime | Intervallo | Mi-temps | Descanso |

---

## 📜 Licentie

ISC — zie [LICENSE](LICENSE).  
Data via ESPN publieke API's.
