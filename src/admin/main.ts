import 'webpack-hot-middleware/client';

import Vue from 'vue';
import App from './AppComponent/index.vue';
import router from './router';

import MaterialButton from 'shared/MaterialButtonComponent';
import NotFound from 'shared/NotFoundComponent';

import Prompt from './components/other/PromptBoxComponent';
import FilterBox from './components/other/FilterBoxComponent';
import WarningBox from './components/other/WarningBoxComponent';
import FloatSubmit from './components/other/FloatSubmitButton';
import GoogleLoader from './components/other/GoogleLoaderComponent';

import 'assets/vue-material';
import 'babel-polyfill';
import 'fetch-polyfill';

import tinyMceCfg from './tinymce.config';

Vue.component('material-button', MaterialButton);
Vue.component('loader', GoogleLoader);
Vue.component('filter-box', FilterBox);
Vue.component('not-found', NotFound);
Vue.component('float-submit', FloatSubmit);
Vue.component('prompt', Prompt);
Vue.component('warning-box', WarningBox);

new Vue({
  el: '#App',
  router,
  render: f => f(App),
  created () {
    (<any>this).tinyMceCfg = tinyMceCfg
  }
});
