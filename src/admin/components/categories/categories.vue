<template lang="html">
  <section id="content">

    <div class="categories-list">

      <div class="categories-list__head">
        <span class="md-title">Категории</span>
        <md-button href="#/categories/create"
                   class="md-icon-button md-fab md-mini add-btn">
          <md-icon>add</md-icon>
          <md-tooltip md-delay="500">Добавить категорию</md-tooltip>
        </md-button>

        <filter-box :options="columns"
                    class="categories-list__head__filter-box"
                    @queryChange="$val => filterQuery = $val"
                    @filterChange="$val => filter = $val" />
      </div>

      <md-whiteframe tag="table" md-elevation="2" class="categories-list__table">
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
            <th class="articles">Записи</th>
            <th class="actions" colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="categorie in filteredCategories" :class="{ 'visible': +categorie.visible }">
            <td class="id">{{ categorie.id }}</td>
            <td class="title">
              <router-link :to="{ path: `categories/${categorie.id}` }">
                {{ categorie.title }}
                <md-tooltip md-delay="500">Посмотреть содержание</md-tooltip>
              </router-link>
            </td>
            <td class="articles">
              <router-link class="article"
                           v-for="article in categorie.articles"
                           :key="article.id"
                           :to="{ path: `articles/${article.id}` }">
                {{ article.title }}
                <md-tooltip md-delay="500">Открыть запись</md-tooltip>
              </router-link>
            </td>
            <td class="actions">
              <md-button class="md-icon-button md-dense hide-btn"
                         @click.native="handleHide(categorie.id)">
                <md-icon>{{ categorie.visible ? 'visibility' : 'visibility_off' }}</md-icon>
                <md-tooltip md-delay="500">
                  {{ +categorie.visible ? 'Скрыть' : 'Показать' }}
                </md-tooltip>
              </md-button>
            </td>
            <td class="actions">
              <md-button :href="`#/categories/${categorie.id}/edit`"
                         class="md-icon-button md-dense edit-btn">
                <md-icon>edit</md-icon>
                <md-tooltip md-delay="500">Редактировать</md-tooltip>
              </md-button>
            </td>
            <td class="actions">
              <md-button class="md-icon-button md-dense del-btn"
                         @click.native="handleDelete(categorie.id)">
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
            text="Вы действительно хотите удалить категорию?" />

    <loader v-show="loading" class="categories-list__loader" />

  </section>
</template>

<script>
  export default {
    data: () => ({
      categories: [],
      sort: 'title',
      filter: 'title',
      filterQuery: '',
      reversed: false,
      columns: {
        'id': 'id',
        'Заголовок': 'title'
      },
      loading: true,
      promptCallback: null
    }),

    computed: {
      filteredCategories() {
        const filter = this.filter;
        const query = this.filterQuery.toLowerCase();
        const categories = this.sortedCategories;

        if (query)
          return categories
            .filter(el => el[filter].toLowerCase().includes(query));

        return categories;
      },

      sortedCategories() {
        const sort = this.sort;

        return this.categories.sort((a, b) => {
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
      getCategories() {
        const uniqueParam = (new Date()).getTime();

        return this.$http
          .get(`../../../../server_scripts/get/categories_list.php?${uniqueParam}`)
      },

      getArticles() {
        const uniqueParam = (new Date()).getTime();

        return this.$http
          .get(`../../../../server_scripts/get/articles_list.php?${uniqueParam}`)
      },

      getData() {
        const Axios = this.$http;

        Axios
          .all([this.getCategories(), this.getArticles()])
          .then(Axios.spread(this.spreadData))
      },

      spreadData(first, second) {
        this.loading = false;

        const [categories, articles] = [first.data, second.data]

        if (!categories.length) return;

        this.categories = categories;

        if (!articles.length) return;
        
        this.categories.forEach(categorie => {
          categorie['articles'] = articles.filter(article => {
            return article.categorie_id === categorie.id;
          })
        })
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

      handleDelete(id) {
        this.promptCallback = () => {
          this.$root.$emit('categorie-delete', id);

          this.$http
            .post(`../../../../server_scripts/delete/categorie.php`, {id: id});
        }

        this.$refs.prompt.$children[0].open()
      },

      deleteCategorie(id) {
        const categories = this.categories;
        const index = categories.findIndex(el => el.id === id);

        categories.splice(index, 1);
      },

      handleHide(id) {
        const categorie = this.categories.find(el => el.id === id);
        const copy = Object.assign({}, categorie);

        copy.visible = +copy.visible ? 0 : 1;

        delete copy.articles;

        this.$root.$emit('categorie-update', copy);

        this.$http
          .post(`../../../../server_scripts/update/categorie.php`, copy);
      },

      updateCategorie(obj) {
        const categories = this.categories;
        const index = categories.findIndex(el => el.id === obj.id);
        const categorie = categories[index];

        if (!categorie) return;

        for (const prop in categorie) {
          if (!obj.hasOwnProperty(prop)) continue;

          if (obj[prop] !== undefined)
            categorie[prop] = obj[prop];
        }

        this.$set(categories, index, categorie);
      }
    },

    beforeDestroy() {
      this.$root.$off('categorie-delete', this.deleteCategorie);

      this.$root.$off('categorie-update', this.updateCategorie);
    },

    created() {
      this.getData();

      this.$root.$on('categorie-delete', this.deleteCategorie);

      this.$root.$on('categorie-update', this.updateCategorie);
    }
  }
</script>

<style lang="sass">
#content
  .categories-list
    &__head
      padding-bottom: 16px
      position: relative
      width: 750px
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
      width: 750px

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
          &.title
            width: 190px
          &.articles
            width: 364px
          &.actions
            width: 138px

      tbody
        tr
          border-top: 1px solid #ccc
          color: rgba(#000, .54)
          transition: .2s
          a
            color: inherit
          &:hover
            background-color: #eee
          &.visible
            color: rgba(#000, .87)
          td
            font-size: .9125rem
            vertical-align: top
            padding: 13px 20px
            font-weight: 400
            height: 47px
          .id
            padding: 13px 0
          .title
            text-overflow: ellipsis
            white-space: nowrap
            max-width: 200px
            text-align: left
            overflow: hidden
            a:hover,
            a:focus
              text-decoration: underline
          .articles
            max-width: 364px
            text-align: left
            .article
              text-overflow: ellipsis
              display: inline-block
              white-space: nowrap
              line-height: 24px
              overflow: hidden
              width: 100%
              float: left
              &:hover,
              &:focus
                text-decoration: underline
          .actions
            padding: 7px 1px
            opacity: .62
            &:hover,
            &:focus
              opacity: 1

    &__loader
      margin: 50px 0 0 325px
      width: 100px
</style>
