import "@vaadin/avatar";
import "@vaadin/avatar-group";
import "@vaadin/crud";
import "@vaadin/date-picker";
import "@vaadin/date-time-picker";
import "@vaadin/login/vaadin-login-form.js";
import "@vaadin/menu-bar";
import "@vaadin/message-input";
import "@vaadin/multi-select-combo-box";
import "@vaadin/password-field";
import "@vaadin/rich-text-editor";
import "@vaadin/select";
import "@vaadin/upload";
import { render, html, LitElement } from "lit";
import { configureLocalization } from "@lit/localize";
import { localize } from "../src";
import {
  sourceLocale,
  targetLocales,
  allLocales,
} from "./generated/locales.js";

const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./generated/locales/${locale}.js`),
});

const localeOptions = allLocales.map((locale) => ({
  label: locale,
  value: locale,
}));

class VaadinLitLocalizeDemo extends LitElement {
  static properties = {
    locale: { type: String, state: true },
  };

  constructor() {
    super();
    this.locale = getLocale();
  }

  handleChangeLocale(event) {
    const newLocale = event.detail.value;
    this.locale = newLocale;
    setLocale(newLocale);
  }

  render() {
    return html`
      <vaadin-select
        label="Select locale"
        .value="${this.locale}"
        .items="${localeOptions}"
        @value-changed="${this.handleChangeLocale}"
      ></vaadin-select>
      <br />
      <br />
      <vaadin-avatar ${localize()}></vaadin-avatar>
      <br />
      <vaadin-avatar-group
        .items=${[{}, {}, {}]}
        ${localize()}
      ></vaadin-avatar-group>
      <br />
      <vaadin-crud
        ${localize()}
        .items=${[
          { name: "Jane", email: "jane@example.com" },
          { name: "John", email: "john@example.com" },
        ]}
      >
      </vaadin-crud>
      <br />
      <vaadin-date-picker
        label="Localized Date Picker"
        ${localize()}
      ></vaadin-date-picker>
      <vaadin-date-time-picker
        label="Localized Date Time Picker"
        ${localize()}
      ></vaadin-date-time-picker>
      <br />
      <vaadin-login-form ${localize()}></vaadin-login-form>
      <br />
      <vaadin-menu-bar
        ${localize()}
        .items="${[
          { text: "Item 1" },
          { text: "Item 2" },
          { text: "Item 3" },
          { text: "Item 4" },
        ]}"
        style="width: 300px"
      ></vaadin-menu-bar>
      <br />
      <vaadin-message-input ${localize()}></vaadin-message-input>
      <br />
      <vaadin-multi-select-combo-box
        ${localize()}
        .items=${["Item 1", "Item 2", "Item 3"]}
        .selected-items=${["Item 1", "Item 2"]}
      ></vaadin-multi-select-combo-box>
      <br />
      <vaadin-password-field ${localize()}></vaadin-password-field>
      <br />
      <vaadin-rich-text-editor
        ${localize()}
      ></vaadin-rich-text-editor>
      <br />
      <vaadin-upload ${localize()} no-auto max-files="3"></vaadin-upload>
    `;
  }
}

customElements.define("vaadin-lit-localize-demo", VaadinLitLocalizeDemo);

render(
  html` <vaadin-lit-localize-demo></vaadin-lit-localize-demo>`,
  document.getElementById("container")
);
