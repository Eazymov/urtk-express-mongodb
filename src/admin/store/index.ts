import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  modules,
});

export default store;
