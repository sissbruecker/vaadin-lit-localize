import { nothing } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { PartType } from 'lit/directive.js';

export class LocalizeDirective extends AsyncDirective {
  constructor(part) {
    super(part);

    if (part.type !== PartType.ELEMENT) {
      throw new Error(
        `\`${this.constructor.name}\` must be bound to an element.`
      );
    }

    this.__currentLocale = "__initial__";
  }

  render() {
    return nothing;
  }

  update(part) {
    if (this.__currentLocale === this.__lastRenderedLocale) return nothing;

    this.__element = part.element;
    this.__lastRenderedLocale = this.__currentLocale;
    this.registerLocaleChangeHandler();
    this.refreshI18n();

    return nothing;
  }

  refreshI18n() {
    const localization = this.getLocalization();
    this.__element.i18n = {
      ...this.__element.i18n,
      ...localization,
    };
  }

  getLocalization() {
    throw new Error("getLocalization must be implemented by sub-class");
  }

  reconnected() {
    this.registerLocaleChangeHandler();
  }

  disconnected() {
    this.unregisterLocaleChangeHandler();
  }

  registerLocaleChangeHandler() {
    if (this.__localeChangedHandler) return;
    this.__localeChangedHandler = (e) => {
      if (e.detail.status === "ready") {
        this.__currentLocale = e.detail.readyLocale;
        this.refreshI18n();
      }
    };
    window.addEventListener("lit-localize-status", this.__localeChangedHandler);
  }

  unregisterLocaleChangeHandler() {
    window.removeEventListener(
      "lit-localize-status",
      this.__localeChangedHandler
    );
    this.__localeChangedHandler = null;
  }
}
