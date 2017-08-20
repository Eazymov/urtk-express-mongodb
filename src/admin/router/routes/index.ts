import { RouteConfig } from 'vue-router';

import Mainpage from 'admin/components/MainpageComponent';
import Homepage from 'admin/components/HomepageComponent/index.vue';
import Sponsors from 'admin/components/SponsorsComponent/index.vue';

import NewsList from 'admin/components/news/news-list.vue';
import NewsItem from 'admin/components/news/news-item.vue';
import NewsItemEdit from 'admin/components/news/news-item-editor.vue';

import Articles from 'admin/components/articles/articles.vue';
import Article from 'admin/components/articles/article.vue';
import ArticleEdit from 'admin/components/articles/article-editor.vue';

import Categories from 'admin/components/categories/categories.vue';
import Categorie from 'admin/components/categories/categorie.vue';
import CategorieEdit from 'admin/components/categories/categorie-editor.vue';

const routes: RouteConfig[] = [
  { path: '/', component: Mainpage },

  { path: '/homepage', component: Homepage },

  { path: '/sponsors', component: Sponsors },

  { path: '/news', component: NewsList },
  { path: '/news/create', component: NewsItemEdit },
  { path: '/news/:id', component: NewsItem },
  { path: '/news/:id/edit', component: NewsItemEdit },

  { path: '/categories', component: Categories },
  { path: '/categories/create', component: CategorieEdit },
  { path: '/categories/:id', component: Categorie },
  { path: '/categories/:id/edit', component: CategorieEdit },

  { path: '/articles', component: Articles },
  { path: '/articles/create', component: ArticleEdit },
  { path: '/articles/:id', component: Article },
  { path: '/articles/:id/edit', component: ArticleEdit },

  { path: '*', redirect: '/' }
];

export default routes;