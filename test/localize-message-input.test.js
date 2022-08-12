import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/message-input";
import { localizeMessageInput } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-message-input.message': `Nachricht`,
    'vaadin-message-input.send': `Senden`,
  },
};

describe("localizeMessageInput", () => {
  let messageInput;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    messageInput = await fixture(html`
      <vaadin-message-input ${localizeMessageInput()}></vaadin-message-input>
    `);
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
