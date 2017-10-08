import CustomEvents from 'Utils/customEvents';

import {
  WARNING,
  SHOW_FILE_BOX,
} from 'Admin/constants/customEvents';

const actions = {
  showWarning (store: any, text: string): void {
    CustomEvents.emit(WARNING, {
      detail: text,
    });
  },

  openFileBox (): void {
    CustomEvents.emit(SHOW_FILE_BOX);
  },
};

export default actions;
