import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/password-field";
import { localizePasswordField } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-password-field.reveal': `Passwort anzeigen`,
  },
};

describe("localizePasswordField", () => {
  let passwordField;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    passwordField = await fixture(html`
      <vaadin-password-field ${localizePasswordField()}></vaadin-password-field>
    `);
  });

  it("should use default i18n values", () => {
    expect(passwordField.i18n.reveal).to.equal("Show password");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(passwordField.i18n.reveal).to.equal("Passwort anzeigen");
  });
});
