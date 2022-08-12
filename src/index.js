import { LocalizeDirective } from "./localize-directive";
import * as directives from "./directives";
import { directive } from "lit/directive.js";

export * from "./directives";

class UniversalLocalizeDirective extends LocalizeDirective {
  getTranslation() {
    const componentName = this.__element.tagName.toLowerCase();

    switch (componentName) {
      case "vaadin-app-layout":
        return directives.getAppLayoutTranslation();
      case "vaadin-avatar":
        return directives.getAvatarTranslation();
      case "vaadin-avatar-group":
        return directives.getAvatarGroupTranslation();
      case "vaadin-crud":
        return directives.getCrudTranslation();
      case "vaadin-date-picker":
        return directives.getDatePickerTranslation();
      case "vaadin-date-time-picker":
        return directives.getDateTimePickerTranslation();
      case "vaadin-login-form":
        return directives.getLoginTranslation();
      case "vaadin-login-overlay":
        return directives.getLoginTranslation();
      case "vaadin-menu-bar":
        return directives.getMenuBarTranslation();
      case "vaadin-message-input":
        return directives.getMessageInputTranslation();
      case "vaadin-multi-select-combo-box":
        return directives.getMultiSelectComboBoxTranslation();
      case "vaadin-password-field":
        return directives.getPasswordFieldTranslation();
      case "vaadin-rich-text-editor":
        return directives.getRichTextEditorTranslation();
      case "vaadin-upload":
        return directives.getUploadTranslation();
      default:
        console.warn(
          `localize directive was used in an unsupported component: ${componentName}`
        );
        return {};
    }
  }
}

export const localize = directive(UniversalLocalizeDirective);
