import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/menu-bar";
import { localizeMenuBar } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-menu-bar.moreOptions': `Weitere Optionen`,
  },
};

describe("localizeMenuBar", () => {
  let menuBar;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    menuBar = await fixture(html`
      <vaadin-menu-bar ${localizeMenuBar()}></vaadin-menu-bar>
    `);
  });

  it("should use default i18n values", () => {
    expect(menuBar.i18n.moreOptions).to.equal("More options");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(menuBar.i18n.moreOptions).to.equal("Weitere Optionen");
  });
});
