const fs = require("fs");
const { JSDOM } = require("jsdom");

// Prepare JSDOM instance, load bundle containing shims and Vaadin components
const dom = new JSDOM(``, { runScripts: "outside-only" });
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

function renderDirectiveCode(directiveName, componentClass, messagePrefix) {
  const localizationJson = generateLocalizationJson(
    componentClass,
    messagePrefix
  );
  // Remove quotes to turn json into actual JS expressions
  const localizationCode = localizationJson.replaceAll('"', "");
  return `export class ${componentClass}Directive extends LocalizeDirective {
  getLocalization() {
    return ${localizationCode}
  }
}

export const ${directiveName} = directive(${componentClass}Directive);
`;
}

function run() {
  const directives = [
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
      name: "localizeDatePicker",
      component: "DatePicker",
      prefix: "vaadin-date-picker",
    },
    {
      name: "localizeLogin",
      component: "LoginForm",
      prefix: "vaadin-login",
    },
    {
      name: "localizeUpload",
      component: "Upload",
      prefix: "vaadin-upload",
    },
  ];

  const directivesCode = directives
    .map((directive) =>
      renderDirectiveCode(directive.name, directive.component, directive.prefix)
    )
    .join("\n");

  const generatedCode = `import { msg } from '@lit/localize';
import { directive } from 'lit/directive.js';
import { LocalizeDirective } from './localize-directive.js';

${directivesCode}`;

  fs.writeFileSync("src/directives.js", generatedCode, "utf8");
}

run();
