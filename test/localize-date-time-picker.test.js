import { html, fixture, expect } from "@open-wc/testing";
import { configureLocalization } from "@lit/localize";
import "@vaadin/date-time-picker";
import { localize, localizeDateTimePicker } from "../src";

const germanLocale = {
  templates: {
    "vaadin-date-picker.calendar": `Kalender`,
    "vaadin-date-picker.cancel": `Abbrechen`,
    "vaadin-date-picker.monthNames.0": `Januar`,
    "vaadin-date-picker.monthNames.1": `Februar`,
    "vaadin-date-picker.monthNames.10": `November`,
    "vaadin-date-picker.monthNames.11": `Dezember`,
    "vaadin-date-picker.monthNames.2": `März`,
    "vaadin-date-picker.monthNames.3": `April`,
    "vaadin-date-picker.monthNames.4": `Mai`,
    "vaadin-date-picker.monthNames.5": `Juni`,
    "vaadin-date-picker.monthNames.6": `Juli`,
    "vaadin-date-picker.monthNames.7": `August`,
    "vaadin-date-picker.monthNames.8": `September`,
    "vaadin-date-picker.monthNames.9": `Oktober`,
    "vaadin-date-picker.today": `Heute`,
    "vaadin-date-picker.week": `Woche`,
    "vaadin-date-picker.weekdays.0": `Sonntag`,
    "vaadin-date-picker.weekdays.1": `Montag`,
    "vaadin-date-picker.weekdays.2": `Dienstag`,
    "vaadin-date-picker.weekdays.3": `Mittwoch`,
    "vaadin-date-picker.weekdays.4": `Donnerstag`,
    "vaadin-date-picker.weekdays.5": `Freitag`,
    "vaadin-date-picker.weekdays.6": `Samstag`,
    "vaadin-date-picker.weekdaysShort.0": `So`,
    "vaadin-date-picker.weekdaysShort.1": `Mo`,
    "vaadin-date-picker.weekdaysShort.2": `Di`,
    "vaadin-date-picker.weekdaysShort.3": `Mi`,
    "vaadin-date-picker.weekdaysShort.4": `Do`,
    "vaadin-date-picker.weekdaysShort.5": `Fr`,
    "vaadin-date-picker.weekdaysShort.6": `Sa`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeDateTimePicker", localizeDateTimePicker],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let dateTimePicker;

    before(async () => {
      dateTimePicker = await fixture(html`
        <vaadin-date-time-picker
          ${directiveFn()}
        ></vaadin-date-time-picker>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(dateTimePicker.i18n.week).to.equal("Week");
      expect(dateTimePicker.i18n.today).to.equal("Today");
      expect(dateTimePicker.i18n.monthNames[0]).to.equal("January");
      expect(dateTimePicker.i18n.monthNames[5]).to.equal("June");
      expect(dateTimePicker.i18n.weekdays[0]).to.equal("Sunday");
      expect(dateTimePicker.i18n.weekdays[5]).to.equal("Friday");
      expect(dateTimePicker.i18n.weekdaysShort[0]).to.equal("Sun");
      expect(dateTimePicker.i18n.weekdaysShort[5]).to.equal("Fri");
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(dateTimePicker.i18n.week).to.equal("Woche");
      expect(dateTimePicker.i18n.today).to.equal("Heute");
      expect(dateTimePicker.i18n.monthNames[0]).to.equal("Januar");
      expect(dateTimePicker.i18n.monthNames[5]).to.equal("Juni");
      expect(dateTimePicker.i18n.weekdays[0]).to.equal("Sonntag");
      expect(dateTimePicker.i18n.weekdays[5]).to.equal("Freitag");
      expect(dateTimePicker.i18n.weekdaysShort[0]).to.equal("So");
      expect(dateTimePicker.i18n.weekdaysShort[5]).to.equal("Fr");
    });
  });
});
