# vaadin-lit-localize

Allows to translate Vaadin components using [`@lit/localize`](https://lit.dev/docs/localization/overview/).

```js
import '@vaadin/date-picker';
import { configureLocalization } from "@lit/localize";
import { render, html } from "lit";
import { localize } from 'vaadin-lit-localize';

// Setup lit-localize with a German translation
const localization = configureLocalization({
  sourceLocale: "en",
  targetLocales: ["de"],
  loadLocale: () => Promise.resolve({
    'vaadin-date-picker.today': 'Heute',
    'vaadin-date-picker.monthNames.0': 'Januar',
    // ...
  }),
});

// Switch to German locale
localization.setLocale('de');

// Render date picker using German translation 
render(html`
  <vaadin-date-picker ${localize()}></vaadin-date-picker>
`, container);

```

> **Warning**
> 
> @lit/localize expects the main / source locale translation to be in the source code.
> By default, this package provides the default English translation of the Vaadin components.
> That means for your main / source locale, you will get the default English translation, and it can not be changed.
> 
> A workaround might be to use a dummy locale as default, and then create a separate main locale that will be loaded on app startup, or bundled into a [localized app bundle](https://lit.dev/docs/localization/transform-mode/).
 

## Usage

Install the package:

```
npm i vaadin-lit-localize
```
```
yarn add vaadin-lit-localize
```

Import the `localize` directive and apply it to a Vaadin element that supports internationalization (every Vaadin component that has a `i18n` property):

```js
import { localize } from 'vaadin-lit-localize';

render(html`
  <vaadin-date-picker ${localize()}></vaadin-date-picker>
`, container);
```

To translate component messages you have two options:
1. If you are using the lit-localize CLI tool, then run the [`lit-localize extract`](https://lit.dev/docs/localization/overview/#extracting-messages) command.
This will extract all Vaadin component messages to your XLIFF files, where they then can be translated.
After building the translation files again, Vaadin components in your application should now use the correct translation.
2. If you are not using the CLI tools, then you can add the respective messages to your translation files manually. See [Translation Messages](#translation-messages) for an overview of the available Vaadin component messages that can be translated.

## Overrides

If you want to override a specific message for a component instance, or specify other I18N properties, such as the date picker format function, you can specify an override object to the `localize` directive:

```js
const overrides = {
  today: 'Heute',
  formatDate: (date) => { /* formatter implementation */ },
  parseDate: (dateString) => { /* parser implementation */ },
};
render(html`
  <vaadin-date-picker ${localize(overrides)}></vaadin-date-picker>
`, container);
```

> **Warning**
>
> Make sure to reuse or memoize the overrides, passing new objects into the directive on every render will lead to unnecessary updates.

## Translation Messages

TODO
