import { RouteConfig } from 'vue-router';

import Mainpage from 'Admin/components/Mainpage/index.vue';
import Homepage from 'Admin/components/Homepage/index.vue';
import Sponsors from 'Admin/components/Sponsors/index.vue';

import newsRoutes from './news';
import sectionsRoutes from './sections';
import articlesRoutes from './sections';

const routes: RouteConfig[] = [
  { path: '/', component: Mainpage },

  { path: '/homepage', component: Homepage },

  { path: '/sponsors', component: Sponsors },

  ...newsRoutes,
  ...sectionsRoutes,
  ...articlesRoutes,

  { path: '*', redirect: '/' }
];

export default routes;