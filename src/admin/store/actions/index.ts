import CustomEvents from 'Utils/customEvents';

import { NOTIFICATION, WARNING } from 'Admin/constants/customEvents';

const actions = {
  notify (store: any, text: string) {
    CustomEvents.emit(NOTIFICATION, {
      detail: text,
    });
  },

  showWarning (store: any, text: string) {
    CustomEvents.emit(WARNING, {
      detail: text,
    });
  },
};

export default actions;
