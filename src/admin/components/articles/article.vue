<template lang="html">
  <div id="content">

    <div v-if="article">
      <article v-html="article.content" id="db-output">{{ article.content }}</article>
      <time pubdate v-if="article.date" id="date">Дата: {{ formatDate(article.date) }}</time>
    </div>

    <not-found v-if="notFound" />

    <loader v-show="loading" />

  </div>
</template>

<script>
  export default {
    data: () => ({
      article: null,
      notFound: false,
      loading: false
    }),

    methods: {
      getData() {
        const id = +this.$route.params.id;

        if (!id) {
          this.notFound = true;
          return;
        }

        this.loading = true;

        const uniqueParam = (new Date()).getTime();

        this.$http
          .get(`../../../../server_scripts/get/article_content.php?id=${id}&${uniqueParam}`)
          .then(this.handleDataLoad)
      },

      handleDataLoad(response) {
        this.loading = false;

        const { data } = response;

        if (data) {
          this.notFound = false;
          this.article = response.data;
        } else {
          this.notFound = true;
          this.article = null;
        }
      },

      formatDate(date) {
        const parts = date.split('-');

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    },

    created() {
      this.getData();
    },

    watch: {
      $route () {
        this.article = null;

        this.notFound = false;

        this.getData();
      }
    }
  }
</script>
