const fs = require("fs");
const { JSDOM } = require("jsdom");

const localizeDirective = fs.readFileSync("localize-directive.js", "utf8");
const directiveTemplate = fs.readFileSync("directive-template.js", "utf8");

// Prepare JSDOM instance, load bundle containing Vaadin components
const dom = new JSDOM(``, { runScripts: "outside-only" });
const bundle = fs.readFileSync("bundle.js", "utf8");
dom.window.eval(bundle);

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
    return value.map((item) => {
      return localizeI18n(prefix, item);
    });
  } else if (typeof value === "string") {
    const messageId = prefix + "." + value;
    return generateMessageInstruction(messageId, value);
  }
}

function generateLocalizationJson(componentClass, messagePrefix) {
  let defaultI18n = dom.window.eval(`new bundle.${componentClass}().i18n`);
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
  let code = directiveTemplate;
  code = code.replaceAll(
    "__DirectiveClassName__",
    `${componentClass}Directive`
  );
  code = code.replaceAll("__DirectiveFunctionName__", directiveName);
  code = code.replaceAll("__DirectiveLocalization__", localizationCode);

  return code;
}

function run() {
  const directives = [
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
import { nothing } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, PartType } from 'lit/directive.js';

${localizeDirective}
${directivesCode}`;

  fs.writeFileSync("src/directives.js", generatedCode, "utf8");
}

run();
