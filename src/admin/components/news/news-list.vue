<template lang="html">
  <section id="content">

    <div class="news-list">

      <div class="news-list__head">
        <span class="md-title">News</span>
        <md-button href="#/news/create"
                   class="md-icon-button md-fab md-mini add-btn">
          <md-icon>add</md-icon>
          <md-tooltip md-delay="500">Add news</md-tooltip>
        </md-button>

        <filter-box :options="columns"
                    class="news-list__head__filter-box"
                    @queryChange="$val => filterQuery = $val"
                    @filterChange="$val => filter = $val" />
      </div>

      <md-whiteframe md-elevation="2" md-tag="table" class="news-list__table">
        <thead>
          <tr>
            <th v-for="(value, key) in columns"
                :key="key"
                :class="[value, { 'sorted': sort === value }]"
                @click="setSort(value)">
              <md-icon class="md-18">
                {{ reversed ? 'arrow_downward' : 'arrow_upward' }}
              </md-icon>
              {{ key }}
              <md-tooltip md-delay="500">Sort</md-tooltip>
            </th>
            <th class="actions" colspan="2"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredNews">
            <td class="_id">{{ item._id.slice(-3) }}</td>
            <td class="pubdate">
              <router-link :to="{ path: `news/${item._id}` }">
                {{ item.pubdate }}
              </router-link>
            </td>
            <td class="updated">
              <router-link :to="{ path: `news/${item._id}` }">
                {{ item.updated || 'None' }}
              </router-link>
            </td>
            <td class="title">
              <router-link :to="{ path: `news/${item._id}` }">
                {{ item.title }}
              </router-link>
            </td>
            <td class="actions">
              <md-button :href="`#/news/${item._id}/edit`"
                         class="md-icon-button md-dense edit-btn">
                <md-icon>edit</md-icon>
                <md-tooltip md-delay="500">Edit</md-tooltip>
              </md-button>
            </td>
            <td class="actions">
              <md-button class="md-icon-button md-dense del-btn"
                         @click.native="deleteNews(item._id)">
                <md-icon>delete_forever</md-icon>
                <md-tooltip md-delay="500">Delete</md-tooltip>
              </md-button>
            </td>
          </tr>
        </tbody>
      </md-whiteframe>
    </div>

    <prompt ref="prompt"
            :callback="promptCallback"
            text="Are you sure to delete this news?" />

    <loader v-show="loading" class="news-list__loader" />
  </section>
</template>

<script>
  export default {
    data: () => ({
      news: [],
      sort: 'pubdate',
      filter: 'title',
      filterQuery: '',
      reversed: false,
      columns: {
        'id': '_id',
        'Pubdate': 'pubdate',
        'Updated': 'updated',
        'Title': 'title'
      },
      loading: true,
      promptCallback: null
    }),

    computed: {
      filteredNews() {
        const filter = this.filter;
        const query = this.filterQuery.toLowerCase();
        const news = this.sortedNews;

        if (query)
          return news
            .filter(elem => elem.toLowerCase().includes(query))

        return news;
      },

      sortedNews() {
        const sort = this.sort;

        return this.news.sort((a, b) => {
          let prev = a[sort];
          let next = b[sort];

          if (this.reversed) {
            [prev, next] = [next, prev];
          }

          return prev < next ? 1 : -1;
        })
      }
    },

    methods: {
      getData() {
        const select = '_id pubdate updated title';

        this.$http
          .get('/news', { params: {select} })
          .then(this.handleDataLoad)
          .catch(err => console.error(err.message))
      },

      handleDataLoad(response) {
        this.loading = false;

        const { data } = response

        if (!data.length) return;

        this.news = data
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

      deleteNews(_id) {
        this.promptCallback = () => {
          const news = this.news;
          const index = news.findIndex(el => el._id === _id);

          news.splice(index, 1);

          this.$http.post('/news/delete', { _id });
        }

        this.$refs.prompt.$children[0].open()
      }
    },

    created() {
      this.getData();
    }
  }
</script>

<style lang="sass">
#content
  .news-list
    &__head
      padding-bottom: 16px
      position: relative
      width: 850px
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
      width: 850px

      thead
        border-bottom: 1px solid #ccc
        color: rgba(#000, .54)
        line-height: 36px
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

          &._id
            width: 58px
          &.pubdate,
          &.updated
            width: 122px
          &.title
            width: 454px
          &.actions
            width: 94px

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
        ._id
          padding: 0
        .pubdate,
        .updated
          text-decoration: underline
        .title
          text-overflow: ellipsis
          white-space: nowrap
          max-width: 454px
          overflow: hidden
          text-align: left
          a:hover
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
      margin: 50px 0 0 375px
      width: 100px
</style>
