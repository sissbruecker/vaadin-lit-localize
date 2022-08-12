const fs = require("fs");
const {JSDOM} = require("jsdom");

// Prepare JSDOM instance, load bundle containing shims and Vaadin components
const dom = new JSDOM(``, {runScripts: "outside-only"});
const shimsBundle = fs.readFileSync("shims.bundle.js", "utf8");
const componentsBundle = fs.readFileSync("components.bundle.js", "utf8");
dom.window.eval(shimsBundle);
dom.window.eval(componentsBundle);

function isObject(value) {
  return !!value && value.constructor === Object;
}

function isArray(value) {
  return !!value && value.constructor === Array;
}

function generateMessageInstruction(messageId, defaultValue) {
  return `msg('${defaultValue}', { id: '${messageId}' })`;
}

function localizeI18n(prefix, value) {
  if (isObject(value)) {
    const result = {};
    Object.keys(value).forEach((property) => {
      const propertyValue = value[property];
      const localizedPropertyValue = localizeI18n(
        `${prefix}.${property}`,
        propertyValue
      );
      if (localizedPropertyValue) {
        result[property] = localizedPropertyValue;
      }
    });
    return result;
  } else if (isArray(value)) {
    return value.map((item, index) => {
      return localizeI18n(`${prefix}.${index}`, item);
    });
  } else if (typeof value === "string") {
    return generateMessageInstruction(prefix, value);
  }
}

function generateLocalizationJson(componentClass, messagePrefix) {
  let defaultI18n = dom.window.eval(`new components.${componentClass}().i18n`);
  defaultI18n = JSON.parse(JSON.stringify(defaultI18n));
  const localizedI18n = localizeI18n(messagePrefix, defaultI18n);

  return JSON.stringify(localizedI18n, null, 2);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderDirectiveCode(directive) {
  const directiveClassName = `${capitalizeFirstLetter(directive.name)}Directive`;
  const localizationJson = generateLocalizationJson(
    directive.component,
    directive.prefix
  );
  // Remove quotes to turn json into actual JS expressions
  const localizationCode = localizationJson.replaceAll('"', "");
  return `export class ${directiveClassName} extends LocalizeDirective {
  getLocalization() {
    return ${localizationCode}
  }
}

export const ${directive.name} = directive(${directiveClassName});
`;
}

function run() {
  const directives = [
    {
      name: "localizeAppLayout",
      component: "AppLayout",
      prefix: "vaadin-app-layout",
    },
    {
      name: "localizeAvatar",
      component: "Avatar",
      prefix: "vaadin-avatar",
    },
    {
      name: "localizeAvatarGroup",
      component: "AvatarGroup",
      prefix: "vaadin-avatar-group",
    },
    {
      name: "localizeCrud",
      component: "Crud",
      prefix: "vaadin-crud",
    },
    {
      name: "localizeDatePicker",
      component: "DatePicker",
      prefix: "vaadin-date-picker",
    },
    // vaadin-date-time-picker combines i18n objects of vaadin-date-picker and vaadin-time-picker
    // since vaadin-time-picker doesn't have any translation we can get by with just generating
    // code for vaadin-date-picker again
    {
      name: "localizeDateTimePicker",
      component: "DatePicker",
      prefix: "vaadin-date-picker",
    },
    {
      name: "localizeLogin",
      component: "LoginForm",
      prefix: "vaadin-login",
    },
    {
      name: "localizeMenuBar",
      component: "MenuBar",
      prefix: "vaadin-menu-bar",
    },
    {
      name: "localizeMessageInput",
      component: "MessageInput",
      prefix: "vaadin-message-input",
    },
    {
      name: "localizeMultiSelectComboBox",
      component: "MultiSelectComboBox",
      prefix: "vaadin-multi-select-combo-box",
    },
    {
      name: "localizePasswordField",
      component: "PasswordField",
      prefix: "vaadin-password-field",
    },
    {
      name: "localizeRichTextEditor",
      component: "RichTextEditor",
      prefix: "vaadin-rich-text-editor",
    },
    {
      name: "localizeUpload",
      component: "Upload",
      prefix: "vaadin-upload",
    },
  ];

  const directivesCode = directives
    .map((directive) =>
      renderDirectiveCode(directive)
    )
    .join("\n");

  const generatedCode = `import { msg } from '@lit/localize';
import { directive } from 'lit/directive.js';
import { LocalizeDirective } from './localize-directive.js';

${directivesCode}`;

  fs.writeFileSync("src/directives.js", generatedCode, "utf8");
}

run();
