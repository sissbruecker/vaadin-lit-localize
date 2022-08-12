import { nothing } from "lit";
import { AsyncDirective } from "lit/async-directive.js";
import { PartType } from "lit/directive.js";

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

  update(part, [overrides]) {
    const hasLocaleChanged = this.__currentLocale !== this.__lastRenderedLocale;
    const hasOverridesChanged = overrides !== this.__previousOverrides;

    if (!hasLocaleChanged && !hasOverridesChanged) {
      return nothing;
    }

    this.__element = part.element;
    this.__lastRenderedLocale = this.__currentLocale;
    this.__previousOverrides = overrides;
    this.registerLocaleChangeHandler();
    this.refreshI18n(overrides);

    return nothing;
  }

  refreshI18n(overrides) {
    if (!this.__originalI18n) {
      this.__originalI18n = this.__element.i18n || {};
    }
    const translation = this.getTranslation();
    overrides = overrides || {};
    this.__element.i18n = {
      ...this.__originalI18n,
      ...translation,
      ...overrides,
    };
  }

  getTranslation() {
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
