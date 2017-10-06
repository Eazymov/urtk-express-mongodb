import { RouteConfig } from 'vue-router';

import NewsList from 'Admin/components/news/news-list.vue';
import NewsItem from 'Admin/components/news/news-item.vue';
import NewsItemEdit from 'Admin/components/news/news-item-editor.vue';

const newsRoutes: RouteConfig[] = [
  { path: '/news', component: NewsList },
  { path: '/news/create', component: NewsItemEdit },
  { path: '/news/:id', component: NewsItem },
  { path: '/news/:id/edit', component: NewsItemEdit },
];

export default newsRoutes;