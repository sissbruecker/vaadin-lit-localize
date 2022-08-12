import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/login/vaadin-login-form.js";
import { localizeLogin } from "../src/directives.js";

const germanLocale = {
  templates: {
    "vaadin-login.errorMessage.message": `Bitte prüfe ob Du den Benutzernamen oder das Passwort korrekt eingegeben hast`,
    "vaadin-login.errorMessage.title": `Benutzername oder Passwort sind nicht korrekt`,
    "vaadin-login.form.forgotPassword": `Passwort vergessen?`,
    "vaadin-login.form.password": `Passwort`,
    "vaadin-login.form.submit": `Anmelden`,
    "vaadin-login.form.title": `Login`,
    "vaadin-login.form.username": `Benutzername`,
  },
};

describe("localizeLoginForm", () => {
  let loginForm;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    loginForm = await fixture(html`
      <vaadin-login-form ${localizeLogin()}></vaadin-login-form>
    `);
  });

  it("should use default i18n values", () => {
    expect(loginForm.i18n.form.title).to.equal("Log in");
    expect(loginForm.i18n.form.password).to.equal("Password");
    expect(loginForm.i18n.errorMessage.title).to.equal("Incorrect username or password");
    expect(loginForm.i18n.errorMessage.message).to.equal("Check that you have entered the correct username and password and try again.");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(loginForm.i18n.form.title).to.equal("Login");
    expect(loginForm.i18n.form.password).to.equal("Passwort");
    expect(loginForm.i18n.errorMessage.title).to.equal("Benutzername oder Passwort sind nicht korrekt");
    expect(loginForm.i18n.errorMessage.message).to.equal("Bitte prüfe ob Du den Benutzernamen oder das Passwort korrekt eingegeben hast");
  });
});
