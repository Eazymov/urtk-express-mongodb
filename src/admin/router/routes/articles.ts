import { RouteConfig } from 'vue-router';

import Articles from 'Admin/components/articles/articles.vue';
import Article from 'Admin/components/articles/article.vue';
import ArticleEdit from 'Admin/components/articles/article-editor.vue';

const newsRoutes: RouteConfig[] = [
  { path: '/articles', component: Articles },
  { path: '/articles/create', component: ArticleEdit },
  { path: '/articles/:id', component: Article },
  { path: '/articles/:id/edit', component: ArticleEdit },
];

export default newsRoutes;