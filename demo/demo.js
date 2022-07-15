import "@vaadin/date-picker";
import "@vaadin/select";
import "@vaadin/login/vaadin-login-form.js";
import { render, html, LitElement } from "lit";
import { configureLocalization } from "@lit/localize";
import { localizeDatePicker, localizeLogin } from "../src/directives";
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
      <vaadin-date-picker
        label="Localized Date Picker"
        ${localizeDatePicker()}
      ></vaadin-date-picker>
      <br />
      <vaadin-login-form ${localizeLogin()}></vaadin-login-form>
    `;
  }
}

customElements.define("vaadin-lit-localize-demo", VaadinLitLocalizeDemo);

render(
  html` <vaadin-lit-localize-demo></vaadin-lit-localize-demo>`,
  document.getElementById("container")
);
