import { msg } from '@lit/localize';
import { nothing } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, PartType } from 'lit/directive.js';

class LocalizeDirective extends AsyncDirective {
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

export class DatePickerDirective extends LocalizeDirective {
  getLocalization() {
    return {
  monthNames: [
    msg('January', { id: 'vaadin-date-picker.monthNames.January' }),
    msg('February', { id: 'vaadin-date-picker.monthNames.February' }),
    msg('March', { id: 'vaadin-date-picker.monthNames.March' }),
    msg('April', { id: 'vaadin-date-picker.monthNames.April' }),
    msg('May', { id: 'vaadin-date-picker.monthNames.May' }),
    msg('June', { id: 'vaadin-date-picker.monthNames.June' }),
    msg('July', { id: 'vaadin-date-picker.monthNames.July' }),
    msg('August', { id: 'vaadin-date-picker.monthNames.August' }),
    msg('September', { id: 'vaadin-date-picker.monthNames.September' }),
    msg('October', { id: 'vaadin-date-picker.monthNames.October' }),
    msg('November', { id: 'vaadin-date-picker.monthNames.November' }),
    msg('December', { id: 'vaadin-date-picker.monthNames.December' })
  ],
  weekdays: [
    msg('Sunday', { id: 'vaadin-date-picker.weekdays.Sunday' }),
    msg('Monday', { id: 'vaadin-date-picker.weekdays.Monday' }),
    msg('Tuesday', { id: 'vaadin-date-picker.weekdays.Tuesday' }),
    msg('Wednesday', { id: 'vaadin-date-picker.weekdays.Wednesday' }),
    msg('Thursday', { id: 'vaadin-date-picker.weekdays.Thursday' }),
    msg('Friday', { id: 'vaadin-date-picker.weekdays.Friday' }),
    msg('Saturday', { id: 'vaadin-date-picker.weekdays.Saturday' })
  ],
  weekdaysShort: [
    msg('Sun', { id: 'vaadin-date-picker.weekdaysShort.Sun' }),
    msg('Mon', { id: 'vaadin-date-picker.weekdaysShort.Mon' }),
    msg('Tue', { id: 'vaadin-date-picker.weekdaysShort.Tue' }),
    msg('Wed', { id: 'vaadin-date-picker.weekdaysShort.Wed' }),
    msg('Thu', { id: 'vaadin-date-picker.weekdaysShort.Thu' }),
    msg('Fri', { id: 'vaadin-date-picker.weekdaysShort.Fri' }),
    msg('Sat', { id: 'vaadin-date-picker.weekdaysShort.Sat' })
  ],
  week: msg('Week', { id: 'vaadin-date-picker.week.Week' }),
  calendar: msg('Calendar', { id: 'vaadin-date-picker.calendar.Calendar' }),
  today: msg('Today', { id: 'vaadin-date-picker.today.Today' }),
  cancel: msg('Cancel', { id: 'vaadin-date-picker.cancel.Cancel' })
};
  }
}

export const localizeDatePicker = directive(DatePickerDirective);

export class LoginFormDirective extends LocalizeDirective {
  getLocalization() {
    return {
  form: {
    title: msg('Log in', { id: 'vaadin-login.form.title.Log in' }),
    username: msg('Username', { id: 'vaadin-login.form.username.Username' }),
    password: msg('Password', { id: 'vaadin-login.form.password.Password' }),
    submit: msg('Log in', { id: 'vaadin-login.form.submit.Log in' }),
    forgotPassword: msg('Forgot password', { id: 'vaadin-login.form.forgotPassword.Forgot password' })
  },
  errorMessage: {
    title: msg('Incorrect username or password', { id: 'vaadin-login.errorMessage.title.Incorrect username or password' }),
    message: msg('Check that you have entered the correct username and password and try again.', { id: 'vaadin-login.errorMessage.message.Check that you have entered the correct username and password and try again.' })
  }
};
  }
}

export const localizeLogin = directive(LoginFormDirective);

export class UploadDirective extends LocalizeDirective {
  getLocalization() {
    return {
  dropFiles: {
    one: msg('Drop file here', { id: 'vaadin-upload.dropFiles.one.Drop file here' }),
    many: msg('Drop files here', { id: 'vaadin-upload.dropFiles.many.Drop files here' })
  },
  addFiles: {
    one: msg('Upload File...', { id: 'vaadin-upload.addFiles.one.Upload File...' }),
    many: msg('Upload Files...', { id: 'vaadin-upload.addFiles.many.Upload Files...' })
  },
  error: {
    tooManyFiles: msg('Too Many Files.', { id: 'vaadin-upload.error.tooManyFiles.Too Many Files.' }),
    fileIsTooBig: msg('File is Too Big.', { id: 'vaadin-upload.error.fileIsTooBig.File is Too Big.' }),
    incorrectFileType: msg('Incorrect File Type.', { id: 'vaadin-upload.error.incorrectFileType.Incorrect File Type.' })
  },
  uploading: {
    status: {
      connecting: msg('Connecting...', { id: 'vaadin-upload.uploading.status.connecting.Connecting...' }),
      stalled: msg('Stalled', { id: 'vaadin-upload.uploading.status.stalled.Stalled' }),
      processing: msg('Processing File...', { id: 'vaadin-upload.uploading.status.processing.Processing File...' }),
      held: msg('Queued', { id: 'vaadin-upload.uploading.status.held.Queued' })
    },
    remainingTime: {
      prefix: msg('remaining time: ', { id: 'vaadin-upload.uploading.remainingTime.prefix.remaining time: ' }),
      unknown: msg('unknown remaining time', { id: 'vaadin-upload.uploading.remainingTime.unknown.unknown remaining time' })
    },
    error: {
      serverUnavailable: msg('Upload failed, please try again later', { id: 'vaadin-upload.uploading.error.serverUnavailable.Upload failed, please try again later' }),
      unexpectedServerError: msg('Upload failed due to server error', { id: 'vaadin-upload.uploading.error.unexpectedServerError.Upload failed due to server error' }),
      forbidden: msg('Upload forbidden', { id: 'vaadin-upload.uploading.error.forbidden.Upload forbidden' })
    }
  },
  file: {
    retry: msg('Retry', { id: 'vaadin-upload.file.retry.Retry' }),
    start: msg('Start', { id: 'vaadin-upload.file.start.Start' }),
    remove: msg('Remove', { id: 'vaadin-upload.file.remove.Remove' })
  },
  units: {
    size: [
      msg('B', { id: 'vaadin-upload.units.size.B' }),
      msg('kB', { id: 'vaadin-upload.units.size.kB' }),
      msg('MB', { id: 'vaadin-upload.units.size.MB' }),
      msg('GB', { id: 'vaadin-upload.units.size.GB' }),
      msg('TB', { id: 'vaadin-upload.units.size.TB' }),
      msg('PB', { id: 'vaadin-upload.units.size.PB' }),
      msg('EB', { id: 'vaadin-upload.units.size.EB' }),
      msg('ZB', { id: 'vaadin-upload.units.size.ZB' }),
      msg('YB', { id: 'vaadin-upload.units.size.YB' })
    ]
  }
};
  }
}

export const localizeUpload = directive(UploadDirective);
