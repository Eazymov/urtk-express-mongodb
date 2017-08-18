import Vue    from 'vue'
import Router from 'vue-router'

import Mainpage   from '../components/mainpage.vue'
import Homepage   from '../components/homepage.vue'
import Sponsors   from '../components/sponsors.vue'

import NewsList      from '../components/news/news-list.vue'
import NewsItem      from '../components/news/news-item.vue'
import NewsItemEdit  from '../components/news/news-item-editor.vue'

import Articles      from '../components/articles/articles.vue'
import Article       from '../components/articles/article.vue'
import ArticleEdit   from '../components/articles/article-editor.vue'

import Categories    from '../components/categories/categories.vue'
import Categorie     from '../components/categories/categorie.vue'
import CategorieEdit from '../components/categories/categorie-editor.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',

  saveScrollPosition: true,

  history: true,

  routes: [
    { path: '/', component: Mainpage },

    { path: '/homepage', component: Homepage },

    { path: '/sponsors', component: Sponsors },

    { path: '/news',          component: NewsList },
    { path: '/news/create',   component: NewsItemEdit },
    { path: '/news/:id',      component: NewsItem },
    { path: '/news/:id/edit', component: NewsItemEdit },

    { path: '/categories',          component: Categories },
    { path: '/categories/create',   component: CategorieEdit },
    { path: '/categories/:id',      component: Categorie },
    { path: '/categories/:id/edit', component: CategorieEdit },

    { path: '/articles',          component: Articles },
    { path: '/articles/create',   component: ArticleEdit },
    { path: '/articles/:id',      component: Article },
    { path: '/articles/:id/edit', component: ArticleEdit },

    { path: '*', redirect: '/' },
  ],
})
