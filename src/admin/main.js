import 'webpack-hot-middleware/client'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VAxios from 'vue-axios'

import MaterialButton from '../common-components/material-button.vue'
import GoogleLoader from './components/other/google-loader.vue'
import FilterBox from './components/other/filter-box.vue'
import NotFound from '../common-components/not-found.vue'
import FloatSubmit from './components/other/float-submit-button.vue'
import Prompt from './components/other/prompt-box.vue'
import WarningBox from './components/other/warning-box.vue'

import '../assets/vue-material'
import '../assets/fonts/material-icons.css'
import 'babel-polyfill'
import 'fetch-polyfill'

import tinyMceCfg from './tinymce.config.js'

Vue.use(VAxios, Axios)

Vue.material.registerTheme('default', {
  primary: {
    color: 'blue',
    hue: 500
  },
  accent: {
    color: 'blue',
    hue: 500
  },
  warn: 'red',
  background: 'white'
})

Vue.component('material-button', MaterialButton)
Vue.component('loader', GoogleLoader)
Vue.component('filter-box', FilterBox)
Vue.component('not-found', NotFound)
Vue.component('float-submit', FloatSubmit)
Vue.component('prompt', Prompt)
Vue.component('warning-box', WarningBox)

new Vue({
  el: '#App',
  router,
  render: f => f(App),
  created() {
    this.tinyMceCfg = tinyMceCfg
  }
})
