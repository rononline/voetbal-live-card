import { LitElement, html, css } from "lit-element";
import { t, resolveLang } from "../../i18n.js";
import { skinStyles, applySkin } from "../../skins.js";

class CalcioLiveCannonieriCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Entity required");
    this._config = config;
    applySkin(this, config);
    this.maxItems = config.max_items || 10;
    this.hideHeader = config.hide_header || false;
  }

  getCardSize() { return 4; }

  _t(key, vars) {
    return t(key, resolveLang(this.hass, this._config), vars);
  }

  static getConfigElement() {
    return document.createElement("soccer-live-cannonieri-editor");
  }

  static getStubConfig() {
    return { entity: "sensor.soccerlive_cannonieri_" };
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="empty">${this._t('generic.unknown_entity')}: ${this._config.entity}</div>
        </ha-card>`;
    }

    const scorers = (stateObj.attributes.scorers || []).slice(0, this.maxItems);
    const leagueName = stateObj.attributes.league_name || '';
    const leagueLogo = stateObj.attributes.league_logo || '';

    return html`
      <ha-card>
        ${!this.hideHeader ? html`
          <div class="header">
            ${leagueLogo ? html`<img class="league-logo" src="${leagueLogo}" alt="${leagueName}">` : ''}
            <div class="header-text">
              <span class="title">${this._t('card.scorers')}</span>
              ${leagueName ? html`<span class="subtitle">${leagueName}</span>` : ''}
            </div>
          </div>
        ` : ''}

        ${scorers.length === 0 ? html`
          <div class="empty">${this._t('scorers.empty')}</div>
        ` : html`
          <div class="list">
            ${scorers.map((s, i) => html`
              <div class="scorer-row ${i % 2 === 0 ? 'even' : ''}">
                <span class="rank">${s.rank || i + 1}</span>
                ${s.headshot
                  ? html`<img class="headshot" src="${s.headshot}" alt="${s.player}" @error=${e => e.target.style.display='none'}>`
                  : html`<div class="headshot-placeholder"></div>`}
                <div class="player-info">
                  <span class="player-name">${s.player}</span>
                  <span class="team-name">${s.team_name}</span>
                </div>
                ${s.team_logo
                  ? html`<img class="team-logo" src="${s.team_logo}" alt="${s.team_name}" @error=${e => e.target.style.display='none'}>`
                  : html`<div class="team-logo-placeholder"></div>`}
                <div class="goals-block">
                  <span class="goals">${s.goals}</span>
                  <span class="goals-label">${this._t('scorers.goals')}</span>
                </div>
              </div>
            `)}
          </div>
        `}
      </ha-card>
    `;
  }

  static get styles() {
    return [skinStyles, css`
      ha-card {
        background: var(--cl-bg);
        color: var(--cl-text);
        overflow: hidden;
        border-radius: 12px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px 12px;
        border-bottom: 1px solid var(--cl-divider);
      }
      .league-logo {
        width: 32px;
        height: 32px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .header-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .title {
        font-size: 1em;
        font-weight: 700;
        color: var(--cl-text);
      }
      .subtitle {
        font-size: 0.78em;
        color: var(--cl-text-2);
        margin-top: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .list {
        padding: 4px 0 8px;
      }
      .scorer-row {
        display: grid;
        grid-template-columns: 28px 36px 1fr 24px 52px;
        align-items: center;
        gap: 8px;
        padding: 7px 14px;
      }
      .scorer-row.even {
        background: var(--cl-surface);
      }
      .rank {
        font-size: 0.82em;
        font-weight: 700;
        color: var(--cl-text-2);
        text-align: center;
      }
      .headshot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--cl-surface-2);
        flex-shrink: 0;
      }
      .headshot-placeholder {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--cl-surface-2);
        flex-shrink: 0;
      }
      .player-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .player-name {
        font-size: 0.88em;
        font-weight: 600;
        color: var(--cl-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .team-name {
        font-size: 0.74em;
        color: var(--cl-text-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .team-logo {
        width: 22px;
        height: 22px;
        object-fit: contain;
        justify-self: center;
      }
      .team-logo-placeholder {
        width: 22px;
        height: 22px;
      }
      .goals-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .goals {
        font-size: 1.05em;
        font-weight: 700;
        color: var(--cl-accent);
        line-height: 1.1;
      }
      .goals-label {
        font-size: 0.62em;
        color: var(--cl-text-2);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .empty {
        padding: 24px 16px;
        text-align: center;
        color: var(--cl-text-2);
        font-size: 0.9em;
      }
    `];
  }
}

customElements.define("soccer-live-cannonieri", CalcioLiveCannonieriCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "soccer-live-cannonieri",
  name: "Calcio Live · Top Scorers",
  description: "Top scorers for a league",
  preview: false,
});
