<template lang="html">
  <section id="content">

    <md-card class='article-editor'>
      <form @submit.prevent="sendData">
        <span class="md-title">Заголовок</span>

        <div class="title-categorie">
          <input v-model="title"
                 class='title'
                 type='text'
                 autocomplete='off'
                 required />

          <md-input-container class="categorie"
                              :class="{ 'md-input-invalid': !categorieIsSelected }">
            <label for="categorieID">Категория</label>
            <md-select id="categorieID" v-model="categorieID">
              <md-option v-for="categorie in categories"
                         :value="categorie.id"
                         :key="categorie.id">
                {{ categorie.title }}
              </md-option>
            </md-select>
          </md-input-container>
          <span class="highlighter"></span>
        </div>

        <md-checkbox v-if="purpose === 'create'"
                     id="saveAsNews"
                     v-model="saveAsNews"
                     class="md-primary saveAsNews">Сохранить так же как новость</md-checkbox>
        <br />

        <span class="md-title">Содержание</span>
        <textarea id="articleContent"></textarea>

        <material-button class="article-editor__submit"
                         ref="submitButton"
                         :text="'Сохранить'"
                         :type="'submit'"
                         :disabled="loading" />

        <loader class="article-editor__loader" v-show="loading" />
      </form>
    </md-card>

    <float-submit @click.native="submitButton.click"
                  :active="submitIsScrolled"
                  :loading="loading" />

  </section>
</template>

<script>
  export default {
    data: () => ({
      categories: [],
      categorieID: '',
      loading: false,
      title: '',
      saveAsNews: false,
      submitIsScrolled: false,
      categorieIsSelected: true
    }),

    computed: {
      id() {
        return this.$route.params.id || false;
      },

      purpose() {
        return this.id ? 'update' : 'create';
      },

      submitButton() {
        const button = this.$refs.submitButton;

        return button ? button.$el : false;
      }
    },

    methods: {
      showFloatButton(e) {
        const button = this.submitButton;

        if (!button) return;

        const coords = button.getBoundingClientRect();

        if (coords.top > window.innerHeight)
          this.submitIsScrolled = true;
        else
          this.submitIsScrolled = false;
      },

      reset() {
        this.title = '';
        this.categorieID = '';
        this.saveAsNews = false;
        this.submitIsScrolled = false;

        tinymce.get('articleContent').setContent('');
      },

      getCategories() {
        const uniqueParam = (new Date()).getTime();

        this.$http
          .get(`../../../../server_scripts/get/categories_list.php?${uniqueParam}`)
          .then(response => this.categories = response.data)
          .catch(error => console.log(error))
      },

      getArticle() {
        const id = +this.id;
        const uniqueParam = new Date().getTime();

        if (!id) return;

        this.$http
          .get(`../../../../server_scripts/get/article_content.php?id=${id}&${uniqueParam}`)
          .then(this.handleArticleLoad)
          .catch(error => console.log(error))
      },

      handleArticleLoad(response) {
        if (!this.id) return;

        const { title, categorie_id, content } = response.data;

        if (title === undefined ||
            categorie_id === undefined ||
            content === undefined) return;

        this.title = title;
        this.categorieID = categorie_id;

        try {
          tinymce.get('articleContent').setContent(content);
          this.showFloatButton();
        } catch (e) {
          console.log('Error when setting content. Source: article editor');
        }
      },

      getData() {
        this.getCategories();
        this.getArticle();
      },

      sendData() {
        const data = {};
        const goal = this.purpose;

        if (!this.categorieID) {
          this.categorieIsSelected = false
          return;
        }

        this.loading = true;

        data['id'] = this.id;
        data['title'] = this.title;
        data['content'] = tinymce.get('articleContent').getContent();
        data['saveAsNews'] = this.saveAsNews;
        data['categorie_id'] = this.categorieID;

        this.$http
          .post(`../../../../server_scripts/${goal}/article.php`, data)
          .then(this.handleAjaxLoad)
          .catch(this.handleAjaxError)
      },

      handleAjaxLoad(res) {
        this.loading = false;

        const data = res.data;

        if (data === 'error') {
          this.handleAjaxError();
        }

        if (this.purpose === 'create') {
          this.$emit('notify', 'Запись успешно добавлена');

          const id = data.id;

          if (typeof id === 'string') {
            this.$router.replace(`/articles/${id}/edit`);
          } else {
            this.handleAjaxError();
          }
        } else {
          this.$emit('notify', 'Данные успешно обновлены');
        }
      },

      handleAjaxError(err) {
        console.error(err);

        this.loading = false;

        const errorText = 'В процессе сохранения данных произошла ошибка';

        this.$emit('warning', errorText);
      },

      updateCategories(id) {
        const categories = this.categories;
        const index = categories.findIndex(el => el.id === id);

        categories.splice(index, 1);
      }
    },

    mounted() {
      const config = this.$root.tinyMceCfg;

      config.init_instance_callback = this.getData;

      tinymce.init(config);

      this.$root.$el.onscroll = this.showFloatButton;
    },

    beforeDestroy() {
      this.$root.$off('categorie-delete', this.updateCategories);

      tinymce.remove();

      this.$root.$el.onscroll = null;
    },

    created() {
      this.$root.$on('categorie-delete', this.updateCategories);
    },

    watch: {
      $route() {
        this.reset();
        this.getData();
      }
    }
  }
</script>

<style lang="sass">
  .article-editor
    padding: 0 16px
    position: relative
    background: #fff
    width: 882px

    .md-title
      display: inline-block
      margin: 16px 0 4px
      position: relative
      font-size: 1.25rem
      &::after
        background-repeat: no-repeat
        background-size: cover
        position: absolute
        display: block
        height: 24px
        opacity: .54
        right: -25px
        width: 24px
        content: ''
        top: 4px
      &:first-of-type::after
        background-image: url('../../../assets/icons/title.png')
      &:last-of-type::after
        background-image: url('../../../assets/icons/subject.png')

    .title-categorie
      margin-bottom: 5px
      overflow: hidden
      width: 100%
      .title
        border: none
        border-bottom: 1px solid #bbb
        background-color: #fff
        display: block
        font-family: inherit
        padding: 3px 5px 2px
        margin-right: -1px
        font-size: 1.1rem
        width: 680px
        height: 28px
        float: left
        &:focus ~ .highlighter
          width: 100%
      .highlighter
        background: #4a89dc
        margin: -1px auto
        position: relative
        display: block
        transition: .2s
        height: 2px
        z-index: 2
        width: 0
        float: left

      .categorie
        border-bottom: 1px solid #bbb
        display: block
        min-height: 28px
        width: 170px
        height: 28px
        padding: 0
        margin: 0
        float: left
        &::after
          height: 0
        &.md-has-value label
          font-size: .9rem
          top: -18px
        label
          font-size: 1.1rem
          top: 3px
        .md-select
          height: 28px
          .md-menu
            height: 28px
            .md-select-value
              line-height: 29px
              font-size: 1.1rem
              height: 28px

    .saveAsNews
      letter-spacing: normal
      font-weight: normal
      font-size: 1.25rem
      margin-bottom: 0
      cursor: pointer

    &__submit
      position: relative
      margin: 16px auto
      display: block
      width: 180px

    &__loader
      left: calc(50% - 25px)
      position: absolute
      bottom: -60px
      height: 50px
      width: 50px
      margin: 0
</style>
