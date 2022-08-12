import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/password-field";
import { localize, localizePasswordField } from "../src";

const germanLocale = {
  templates: {
    "vaadin-password-field.reveal": `Passwort anzeigen`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizePasswordField", localizePasswordField],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let passwordField;

    before(async () => {
      passwordField = await fixture(html`
        <vaadin-password-field
          ${directiveFn()}
        ></vaadin-password-field>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(passwordField.i18n.reveal).to.equal("Show password");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(passwordField.i18n.reveal).to.equal("Passwort anzeigen");
    });
  });
});
