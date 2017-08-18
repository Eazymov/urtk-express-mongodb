<template lang="html">
  <section id="content">

    <div class="articles-list">

      <div class="articles-list__head">
        <span class="md-title">Записи</span>
        <md-button href="#/articles/create"
                  class="md-icon-button md-fab md-mini add-btn">
          <md-icon>add</md-icon>
          <md-tooltip md-delay="500">Добавить запись</md-tooltip>
        </md-button>

        <filter-box :options="columns"
                    class="articles-list__head__filter-box"
                    @queryChange="$val => filterQuery = $val"
                    @filterChange="$val => filter = $val" />
      </div>

      <md-whiteframe md-elevation="2" md-tag="table" class="articles-list__table">
        <thead>
          <tr>
            <th v-for="(value, key) in columns"
                :key="key"
                :class="[value, { 'sorted': sort === value }]"
                @click="setSort(value)">
              <md-icon class="md-18">
                {{ reversed ? 'arrow_downward' : 'arrow_upward' }}
              </md-icon>
              {{key}}
              <md-tooltip md-delay="500">Сортировать</md-tooltip>
            </th>
            <th class="actions" colspan="2"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="article in filteredArticles">
            <td class="id">{{ article.id }}</td>
            <td class="date">
              <router-link :to="{ path: `articles/${article.id}` }">
                {{ formatDate(article.date) }}
                <md-tooltip md-delay="500">Посмотреть содержание</md-tooltip>
              </router-link>
            </td>
            <td class="title">
              <router-link :to="{ path: `articles/${article.id}` }">
                {{ article.title }}
                <md-tooltip md-delay="500">Посмотреть содержание</md-tooltip>
              </router-link>
            </td>
            <td class="categorie">
              <router-link :to="{ path: `categories/${article.categorie_id}` }">
                {{ article.categorie || '' }}
                <md-tooltip md-delay="500">Открыть категорию</md-tooltip>
              </router-link>
            </td>
            <td class="actions">
              <md-button :href="`#/articles/${article.id}/edit`"
                         class="md-icon-button md-dense edit-btn">
                <md-icon>edit</md-icon>
                <md-tooltip md-delay="500">Редактировать</md-tooltip>
              </md-button>
            </td>
            <td class="actions">
              <md-button class="md-icon-button md-dense del-btn"
                         @click.native="deleteArticle(article.id)">
                <md-icon>delete_forever</md-icon>
                <md-tooltip md-delay="500">Удалить</md-tooltip>
              </md-button>
            </td>
          </tr>
        </tbody>
      </md-whiteframe>
    </div>

    <prompt ref="prompt"
            :callback="promptCallback"
            text="Вы действительно хотите удалить запись?" />

    <loader v-show="loading" class="articles-list__loader" />
  </section>
</template>

<script>
  export default {
    data: () => ({
      articles: [],
      sort: 'date',
      filter: 'title',
      filterQuery: '',
      reversed: false,
      columns: {
        id: 'id',
        'Дата': 'date',
        'Заголовок': 'title',
        'Категория': 'categorie'
      },
      loading: true,
      promptCallback: null
    }),

    computed: {
      filteredArticles() {
        const filter = this.filter;
        const query = this.filterQuery.toLowerCase();
        const articles = this.sortedArticles;

        if (query)
          return articles
            .filter(el => {
              const elem = (filter === 'date') ? this.formatDate(el[filter]) : el[filter];

              return elem.toLowerCase().includes(query);
            })

        return articles;
      },

      sortedArticles() {
        const sort = this.sort;

        return this.articles.sort((a, b) => {
          let prev = +a[sort] || a[sort];
          let next = +b[sort] || b[sort];

          if (this.reversed) {
            [prev, next] = [next, prev];
          }

          return prev < next ? 1 : -1;
        })
      }
    },

    methods: {
      formatDate(date) {
        const parts = date.split('-');

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      },

      getData() {
        const uniqueParam = (new Date()).getTime();

        this.$http
          .get(`../../../../server_scripts/get/articles_list.php?${uniqueParam}`)
          .then(this.handleAjaxLoad)
          .catch(error => console.log(error))
      },

      handleAjaxLoad(response) {
        this.loading = false;

        const { data } = response

        if (!data.length) return;

        this.articles = response.data;
      },

      setSort(sort) {
        const reversed = this.reversed;

        this.reversed = (this.sort === sort) ? !reversed : reversed;

        this.sort = sort;
      },

      resetFilter() {
        this.filterWord = '';

        this.filterIsActive = false;
      },

      deleteArticle(id) {
        this.promptCallback = () => {
          const articles = this.articles;
          const index = articles.findIndex(el => el.id === id);

          articles.splice(index, 1);

          this.$http
            .post(`../../../../server_scripts/delete/article.php`, { id });
        }

        this.$refs.prompt.$children[0].open()
      },

      updateDeletedCategorie(id) {
        this.articles.some(el => {
          return (el.categorie_id === id) && !(el.categorie = null);
        })
      }
    },

    beforeDestroy() {
      this.$root.$off('categorie-delete', this.updateDeletedCategorie);
    },

    created() {
      this.getData()

      this.$root.$on('categorie-delete', this.updateDeletedCategorie);
    }
  }
</script>

<style lang="sass">
#content
  .articles-list
    &__head
      padding-bottom: 16px
      position: relative
      width: 826px
      color: #fff
      &::after
        display: table
        content: ''
        clear: both
      .md-title
        color: rgba(#000, .87)
        line-height: 2.5rem
      .add-btn.md-button.md-fab.md-mini
        background-color: #4caf50
        position: relative
        transition: .2s
        &:hover
          background-color: #4caf50

      &__filter-box
        position: absolute
        bottom: 10px
        right: 0

    &__table
      border-collapse: collapse
      background-color: #fff
      text-align: center
      width: 826px

      thead
        border-bottom: 1px solid #ccc
        color: rgba(#000, .54)
        line-height: 33px
        th
          font-size: .85rem
          font-weight: 500
          cursor: pointer
          height: 54px
          &.sorted
            color: rgba(#000, .87)
            .md-icon
              display: inline-block
          .md-icon
            display: none
            width: 18px
            height: 18px

          &.id
            width: 58px
          &.date
            width: 122px
          &.title
            width: 364px
          &.categorie
            width: 190px
          &.actions
            width: 92px

      tbody
        tr
          border-top: 1px solid #ccc
          color: rgba(#000, .87)
          transition: .2s
          &:hover
            background-color: #eee
        td
          font-size: .9125rem
          font-weight: 400
          padding: 0 20px
          height: 47px
          a
            color: inherit
        .date
          text-decoration: underline
        .title
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
          text-align: left
          padding: 0 11px
          max-width: 364px
          a:hover
            text-decoration: underline
        .categorie
          text-overflow: ellipsis
          white-space: nowrap
          text-align: left
          overflow: hidden
          padding: 0 7px
          max-width: 190px
          &:hover,
          &:focus
            text-decoration: underline
        .actions
          color: rgba(#000, .54)
          padding: 7px 1px
          &:hover,
          &:focus
            color: rgba(#000, .87)
          a
            color: rgba(#000, .54)

    &__loader
      margin: 50px 0 0 363px
      width: 100px
</style>
