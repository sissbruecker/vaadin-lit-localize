import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/message-input";
import { localize, localizeMessageInput } from "../src";

const germanLocale = {
  templates: {
    "vaadin-message-input.message": `Nachricht`,
    "vaadin-message-input.send": `Senden`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeMessageInput", localizeMessageInput],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let messageInput;

    before(async () => {
      messageInput = await fixture(html`
        <vaadin-message-input ${directiveFn()}></vaadin-message-input>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(messageInput.i18n.message).to.equal("Message");
      expect(messageInput.i18n.send).to.equal("Send");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(messageInput.i18n.message).to.equal("Nachricht");
      expect(messageInput.i18n.send).to.equal("Senden");
    });
  });
});
