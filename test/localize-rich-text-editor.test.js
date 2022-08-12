import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/rich-text-editor";
import { localizeRichTextEditor } from "../src/directives.js";

const germanLocale = {
  templates: {
    "vaadin-rich-text-editor.alignCenter": `Mittig anordnen`,
    "vaadin-rich-text-editor.alignLeft": `Links anordnen`,
    "vaadin-rich-text-editor.alignRight": `Rechts anordnen`,
    "vaadin-rich-text-editor.blockquote": `Zitat`,
    "vaadin-rich-text-editor.bold": `Fett`,
    "vaadin-rich-text-editor.cancel": `Abbrechen`,
    "vaadin-rich-text-editor.clean": `Format löschen`,
    "vaadin-rich-text-editor.codeBlock": `Code Block`,
    "vaadin-rich-text-editor.h1": `h1`,
    "vaadin-rich-text-editor.h2": `h2`,
    "vaadin-rich-text-editor.h3": `h3`,
    "vaadin-rich-text-editor.image": `Bild`,
    "vaadin-rich-text-editor.italic": `Kursiv`,
    "vaadin-rich-text-editor.link": `Link`,
    "vaadin-rich-text-editor.linkDialogTitle": `Link Adresse`,
    "vaadin-rich-text-editor.listBullet": `Ungeordnete Liste`,
    "vaadin-rich-text-editor.listOrdered": `Geordnete Liste`,
    "vaadin-rich-text-editor.ok": `OK`,
    "vaadin-rich-text-editor.redo": `Wiederholen`,
    "vaadin-rich-text-editor.remove": `Entfernen`,
    "vaadin-rich-text-editor.strike": `Durchgestrichen`,
    "vaadin-rich-text-editor.subscript": `Tiefgestellt`,
    "vaadin-rich-text-editor.superscript": `Hochgestellt`,
    "vaadin-rich-text-editor.underline": `Unterstrichen`,
    "vaadin-rich-text-editor.undo": `Rückgängig`,
  },
};

describe("localizeRichTextEditor", () => {
  let richTextEditor;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    richTextEditor = await fixture(html`
      <vaadin-rich-text-editor
        ${localizeRichTextEditor()}
      ></vaadin-rich-text-editor>
    `);
  });

  it("should use default i18n values", () => {
    expect(richTextEditor.i18n.alignCenter).to.equal("align center");
    expect(richTextEditor.i18n.strike).to.equal("strike");
    expect(richTextEditor.i18n.codeBlock).to.equal("code block");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(richTextEditor.i18n.alignCenter).to.equal("Mittig anordnen");
    expect(richTextEditor.i18n.strike).to.equal("Durchgestrichen");
    expect(richTextEditor.i18n.codeBlock).to.equal("Code Block");
  });
});
