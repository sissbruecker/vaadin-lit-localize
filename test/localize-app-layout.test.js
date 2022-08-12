import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/app-layout";
import { localize, localizeAppLayout } from "../src";

const germanLocale = {
  templates: {
    "vaadin-app-layout.drawer": `Menuleiste`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeAppLayout", localizeAppLayout],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let appLayout;

    before(async () => {
      appLayout = await fixture(html`
        <vaadin-app-layout ${directiveFn()}></vaadin-app-layout>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(appLayout.i18n.drawer).to.equal("Drawer");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(appLayout.i18n.drawer).to.equal("Menuleiste");
    });
  });
});
