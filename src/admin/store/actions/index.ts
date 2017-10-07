import CustomEvents from 'Utils/customEvents';

import {
  NOTIFICATION,
  WARNING,
  SHOW_FILE_BOX
} from 'Admin/constants/customEvents';

const actions = {
  notify (state: any, text: string): void {
    CustomEvents.emit(NOTIFICATION, {
      detail: text,
    });
  },

  showWarning (state: any, text: string): void {
    CustomEvents.emit(WARNING, {
      detail: text,
    });
  },

  openFileBox (): void {
    CustomEvents.emit(SHOW_FILE_BOX);
  }
};

export default actions;
