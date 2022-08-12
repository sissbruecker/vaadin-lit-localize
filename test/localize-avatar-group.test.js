import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/avatar-group";
import { localize, localizeAvatarGroup } from "../src";

const germanLocale = {
  templates: {
    "vaadin-avatar-group.activeUsers.many": `Aktuell {count} aktive Nutzer`,
    "vaadin-avatar-group.activeUsers.one": `Aktuell ein aktiver Nutzer`,
    "vaadin-avatar-group.anonymous": `Anonym`,
    "vaadin-avatar-group.joined": `{user} ist der Sitzung beigetreten`,
    "vaadin-avatar-group.left": `{user} has die Sitzung verlassen`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeAvatarGroup", localizeAvatarGroup],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let avatarGroup;

    before(async () => {
      avatarGroup = await fixture(html`
        <vaadin-avatar-group ${directiveFn()}></vaadin-avatar-group>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(avatarGroup.i18n.anonymous).to.equal("anonymous");
      expect(avatarGroup.i18n.activeUsers.one).to.equal(
        "Currently one active user"
      );
      expect(avatarGroup.i18n.joined).to.equal("{user} joined");
      expect(avatarGroup.i18n.left).to.equal("{user} left");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(avatarGroup.i18n.anonymous).to.equal("Anonym");
      expect(avatarGroup.i18n.activeUsers.one).to.equal(
        "Aktuell ein aktiver Nutzer"
      );
      expect(avatarGroup.i18n.joined).to.equal(
        "{user} ist der Sitzung beigetreten"
      );
      expect(avatarGroup.i18n.left).to.equal(
        "{user} has die Sitzung verlassen"
      );
    });
  });
});
