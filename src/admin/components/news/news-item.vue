<template lang="html">
  <section id="content">

    <div v-if="news">
      <article v-html="news.content" id="db-output"></article>
      <time pubdate id="date">Pubdate: {{ news.pubdate }}</time>
    </div>

    <not-found v-if="notFound" />

    <loader v-show="loading" />

  </section>
</template>

<script>
  export default {
    data: () => ({
      news: null,
      notFound: false,
      loading: false
    }),

    methods: {
      getData() {
        const id = this.$route.params.id;
        const select = '-_id content pubdate';

        if (!id) {
          this.notFound = true;
          return;
        }

        this.loading = true;

        this.$http
          .get(`/news/${id}`, { params: {select} })
          .then(this.handleDataLoad)
          .catch(err => console.error(err.message))
      },

      handleDataLoad(response) {
        this.loading = false;

        const { data } = response;

        if (data) {
          this.notFound = false;
          this.news = response.data;
        } else {
          this.notFound = true;
          this.news = null;
        }
      }
    },

    created() {
      this.getData();
    },

    watch: {
      $route() {
        this.news = null;

        this.notFound = false;

        this.getData();
      }
    }
  }
</script>
