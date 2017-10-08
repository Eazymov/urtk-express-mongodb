import types from './types';

const actions = {
  setNotifyBox ({ state, commit }: any, notifyBox: any): void {
    commit(types.SET_BOX, notifyBox);
  },
  
  showNotification ({ state, commit }: any, params: any) {
    const { text, time } = params;

    commit(types.SET_TEXT, text);
    time && commit(types.SET_TIME, time);

    state.notifyBox.open();
  }
};

export default actions;