import { configureLocalization } from "@lit/localize";
import { html, fixture, expect } from "@open-wc/testing";
import "@vaadin/upload";
import { localize, localizeUpload } from "../src";

const germanLocale = {
  templates: {
    "vaadin-upload.addFiles.many": `Dateien hochladen...`,
    "vaadin-upload.addFiles.one": `Datei hochladen...`,
    "vaadin-upload.dropFiles.many": `Dateien hierher ziehen`,
    "vaadin-upload.dropFiles.one": `Datei hierher ziehen`,
    "vaadin-upload.error.fileIsTooBig": `Datei ist zu groß`,
    "vaadin-upload.error.incorrectFileType": `Ungültige Dateiart`,
    "vaadin-upload.error.tooManyFiles": `Zuviele Dateien`,
    "vaadin-upload.file.remove": `Entfernen`,
    "vaadin-upload.file.retry": `Wiederholen`,
    "vaadin-upload.file.start": `Start`,
    "vaadin-upload.units.size.0": `B`,
    "vaadin-upload.units.size.1": `kB`,
    "vaadin-upload.units.size.2": `MB`,
    "vaadin-upload.units.size.3": `GB`,
    "vaadin-upload.units.size.4": `TB`,
    "vaadin-upload.units.size.5": `PB`,
    "vaadin-upload.units.size.6": `EB`,
    "vaadin-upload.units.size.7": `ZB`,
    "vaadin-upload.units.size.8": `YB`,
    "vaadin-upload.uploading.error.forbidden": `Upload fehlgeschlagen, bitte versuche es später noch einmal`,
    "vaadin-upload.uploading.error.serverUnavailable": `Upload fehlgeschlagen, bitte versuche es später noch einmal`,
    "vaadin-upload.uploading.error.unexpectedServerError": `Upload fehlgeschlagen, bitte versuche es später noch einmal`,
    "vaadin-upload.uploading.remainingTime.prefix": `verbleibende Zeit: `,
    "vaadin-upload.uploading.remainingTime.unknown": `verbleibende Zeit kann nicht ermittelt werden`,
    "vaadin-upload.uploading.status.connecting": `Verbinden`,
    "vaadin-upload.uploading.status.held": `In Warteschlange`,
    "vaadin-upload.uploading.status.processing": `Verarbeite Datei...`,
    "vaadin-upload.uploading.status.stalled": `Angehalten`,
  },
};

const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve(germanLocale),
});

[
  ["localize", localize],
  ["localizeUpload", localizeUpload],
].forEach((directive) => {
  const [directiveName, directiveFn] = directive;
  describe(directiveName, () => {
    let upload;

    before(async () => {
      upload = await fixture(html`
        <vaadin-upload ${directiveFn()}></vaadin-upload>
      `);
    });

    after(async () => {
      await localization.setLocale("en");
    });

    it("should use default i18n values", () => {
      expect(upload.i18n.addFiles.one).to.equal("Upload File...");
      expect(upload.i18n.dropFiles.one).to.equal("Drop file here");
      expect(upload.i18n.error.tooManyFiles).to.equal("Too Many Files.");
      expect(upload.i18n.error.incorrectFileType).to.equal(
        "Incorrect File Type."
      );
      expect(upload.i18n.file.remove).to.equal("Remove");
      expect(upload.i18n.file.start).to.equal("Start");
      expect(upload.i18n.units.size[0]).to.equal("B");
      expect(upload.i18n.units.size[5]).to.equal("PB");
      expect(upload.i18n.uploading.error.unexpectedServerError).to.equal(
        "Upload failed due to server error"
      );
      expect(upload.i18n.uploading.remainingTime.prefix).to.equal(
        "remaining time: "
      );
      expect(upload.i18n.uploading.status.connecting).to.equal("Connecting...");
      expect(upload.i18n.uploading.status.processing).to.equal(
        "Processing File..."
      );
    });

    it("should use localized i18n values when changing locale", async () => {
      await localization.setLocale("de");

      expect(upload.i18n.addFiles.one).to.equal("Datei hochladen...");
      expect(upload.i18n.dropFiles.one).to.equal("Datei hierher ziehen");
      expect(upload.i18n.error.tooManyFiles).to.equal("Zuviele Dateien");
      expect(upload.i18n.error.incorrectFileType).to.equal(
        "Ungültige Dateiart"
      );
      expect(upload.i18n.file.remove).to.equal("Entfernen");
      expect(upload.i18n.file.start).to.equal("Start");
      expect(upload.i18n.units.size[0]).to.equal("B");
      expect(upload.i18n.units.size[5]).to.equal("PB");
      expect(upload.i18n.uploading.error.unexpectedServerError).to.equal(
        "Upload fehlgeschlagen, bitte versuche es später noch einmal"
      );
      expect(upload.i18n.uploading.remainingTime.prefix).to.equal(
        "verbleibende Zeit: "
      );
      expect(upload.i18n.uploading.status.connecting).to.equal("Verbinden");
      expect(upload.i18n.uploading.status.processing).to.equal(
        "Verarbeite Datei..."
      );
    });
  });
});
