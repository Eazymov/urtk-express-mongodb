import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
});

export default store;
