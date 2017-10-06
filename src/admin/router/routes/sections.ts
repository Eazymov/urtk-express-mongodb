import { RouteConfig } from 'vue-router';

import Sections from 'Admin/components/sections/sections.vue';
import Section from 'Admin/components/sections/section.vue';
import SectionEdit from 'Admin/components/sections/section-editor.vue';

const sectionsRoutes: RouteConfig[] = [
  { path: '/sections', component: Sections },
  { path: '/sections/create', component: SectionEdit },
  { path: '/sections/:id', component: Section },
  { path: '/sections/:id/edit', component: SectionEdit },
];

export default sectionsRoutes;