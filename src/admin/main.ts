import 'webpack-hot-middleware/client';

import Vue from 'vue';
import router from 'Admin/router';
import observable from 'Admin/store';

import App from './App/index.vue';

import MaterialButton from 'Shared/MaterialButton/index.vue';
import NotFound from 'Shared/NotFound/index.vue';

import Prompt from 'Admin/components/other/PromptBox/index.vue';
import FilterBox from 'Admin/components/other/FilterBox/index.vue';
import NotifyBox from 'Admin/components/other/NotifyBox/index.vue';
import WarningBox from 'Admin/components/other/WarningBox/index.vue';
import FloatSubmit from 'Admin/components/other/FloatSubmit/index.vue';
import GoogleLoader from 'Admin/components/other/GoogleLoader/index.vue';

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

new (<any>Vue)({
  el: '#App',
  router,
  observable,
  render: (f: (app: any) => void) => f(App),
  created () {
    (<any>this).tinyMceCfg = tinyMceCfg
  }
});
