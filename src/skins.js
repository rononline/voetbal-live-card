import { css } from "lit-element";

// Beschikbare themes: dark (standaard), light, feyenoord, classic, neon, gold
// Gebruik: skin: feyenoord  in de kaart-YAML

export const skinStyles = css`
  :host {
    /* Accent palette — standaard (dark/light) */
    --cl-accent: #6366f1;
    --cl-accent-2: #ec4899;
    --cl-live: #ef4444;
    --cl-live-glow: rgba(239,68,68,0.5);
    --cl-green: #10b981;
    --cl-gold: #fbbf24;
    --cl-gold-glow: rgba(251,191,36,0.4);
    --cl-gold-text: #fde047;
    --cl-cl: #6366f1;
    --cl-el: #f97316;
    --cl-rel: #ef4444;
    --cl-conf: #a855f7;
  }

  /* ---------- DARK (standaard) ---------- */
  :host,
  :host([data-skin="dark"]) {
    --cl-bg: #14182a;
    --cl-surface: rgba(255,255,255,0.05);
    --cl-surface-2: rgba(255,255,255,0.08);
    --cl-card-2: rgba(255,255,255,0.05);
    --cl-divider: rgba(255,255,255,0.08);
    --cl-glass-border: rgba(255,255,255,0.08);
    --cl-text: #f4f6fb;
    --cl-text-2: #aab2c5;
    --cl-shadow: rgba(0,0,0,0.30);
    --cl-overlay-strong: rgba(0,0,0,0.55);
    --cl-overlay-soft: rgba(0,0,0,0.25);
    --cl-chip-bg: rgba(255,255,255,0.10);
    --cl-chip-border: rgba(255,255,255,0.12);
    --cl-toast-bg: #0b0f1a;
    --cl-num-bg: #0b0f1a;
  }

  /* ---------- LIGHT ---------- */
  :host([data-skin="light"]) {
    --cl-bg: #ffffff;
    --cl-surface: rgba(15,23,42,0.04);
    --cl-surface-2: rgba(15,23,42,0.07);
    --cl-card-2: rgba(15,23,42,0.04);
    --cl-divider: rgba(15,23,42,0.10);
    --cl-glass-border: rgba(15,23,42,0.10);
    --cl-text: #14182a;
    --cl-text-2: #5b6577;
    --cl-shadow: rgba(15,23,42,0.12);
    --cl-overlay-strong: rgba(0,0,0,0.45);
    --cl-overlay-soft: rgba(0,0,0,0.18);
    --cl-chip-bg: rgba(15,23,42,0.06);
    --cl-chip-border: rgba(15,23,42,0.12);
    --cl-toast-bg: #1a1f33;
    --cl-num-bg: #1a1f33;
  }

  /* ---------- FEYENOORD (rood/zwart) ---------- */
  :host([data-skin="feyenoord"]) {
    --cl-accent: #cc0000;
    --cl-accent-2: #ff2200;
    --cl-live: #ff4444;
    --cl-live-glow: rgba(204,0,0,0.6);
    --cl-cl: #cc0000;
    --cl-el: #ff6600;
    --cl-rel: #990000;
    --cl-conf: #cc3300;
    --cl-gold: #ffd700;
    --cl-gold-glow: rgba(255,215,0,0.4);
    --cl-gold-text: #ffe55c;
    --cl-bg: #130303;
    --cl-surface: rgba(204,0,0,0.07);
    --cl-surface-2: rgba(204,0,0,0.12);
    --cl-card-2: rgba(204,0,0,0.07);
    --cl-divider: rgba(204,0,0,0.18);
    --cl-glass-border: rgba(204,0,0,0.20);
    --cl-text: #f4f0f0;
    --cl-text-2: #c09090;
    --cl-shadow: rgba(0,0,0,0.40);
    --cl-overlay-strong: rgba(0,0,0,0.60);
    --cl-overlay-soft: rgba(0,0,0,0.30);
    --cl-chip-bg: rgba(204,0,0,0.12);
    --cl-chip-border: rgba(204,0,0,0.22);
    --cl-toast-bg: #0d0101;
    --cl-num-bg: #0d0101;
  }

  /* ---------- CLASSIC (groen/goud — voetbalveld) ---------- */
  :host([data-skin="classic"]) {
    --cl-accent: #16a34a;
    --cl-accent-2: #22c55e;
    --cl-live: #ef4444;
    --cl-live-glow: rgba(239,68,68,0.5);
    --cl-cl: #16a34a;
    --cl-el: #f97316;
    --cl-rel: #ef4444;
    --cl-conf: #84cc16;
    --cl-bg: #0a120a;
    --cl-surface: rgba(22,163,74,0.07);
    --cl-surface-2: rgba(22,163,74,0.12);
    --cl-card-2: rgba(22,163,74,0.07);
    --cl-divider: rgba(22,163,74,0.18);
    --cl-glass-border: rgba(22,163,74,0.20);
    --cl-text: #f0f4f0;
    --cl-text-2: #8aaa8a;
    --cl-shadow: rgba(0,0,0,0.35);
    --cl-overlay-strong: rgba(0,0,0,0.55);
    --cl-overlay-soft: rgba(0,0,0,0.25);
    --cl-chip-bg: rgba(22,163,74,0.10);
    --cl-chip-border: rgba(22,163,74,0.22);
    --cl-toast-bg: #060d06;
    --cl-num-bg: #060d06;
  }

  /* ---------- NEON (cyberpunk) ---------- */
  :host([data-skin="neon"]) {
    --cl-accent: #00e5ff;
    --cl-accent-2: #ff00aa;
    --cl-live: #ff2d55;
    --cl-live-glow: rgba(255,45,85,0.6);
    --cl-cl: #00e5ff;
    --cl-el: #ff9500;
    --cl-rel: #ff2d55;
    --cl-conf: #bf5af2;
    --cl-gold: #ffd60a;
    --cl-gold-glow: rgba(255,214,10,0.5);
    --cl-gold-text: #ffe55c;
    --cl-bg: #080816;
    --cl-surface: rgba(0,229,255,0.05);
    --cl-surface-2: rgba(0,229,255,0.09);
    --cl-card-2: rgba(0,229,255,0.05);
    --cl-divider: rgba(0,229,255,0.14);
    --cl-glass-border: rgba(0,229,255,0.18);
    --cl-text: #e8f8ff;
    --cl-text-2: #7ab8cc;
    --cl-shadow: rgba(0,0,0,0.45);
    --cl-overlay-strong: rgba(0,0,0,0.65);
    --cl-overlay-soft: rgba(0,0,0,0.30);
    --cl-chip-bg: rgba(0,229,255,0.08);
    --cl-chip-border: rgba(0,229,255,0.20);
    --cl-toast-bg: #040410;
    --cl-num-bg: #040410;
  }

  /* ---------- GOLD (premium/Champions League) ---------- */
  :host([data-skin="gold"]) {
    --cl-accent: #f59e0b;
    --cl-accent-2: #fcd34d;
    --cl-live: #ef4444;
    --cl-live-glow: rgba(239,68,68,0.5);
    --cl-cl: #f59e0b;
    --cl-el: #f97316;
    --cl-rel: #ef4444;
    --cl-conf: #a855f7;
    --cl-gold: #f59e0b;
    --cl-gold-glow: rgba(245,158,11,0.5);
    --cl-gold-text: #fde047;
    --cl-bg: #0d0900;
    --cl-surface: rgba(245,158,11,0.06);
    --cl-surface-2: rgba(245,158,11,0.11);
    --cl-card-2: rgba(245,158,11,0.06);
    --cl-divider: rgba(245,158,11,0.16);
    --cl-glass-border: rgba(245,158,11,0.20);
    --cl-text: #faf6ed;
    --cl-text-2: #c4a96a;
    --cl-shadow: rgba(0,0,0,0.40);
    --cl-overlay-strong: rgba(0,0,0,0.60);
    --cl-overlay-soft: rgba(0,0,0,0.28);
    --cl-chip-bg: rgba(245,158,11,0.10);
    --cl-chip-border: rgba(245,158,11,0.22);
    --cl-toast-bg: #090600;
    --cl-num-bg: #090600;
  }
`;

const VALID_SKINS = ['dark', 'light', 'feyenoord', 'classic', 'neon', 'gold'];

export function resolveSkin(config) {
  const s = config && typeof config.skin === 'string' ? config.skin.toLowerCase() : 'dark';
  return VALID_SKINS.includes(s) ? s : 'dark';
}

export function applySkin(el, config) {
  const skin = resolveSkin(config);
  if (el && el.setAttribute) el.setAttribute('data-skin', skin);
  return skin;
}
