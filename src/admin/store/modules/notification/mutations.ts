import types from './types';

const mutations = {
  [types.SET_BOX] (state: State, notifyBox: any): void {
    state.notifyBox = notifyBox;
  },

  [types.SET_TEXT] (state: State, text: string): void {
    state.notificationText = text;
  },

  [types.SET_TIME] (state: State, time: number): void {
    state.notificationTime = time;
  },
};

export default mutations;
