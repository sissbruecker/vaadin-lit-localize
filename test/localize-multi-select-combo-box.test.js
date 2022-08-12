import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/multi-select-combo-box";
import { localizeMultiSelectComboBox } from "../src/directives.js";

const germanLocale = {
  templates: {
    'vaadin-multi-select-combo-box.cleared': `Auswahl gelöscht`,
    'vaadin-multi-select-combo-box.deselected': `aus der Auswahl entfernt`,
    'vaadin-multi-select-combo-box.focused': `fokussiert. Drücke Rücktaste zum Löschen`,
    'vaadin-multi-select-combo-box.selected': `zur Auswahl hinzugefügt`,
    'vaadin-multi-select-combo-box.total': `{count} Einträge ausgewählt`,
  },
};

describe("localizeMultiSelectComboBox", () => {
  let multiSelectComboBox;
  let localization;

  before(async () => {
    localization = configureLocalization({
      sourceLocale: "en",
      targetLocales: ["de"],
      loadLocale: () => Promise.resolve(germanLocale),
    });
    multiSelectComboBox = await fixture(html`
      <vaadin-multi-select-combo-box ${localizeMultiSelectComboBox()}></vaadin-multi-select-combo-box>
    `);
  });

  it("should use default i18n values", () => {
    expect(multiSelectComboBox.i18n.cleared).to.equal("Selection cleared");
    expect(multiSelectComboBox.i18n.total).to.equal("{count} items selected");
  });

  it("should use localized i18n values when changing locale", async () => {
    await localization.setLocale("de");

    expect(multiSelectComboBox.i18n.cleared).to.equal("Auswahl gelöscht");
    expect(multiSelectComboBox.i18n.total).to.equal("{count} Einträge ausgewählt");
  });
});
