import "@vaadin/avatar";
import "@vaadin/avatar-group";
import "@vaadin/crud";
import "@vaadin/date-picker";
import "@vaadin/login/vaadin-login-form.js";
import "@vaadin/menu-bar";
import "@vaadin/message-input";
import "@vaadin/select";
import "@vaadin/upload";
import { render, html, LitElement } from "lit";
import { configureLocalization } from "@lit/localize";
import {
  localizeAvatar,
  localizeAvatarGroup,
  localizeCrud,
  localizeDatePicker,
  localizeLogin,
  localizeMenuBar,
  localizeMessageInput,
  localizeUpload,
} from "../src/directives";
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
      <vaadin-avatar ${localizeAvatar()}></vaadin-avatar>
      <br />
      <vaadin-avatar-group
        .items=${[{}, {}, {}]}
        ${localizeAvatarGroup()}
      ></vaadin-avatar-group>
      <br />
      <vaadin-crud
        ${localizeCrud()}
        .items=${[
          { name: "Jane", email: "jane@example.com" },
          { name: "John", email: "john@example.com" },
        ]}
      >
      </vaadin-crud>
      <br />
      <vaadin-date-picker
        label="Localized Date Picker"
        ${localizeDatePicker()}
      ></vaadin-date-picker>
      <br />
      <vaadin-login-form ${localizeLogin()}></vaadin-login-form>
      <br />
      <vaadin-menu-bar
        ${localizeMenuBar()}
        .items="${[
          { text: "Item 1" },
          { text: "Item 2" },
          { text: "Item 3" },
          { text: "Item 4" },
        ]}"
        style="width: 300px"
      ></vaadin-menu-bar>
      <br />
      <vaadin-message-input ${localizeMessageInput()}></vaadin-message-input>
      <br />
      <vaadin-upload ${localizeUpload()} no-auto max-files="3"></vaadin-upload>
    `;
  }
}

customElements.define("vaadin-lit-localize-demo", VaadinLitLocalizeDemo);

render(
  html` <vaadin-lit-localize-demo></vaadin-lit-localize-demo>`,
  document.getElementById("container")
);
