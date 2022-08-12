import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/crud";
import { localize, localizeCrud } from "../src";

const germanLocale = {
  templates: {
    "vaadin-crud.cancel": `Abbrechen`,
    "vaadin-crud.confirm.cancel.button.confirm": `Verwerfen`,
    "vaadin-crud.confirm.cancel.button.dismiss": `Abbrechen`,
    "vaadin-crud.confirm.cancel.content": `Es gibt nicht gespeicherte Änderungen.`,
    "vaadin-crud.confirm.cancel.title": `Änderungen verwerfen`,
    "vaadin-crud.confirm.delete.button.confirm": `Löschen`,
    "vaadin-crud.confirm.delete.button.dismiss": `Abbrechen`,
    "vaadin-crud.confirm.delete.content": `Bist du sicher das du den Eintrag löschen willst?`,
    "vaadin-crud.confirm.delete.title": `Eintrag löschen`,
    "vaadin-crud.deleteItem": `Löschen...`,
    "vaadin-crud.editItem": `Bearbeiten`,
    "vaadin-crud.editLabel": `Editieren`,
    "vaadin-crud.newItem": `Neu`,
    "vaadin-crud.saveItem": `Speichern`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeCrud", localizeCrud],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let crud;

    before(async () => {
      crud = await fixture(html`
        <vaadin-crud ${directiveFn()}></vaadin-crud>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(crud.i18n.newItem).to.equal("New item");
      expect(crud.i18n.deleteItem).to.equal("Delete...");
      expect(crud.i18n.confirm.cancel.title).to.equal("Discard changes");
      expect(crud.i18n.confirm.cancel.button.confirm).to.equal("Discard");
      expect(crud.i18n.confirm.delete.title).to.equal("Delete item");
      expect(crud.i18n.confirm.delete.button.confirm).to.equal("Delete");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(crud.i18n.newItem).to.equal("Neu");
      expect(crud.i18n.deleteItem).to.equal("Löschen...");
      expect(crud.i18n.confirm.cancel.title).to.equal("Änderungen verwerfen");
      expect(crud.i18n.confirm.cancel.button.confirm).to.equal("Verwerfen");
      expect(crud.i18n.confirm.delete.title).to.equal("Eintrag löschen");
      expect(crud.i18n.confirm.delete.button.confirm).to.equal("Löschen");
    });
  });
});
