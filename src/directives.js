import { msg } from '@lit/localize';
import { directive } from 'lit/directive.js';
import { LocalizeDirective } from './localize-directive.js';

export class AppLayoutDirective extends LocalizeDirective {
  getLocalization() {
    return {
  drawer: msg('Drawer', { id: 'vaadin-app-layout.drawer' })
}
  }
}

export const localizeAppLayout = directive(AppLayoutDirective);

export class AvatarDirective extends LocalizeDirective {
  getLocalization() {
    return {
  anonymous: msg('anonymous', { id: 'vaadin-avatar.anonymous' })
}
  }
}

export const localizeAvatar = directive(AvatarDirective);

export class AvatarGroupDirective extends LocalizeDirective {
  getLocalization() {
    return {
  anonymous: msg('anonymous', { id: 'vaadin-avatar-group.anonymous' }),
  activeUsers: {
    one: msg('Currently one active user', { id: 'vaadin-avatar-group.activeUsers.one' }),
    many: msg('Currently {count} active users', { id: 'vaadin-avatar-group.activeUsers.many' })
  },
  joined: msg('{user} joined', { id: 'vaadin-avatar-group.joined' }),
  left: msg('{user} left', { id: 'vaadin-avatar-group.left' })
}
  }
}

export const localizeAvatarGroup = directive(AvatarGroupDirective);

export class CrudDirective extends LocalizeDirective {
  getLocalization() {
    return {
  newItem: msg('New item', { id: 'vaadin-crud.newItem' }),
  editItem: msg('Edit item', { id: 'vaadin-crud.editItem' }),
  saveItem: msg('Save', { id: 'vaadin-crud.saveItem' }),
  cancel: msg('Cancel', { id: 'vaadin-crud.cancel' }),
  deleteItem: msg('Delete...', { id: 'vaadin-crud.deleteItem' }),
  editLabel: msg('Edit', { id: 'vaadin-crud.editLabel' }),
  confirm: {
    delete: {
      title: msg('Delete item', { id: 'vaadin-crud.confirm.delete.title' }),
      content: msg('Are you sure you want to delete this item? This action cannot be undone.', { id: 'vaadin-crud.confirm.delete.content' }),
      button: {
        confirm: msg('Delete', { id: 'vaadin-crud.confirm.delete.button.confirm' }),
        dismiss: msg('Cancel', { id: 'vaadin-crud.confirm.delete.button.dismiss' })
      }
    },
    cancel: {
      title: msg('Discard changes', { id: 'vaadin-crud.confirm.cancel.title' }),
      content: msg('There are unsaved changes to this item.', { id: 'vaadin-crud.confirm.cancel.content' }),
      button: {
        confirm: msg('Discard', { id: 'vaadin-crud.confirm.cancel.button.confirm' }),
        dismiss: msg('Cancel', { id: 'vaadin-crud.confirm.cancel.button.dismiss' })
      }
    }
  }
}
  }
}

export const localizeCrud = directive(CrudDirective);

export class DatePickerDirective extends LocalizeDirective {
  getLocalization() {
    return {
  monthNames: [
    msg('January', { id: 'vaadin-date-picker.monthNames.0' }),
    msg('February', { id: 'vaadin-date-picker.monthNames.1' }),
    msg('March', { id: 'vaadin-date-picker.monthNames.2' }),
    msg('April', { id: 'vaadin-date-picker.monthNames.3' }),
    msg('May', { id: 'vaadin-date-picker.monthNames.4' }),
    msg('June', { id: 'vaadin-date-picker.monthNames.5' }),
    msg('July', { id: 'vaadin-date-picker.monthNames.6' }),
    msg('August', { id: 'vaadin-date-picker.monthNames.7' }),
    msg('September', { id: 'vaadin-date-picker.monthNames.8' }),
    msg('October', { id: 'vaadin-date-picker.monthNames.9' }),
    msg('November', { id: 'vaadin-date-picker.monthNames.10' }),
    msg('December', { id: 'vaadin-date-picker.monthNames.11' })
  ],
  weekdays: [
    msg('Sunday', { id: 'vaadin-date-picker.weekdays.0' }),
    msg('Monday', { id: 'vaadin-date-picker.weekdays.1' }),
    msg('Tuesday', { id: 'vaadin-date-picker.weekdays.2' }),
    msg('Wednesday', { id: 'vaadin-date-picker.weekdays.3' }),
    msg('Thursday', { id: 'vaadin-date-picker.weekdays.4' }),
    msg('Friday', { id: 'vaadin-date-picker.weekdays.5' }),
    msg('Saturday', { id: 'vaadin-date-picker.weekdays.6' })
  ],
  weekdaysShort: [
    msg('Sun', { id: 'vaadin-date-picker.weekdaysShort.0' }),
    msg('Mon', { id: 'vaadin-date-picker.weekdaysShort.1' }),
    msg('Tue', { id: 'vaadin-date-picker.weekdaysShort.2' }),
    msg('Wed', { id: 'vaadin-date-picker.weekdaysShort.3' }),
    msg('Thu', { id: 'vaadin-date-picker.weekdaysShort.4' }),
    msg('Fri', { id: 'vaadin-date-picker.weekdaysShort.5' }),
    msg('Sat', { id: 'vaadin-date-picker.weekdaysShort.6' })
  ],
  week: msg('Week', { id: 'vaadin-date-picker.week' }),
  calendar: msg('Calendar', { id: 'vaadin-date-picker.calendar' }),
  today: msg('Today', { id: 'vaadin-date-picker.today' }),
  cancel: msg('Cancel', { id: 'vaadin-date-picker.cancel' })
}
  }
}

export const localizeDatePicker = directive(DatePickerDirective);

export class LoginFormDirective extends LocalizeDirective {
  getLocalization() {
    return {
  form: {
    title: msg('Log in', { id: 'vaadin-login.form.title' }),
    username: msg('Username', { id: 'vaadin-login.form.username' }),
    password: msg('Password', { id: 'vaadin-login.form.password' }),
    submit: msg('Log in', { id: 'vaadin-login.form.submit' }),
    forgotPassword: msg('Forgot password', { id: 'vaadin-login.form.forgotPassword' })
  },
  errorMessage: {
    title: msg('Incorrect username or password', { id: 'vaadin-login.errorMessage.title' }),
    message: msg('Check that you have entered the correct username and password and try again.', { id: 'vaadin-login.errorMessage.message' })
  }
}
  }
}

export const localizeLogin = directive(LoginFormDirective);

export class UploadDirective extends LocalizeDirective {
  getLocalization() {
    return {
  dropFiles: {
    one: msg('Drop file here', { id: 'vaadin-upload.dropFiles.one' }),
    many: msg('Drop files here', { id: 'vaadin-upload.dropFiles.many' })
  },
  addFiles: {
    one: msg('Upload File...', { id: 'vaadin-upload.addFiles.one' }),
    many: msg('Upload Files...', { id: 'vaadin-upload.addFiles.many' })
  },
  error: {
    tooManyFiles: msg('Too Many Files.', { id: 'vaadin-upload.error.tooManyFiles' }),
    fileIsTooBig: msg('File is Too Big.', { id: 'vaadin-upload.error.fileIsTooBig' }),
    incorrectFileType: msg('Incorrect File Type.', { id: 'vaadin-upload.error.incorrectFileType' })
  },
  uploading: {
    status: {
      connecting: msg('Connecting...', { id: 'vaadin-upload.uploading.status.connecting' }),
      stalled: msg('Stalled', { id: 'vaadin-upload.uploading.status.stalled' }),
      processing: msg('Processing File...', { id: 'vaadin-upload.uploading.status.processing' }),
      held: msg('Queued', { id: 'vaadin-upload.uploading.status.held' })
    },
    remainingTime: {
      prefix: msg('remaining time: ', { id: 'vaadin-upload.uploading.remainingTime.prefix' }),
      unknown: msg('unknown remaining time', { id: 'vaadin-upload.uploading.remainingTime.unknown' })
    },
    error: {
      serverUnavailable: msg('Upload failed, please try again later', { id: 'vaadin-upload.uploading.error.serverUnavailable' }),
      unexpectedServerError: msg('Upload failed due to server error', { id: 'vaadin-upload.uploading.error.unexpectedServerError' }),
      forbidden: msg('Upload forbidden', { id: 'vaadin-upload.uploading.error.forbidden' })
    }
  },
  file: {
    retry: msg('Retry', { id: 'vaadin-upload.file.retry' }),
    start: msg('Start', { id: 'vaadin-upload.file.start' }),
    remove: msg('Remove', { id: 'vaadin-upload.file.remove' })
  },
  units: {
    size: [
      msg('B', { id: 'vaadin-upload.units.size.0' }),
      msg('kB', { id: 'vaadin-upload.units.size.1' }),
      msg('MB', { id: 'vaadin-upload.units.size.2' }),
      msg('GB', { id: 'vaadin-upload.units.size.3' }),
      msg('TB', { id: 'vaadin-upload.units.size.4' }),
      msg('PB', { id: 'vaadin-upload.units.size.5' }),
      msg('EB', { id: 'vaadin-upload.units.size.6' }),
      msg('ZB', { id: 'vaadin-upload.units.size.7' }),
      msg('YB', { id: 'vaadin-upload.units.size.8' })
    ]
  }
}
  }
}

export const localizeUpload = directive(UploadDirective);
