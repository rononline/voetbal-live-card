import { LitElement, html, css } from 'lit';

class CalcioLiveClassificaCardEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      entities: { type: Array },
      groups: { type: Array },
    };
  }

  constructor() {
    super();
    this.entities = [];
    this.groups = [];
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

  get config() { return this._config; }

  updated(changedProperties) {
    if (changedProperties.has('hass')) {
      this._fetchEntities();
    }
    if ((changedProperties.has('_config') || changedProperties.has('hass')) && this._config && this._config.entity) {
      this._fetchGroups();
    }
  }

  _fireConfigChanged(newConfig) {
    this._config = newConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate();
  }

  _entityChanged(ev) {
    if (!this._config) return;
    const value = ev.target.value;
    if (value === this._config.entity) return;
    this._fireConfigChanged({ ...this._config, entity: value });
  }

  _groupChanged(ev) {
    if (!this._config) return;
    const value = ev.target.value;
    if (value === this._config.selected_group) return;
    this._fireConfigChanged({ ...this._config, selected_group: value });
  }

  _switchChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    if (!target.dataset || !target.dataset.configValue) return;
    const key = target.dataset.configValue;
    const value = target.checked;
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  _selectChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    if (!target.dataset || !target.dataset.configValue) return;
    const key = target.dataset.configValue;
    const value = target.value;
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  _numberChanged(ev) {
    if (!this._config) return;
    const target = ev.target;
    if (!target.dataset || !target.dataset.configValue) return;
    const key = target.dataset.configValue;
    const value = parseInt(target.value, 10);
    if (isNaN(value)) return;
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  _fetchEntities() {
    if (!this.hass) return;
    this.entities = Object.keys(this.hass.states)
      .filter((entityId) => entityId.startsWith('sensor.soccerlive_classifica'))
      .sort();
  }

  _fetchGroups() {
    const entityId = this._config && this._config.entity;
    if (!this.hass || !entityId) {
      this.groups = [];
      return;
    }
    const stateObj = this.hass.states[entityId];
    if (stateObj && stateObj.attributes && stateObj.attributes.standings_groups) {
      this.groups = stateObj.attributes.standings_groups.map(g => g.name);
    } else {
      this.groups = [];
    }
  }

  render() {
    if (!this._config || !this.hass) return html``;
    const currentEntity = this._config.entity || '';
    const entityInList = currentEntity && this.entities.includes(currentEntity);

    return html`
      <div class="card-config">
        <h3>Sensor</h3>
        <div>
          <label class="field-label">Entity</label>
          <select @change=${this._entityChanged}>
            ${!entityInList ? html`<option value="${currentEntity}" selected>${currentEntity || '— select —'}</option>` : ''}
            ${this.entities.map(e => html`
              <option value="${e}" ?selected=${e === currentEntity}>${e}</option>
            `)}
          </select>
        </div>

        <h3>Settings</h3>
        <div>
          <label class="field-label">Group</label>
          <select @change=${this._groupChanged}>
            <option value="" ?selected=${!this._config.selected_group}>— All —</option>
            ${this.groups.map(g => html`
              <option value="${g}" ?selected=${g === this._config.selected_group}>${g}</option>
            `)}
          </select>
        </div>

        <div class="option">
          <label>Hide Header</label>
          <ha-switch
            .checked=${this._config.hide_header === true}
            data-config-value="hide_header"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div class="option">
          <label>Show Event Toasts (in-card)</label>
          <ha-switch
            .checked=${this._config.show_event_toasts === true}
            data-config-value="show_event_toasts"
            @change=${this._switchChanged}
          ></ha-switch>
        </div>

        <div>
          <label class="field-label">Max Teams Visible</label>
          <input type="number" min="1" max="50"
            .value=${this._config.max_teams_visible || 10}
            data-config-value="max_teams_visible" @change=${this._numberChanged} />
        </div>

        <div>
          <label class="field-label">Uitgelicht team (my_team)</label>
          <input type="text" placeholder="bijv. Feyenoord Rotterdam"
            .value=${this._config.highlight_team || this._config.my_team || ''}
            @change=${(e) => this._fireConfigChanged({...this._config, highlight_team: e.target.value, my_team: e.target.value})} />
        </div>

        <div class="option">
          <label>Seizoenstotalen tonen</label>
          <ha-switch .checked=${this._config.show_stats !== false}
            data-config-value="show_stats" @change=${this._switchChanged}></ha-switch>
        </div>
        <div class="option">
          <label>Doelpunten per team tonen</label>
          <ha-switch .checked=${this._config.show_goals_for === true}
            data-config-value="show_goals_for" @change=${this._switchChanged}></ha-switch>
        </div>

        <div class="option">
          <label>Compact modus</label>
          <ha-switch .checked=${this._config.compact_mode === true}
            data-config-value="compact_mode" @change=${this._switchChanged}></ha-switch>
        </div>

        ${this._config.compact_mode ? html`
          <div>
            <label class="field-label">Top N teams</label>
            <input type="number" min="1" max="20"
              .value=${this._config.compact_top || 5}
              data-config-value="compact_top" @change=${this._numberChanged} />
          </div>
          <div>
            <label class="field-label">Bottom N teams</label>
            <input type="number" min="1" max="10"
              .value=${this._config.compact_bottom || 3}
              data-config-value="compact_bottom" @change=${this._numberChanged} />
          </div>
        ` : ''}
        <div>
          <label class="field-label">Skin</label>
          <select data-config-value="skin" @change=${this._selectChanged}>
            <option value="dark"       ?selected=${(this._config.skin || 'dark') === 'dark'}>Dark (standaard)</option>
            <option value="light"      ?selected=${this._config.skin === 'light'}>Light</option>
            <option value="feyenoord"  ?selected=${this._config.skin === 'feyenoord'}>Feyenoord (rood)</option>
            <option value="classic"    ?selected=${this._config.skin === 'classic'}>Classic (groen)</option>
            <option value="neon"       ?selected=${this._config.skin === 'neon'}>Neon</option>
            <option value="gold"       ?selected=${this._config.skin === 'gold'}>Gold</option>
          </select>
        </div>
        <div>
          <label class="field-label">Language</label>
          <select data-config-value="language" @change=${this._selectChanged}>
            <option value="" ?selected=${!this._config.language}>Auto (HA locale)</option>
            <option value="en" ?selected=${this._config.language === 'en'}>English</option>
            <option value="it" ?selected=${this._config.language === 'it'}>Italiano</option>
            <option value="fr" ?selected=${this._config.language === 'fr'}>Français</option>
            <option value="es" ?selected=${this._config.language === 'es'}>Español</option>
            <option value="nl" ?selected=${this._config.language === 'nl'}>Nederlands</option>
            <option value="de" ?selected=${this._config.language === 'de'}>Deutsch</option>
            <option value="pt" ?selected=${this._config.language === 'pt'}>Português</option>
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define('soccer-live-classifica-editor', CalcioLiveClassificaCardEditor);
