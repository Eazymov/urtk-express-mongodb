import state from './state';
import actions from './actions';
import mutations from './mutations';

const notificationModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default notificationModule;
