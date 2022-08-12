import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/multi-select-combo-box";
import { localize, localizeMultiSelectComboBox } from "../src";

const germanLocale = {
  templates: {
    "vaadin-multi-select-combo-box.cleared": `Auswahl gelöscht`,
    "vaadin-multi-select-combo-box.deselected": `aus der Auswahl entfernt`,
    "vaadin-multi-select-combo-box.focused": `fokussiert. Drücke Rücktaste zum Löschen`,
    "vaadin-multi-select-combo-box.selected": `zur Auswahl hinzugefügt`,
    "vaadin-multi-select-combo-box.total": `{count} Einträge ausgewählt`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeMultiSelectComboBox", localizeMultiSelectComboBox],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let multiSelectComboBox;

    before(async () => {
      multiSelectComboBox = await fixture(html`
        <vaadin-multi-select-combo-box
          ${directiveFn()}
        ></vaadin-multi-select-combo-box>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(multiSelectComboBox.i18n.cleared).to.equal("Selection cleared");
      expect(multiSelectComboBox.i18n.total).to.equal("{count} items selected");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(multiSelectComboBox.i18n.cleared).to.equal("Auswahl gelöscht");
      expect(multiSelectComboBox.i18n.total).to.equal(
        "{count} Einträge ausgewählt"
      );
    });
  });
});
