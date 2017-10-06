<template lang="html">
  <section id="content">

    <section class="categorie-content" v-if="categorie">
      <h2 class="md-title">{{ categorie.title }}</h2>
      <md-button :href="`#/categories/${categorie.id}/edit`"
                 class="md-fab md-mini edit-btn">
       <md-icon>edit</md-icon>
       <md-tooltip md-delay="500">Редактировать</md-tooltip>
      </md-button>
      <section class="categorie-content__articles">
        <router-link class="categorie-content__articles__item"
                     v-for="article in categorie.articles"
                     :key="article.id"
                     :to="{ path: `/articles/${article.id}` }">
          {{article.title}}
          <md-tooltip md-delay="500">Открыть запись</md-tooltip>
        </router-link>
      </section>
      <article v-html="categorie.content" id="db-output"></article>
    </section>

    <not-found v-if="notFound" />

    <loader v-show="loading" />

  </section>
</template>

<script>
  export default {
    data: () => ({
      categorie: null,
      notFound: false,
      loading: false
    }),

    computed: {
      id() {
        return this.$route.params.id;
      }
    },

    methods: {
      getData() {
        const id = +this.id;

        if (!id) {
          this.notFound = true;
          return;
        }

        this.loading = true;

        const uniqueParam = (new Date()).getTime();

        this.$http
          .get(`../../../../server_scripts/get/categorie_content.php?id=${id}&${uniqueParam}`)
          .then(this.handleDataLoad)
      },

      handleDataLoad(response) {
        this.loading = false;

        const { data } = response;

        if (data) {
          this.notFound = false;
          this.categorie = response.data;
        } else {
          this.notFound = true;
          this.categorie = null;
        }
      },

      leave(id) {
        (this.id === id) && this.$router.replace('/');
      }
    },

    beforeDestroy() {
      this.$root.$off('categorie-delete', this.leave);
    },

    created() {
      this.getData();

      this.$root.$on('categorie-delete', this.leave);
    },

    watch: {
      $route() {
        this.categorie = null;

        this.notFound = false;

        this.getData();
      }
    }
  }
</script>

<style lang="sass">
#content
  .categorie-content
    h2
      line-height: 2.5rem
      margin: 6px 0 24px
      font-size: 1.25em
      float: left
    .edit-btn
      background-color: #4caf50
      color: #fff !important
      margin-left: 10px
      float: left

    &__articles
      margin-bottom: 16px
      clear: both
      float: left
      &__item
        text-decoration: underline
        line-height: 1.1rem
        transition: .25s
        font-size: 1rem
        display: block
        margin: 5px 0
        color: #111
        float: left
        clear: left
        &:hover,
        &:focus
          text-decoration: none
</style>
