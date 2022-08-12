import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/login/vaadin-login-form.js";
import "@vaadin/login/vaadin-login-overlay.js";
import { localize, localizeLogin } from "../src";

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

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeLogin", localizeLogin],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    after(async () => {
      await localization.setLocale("en");
    });

    describe("LoginOverlay", () => {
      let loginOverlay;

      before(async () => {
        loginOverlay = await fixture(html`
          <vaadin-login-overlay ${directiveFn()}></vaadin-login-overlay>
        `);
      });

      after(async () => {
        await localization.setLocale("en");
      });

      it("should use default i18n values", () => {
        expect(loginOverlay.i18n.form.title).to.equal("Log in");
        expect(loginOverlay.i18n.form.password).to.equal("Password");
        expect(loginOverlay.i18n.errorMessage.title).to.equal(
          "Incorrect username or password"
        );
        expect(loginOverlay.i18n.errorMessage.message).to.equal(
          "Check that you have entered the correct username and password and try again."
        );
      });

      it("should use localized i18n values when changing locale", async () => {
        await localization.setLocale("de");

        expect(loginOverlay.i18n.form.title).to.equal("Login");
        expect(loginOverlay.i18n.form.password).to.equal("Passwort");
        expect(loginOverlay.i18n.errorMessage.title).to.equal(
          "Benutzername oder Passwort sind nicht korrekt"
        );
        expect(loginOverlay.i18n.errorMessage.message).to.equal(
          "Bitte prüfe ob Du den Benutzernamen oder das Passwort korrekt eingegeben hast"
        );
      });
    });

    describe("LoginForm", () => {
      let loginForm;

      before(async () => {
        loginForm = await fixture(html`
          <vaadin-login-form ${directiveFn()}></vaadin-login-form>
        `);
      });

      after(async () => {
        await localization.setLocale("en");
      });

      it("should use default i18n values", () => {
        expect(loginForm.i18n.form.title).to.equal("Log in");
        expect(loginForm.i18n.form.password).to.equal("Password");
        expect(loginForm.i18n.errorMessage.title).to.equal(
          "Incorrect username or password"
        );
        expect(loginForm.i18n.errorMessage.message).to.equal(
          "Check that you have entered the correct username and password and try again."
        );
      });

      it("should use localized i18n values when changing locale", async () => {
        await localization.setLocale("de");

        expect(loginForm.i18n.form.title).to.equal("Login");
        expect(loginForm.i18n.form.password).to.equal("Passwort");
        expect(loginForm.i18n.errorMessage.title).to.equal(
          "Benutzername oder Passwort sind nicht korrekt"
        );
        expect(loginForm.i18n.errorMessage.message).to.equal(
          "Bitte prüfe ob Du den Benutzernamen oder das Passwort korrekt eingegeben hast"
        );
      });
    });
  });
});
