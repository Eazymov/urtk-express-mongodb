import 'webpack-hot-middleware/client';
import 'babel-polyfill';
import 'fetch-polyfill';

import Vue from 'vue';
import store from 'Admin/store';
import router from 'Admin/router';

import App from './AppComponent/index.vue';

import MaterialButton from 'Shared/MaterialButtonComponent/index.vue';
import NotFound from 'Shared/NotFoundComponent/index.vue';

import Prompt from 'Admin/components/other/PromptBoxComponent/index.vue';
import FilterBox from 'Admin/components/other/FilterBoxComponent/index.vue';
import NotifyBox from 'Admin/components/other/NotifyBoxComponent/index.vue';
import WarningBox from 'Admin/components/other/WarningBoxComponent/index.vue';
import FloatSubmit from 'Admin/components/other/FloatSubmitButton/index.vue';
import GoogleLoader from 'Admin/components/other/GoogleLoaderComponent/index.vue';

import 'Assets/vue-material';

import tinyMceCfg from './tinymce.config';

Vue.component('material-button', MaterialButton);
Vue.component('loader', GoogleLoader);
Vue.component('filter-box', FilterBox);
Vue.component('not-found', NotFound);
Vue.component('float-submit', FloatSubmit);
Vue.component('prompt', Prompt);
Vue.component('notify-box', NotifyBox);
Vue.component('warning-box', WarningBox);

new Vue({
  el: '#App',
  store,
  router,
  render: f => f(App),
  created () {
    (<any>this).tinyMceCfg = tinyMceCfg
  }
});
