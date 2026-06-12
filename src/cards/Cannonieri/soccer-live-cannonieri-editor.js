import { LitElement, html, css } from 'lit';

const SKINS = ['dark', 'light', 'feyenoord', 'classic', 'neon', 'gold'];
const LANGS  = ['auto', 'en', 'nl', 'de', 'pt', 'fr', 'es', 'it'];

class CalcioLiveCannonieriCardEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass:    { type: Object },
      entities: { type: Array },
    };
  }

  constructor() {
    super();
    this.entities = [];
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .field-label {
        display: block;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        font-weight: 600;
      }
      select, input[type="number"] {
        width: 100%;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        box-sizing: border-box;
      }
      select:focus, input:focus {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: -1px;
      }
      h3 {
        margin: 8px 0 0;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
      }
    `;
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = { ...config };
  }

  updated(changedProperties) {
    if (changedProperties.has('hass')) {
      this._fetchEntities();
    }
  }

  _fetchEntities() {
    if (!this.hass) return;
    this.entities = Object.keys(this.hass.states)
      .filter(id => id.startsWith('sensor.calciolive_cannonieri'))
      .sort();
  }

  _fire(newConfig) {
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  _entityChanged(ev) {
    const value = ev.target.value;
    if (value === this._config.entity) return;
    this._fire({ ...this._config, entity: value });
  }

  _selectChanged(ev) {
    const { configValue } = ev.target.dataset;
    if (!configValue) return;
    const value = ev.target.value;
    if (this._config[configValue] === value) return;
    this._fire({ ...this._config, [configValue]: value });
  }

  _numberChanged(ev) {
    const { configValue } = ev.target.dataset;
    if (!configValue) return;
    const value = parseInt(ev.target.value, 10);
    if (isNaN(value) || this._config[configValue] === value) return;
    this._fire({ ...this._config, [configValue]: value });
  }

  _switchChanged(ev) {
    const { configValue } = ev.target.dataset;
    if (!configValue) return;
    const value = ev.target.checked;
    if (this._config[configValue] === value) return;
    this._fire({ ...this._config, [configValue]: value });
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const current = this._config.entity || '';
    const inList  = current && this.entities.includes(current);

    return html`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity</label>
          <select @change=${this._entityChanged}>
            ${!inList ? html`<option value="${current}" selected>${current || '— select —'}</option>` : ''}
            ${this.entities.map(e => html`
              <option value="${e}" ?selected=${e === current}>${e}</option>
            `)}
          </select>
        </div>

        <h3>Settings</h3>
        <div>
          <label class="field-label">Max. items</label>
          <input type="number" min="1" max="25"
            .value=${this._config.max_items ?? 10}
            data-config-value="max_items"
            @change=${this._numberChanged}>
        </div>

        <div class="option">
          <label>Hide header</label>
          <ha-switch
            .checked=${this._config.hide_header === true}
            data-config-value="hide_header"
            @change=${this._switchChanged}>
          </ha-switch>
        </div>

        <h3>Appearance</h3>
        <div>
          <label class="field-label">Theme</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            ${SKINS.map(s => html`
              <option value="${s}" ?selected=${(this._config.skin || 'dark') === s}>${s}</option>
            `)}
          </select>
        </div>

        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            ${LANGS.map(l => html`
              <option value="${l === 'auto' ? '' : l}" ?selected=${(this._config.language || '') === (l === 'auto' ? '' : l)}>
                ${l}
              </option>
            `)}
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define("soccer-live-cannonieri-editor", CalcioLiveCannonieriCardEditor);
