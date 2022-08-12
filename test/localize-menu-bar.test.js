import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/menu-bar";
import { localize, localizeMenuBar } from "../src";

const germanLocale = {
  templates: {
    "vaadin-menu-bar.moreOptions": `Weitere Optionen`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeMenuBar", localizeMenuBar],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let menuBar;

    before(async () => {
      menuBar = await fixture(html`
        <vaadin-menu-bar ${directiveFn()}></vaadin-menu-bar>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(menuBar.i18n.moreOptions).to.equal("More options");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(menuBar.i18n.moreOptions).to.equal("Weitere Optionen");
    });
  });
});
