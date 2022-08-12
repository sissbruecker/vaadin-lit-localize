import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/avatar";
import { localizeAvatar } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-avatar.anonymous': `Anonym`,
  },
};

describe("localizeAvatar", () => {
  let avatar;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    avatar = await fixture(html`
      <vaadin-avatar ${localizeAvatar()}></vaadin-avatar>
    `);
  });

  it("should use default i18n values", () => {
    expect(avatar.i18n.anonymous).to.equal("anonymous");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(avatar.i18n.anonymous).to.equal("Anonym");
  });
});
