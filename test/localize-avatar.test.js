import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/avatar";
import { localize, localizeAvatar } from "../src";

const germanLocale = {
  templates: {
    "vaadin-avatar.anonymous": `Anonym`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeAvatar", localizeAvatar],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let avatar;

    before(async () => {
      avatar = await fixture(html`
        <vaadin-avatar ${directiveFn()}></vaadin-avatar>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(avatar.i18n.anonymous).to.equal("anonymous");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(avatar.i18n.anonymous).to.equal("Anonym");
    });
  });
});
