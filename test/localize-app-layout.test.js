import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/app-layout";
import { localizeAppLayout } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-app-layout.drawer': `Menuleiste`,
  },
};

describe("localizeAppLayout", () => {
  let appLayout;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    appLayout = await fixture(html`
      <vaadin-avatar ${localizeAppLayout()}></vaadin-avatar>
    `);
  });

  it("should use default i18n values", () => {
    expect(appLayout.i18n.drawer).to.equal("Drawer");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(appLayout.i18n.drawer).to.equal("Menuleiste");
  });
});
