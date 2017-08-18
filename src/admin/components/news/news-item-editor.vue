<template lang="html">
  <section id="content">

    <md-card class='news-editor'>
      <form @submit.prevent="sendData">
        <h2 class="md-title">Title</h2>
        <input v-model="title"
               class='news-editor__title'
               type='text'
               autocomplete='off'
               required />
        <span class="highlighter"></span>

        <h2 class="md-title">Content</h2>
        <textarea id="newsContent"></textarea>

        <material-button class="news-editor__submit"
                         ref="submitButton"
                         :text="'Сохранить'"
                         :type="'submit'"
                         :disabled="loading" />

        <loader class="news-editor__loader" v-show="loading" />
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
      loading: false,
      title: '',
      submitIsScrolled: false
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
        this.submitIsScrolled = false;

        tinymce.get('newsContent').setContent('');
      },

      getData() {
        const id = this.id;
        const select = '-_id title content';

        if (!id) return;

        this.$http
          .get(`/news/${id}`, { params: {select} })
          .then(this.handleDataLoad)
          .catch(err => console.error(err.message))
      },

      handleDataLoad(response) {
        if (!this.id) return;

        const { title, content } = response.data;

        if (title === undefined || content === undefined) return;

        this.title = title;

        try {
          tinymce.get('newsContent').setContent(content);
          this.showFloatButton();
        } catch (err) {
          console.error(err.message);
        }
      },

      sendData() {
        const id = this.id;
        const goal = this.purpose;
        const title = this.title;
        const content = tinymce.get('newsContent').getContent();
        const data = { title, content };

        this.loading = true;

        this.$http
          .post(`/news/${goal}`, { id, data })
          .then(this.handleAjaxLoad)
          .catch(this.handleAjaxError)
      },

      handleAjaxLoad(response) {
        this.loading = false;

        const { data } = response;
        const { _id, err } = data;

        if (err) {
          throw err;
        }

        if (this.purpose === 'create') {
          this.$emit('notify', 'Новость успешно добавлена');

          this.$router.replace(`/news/${_id}/edit`);

        } else {
          this.$emit('notify', 'Данные успешно обновлены');
        }
      },

      handleAjaxError(err) {
        const errText = err.errmsg || err.message;

        console.error(errText);

        this.loading = false;

        this.$emit('warning', errText);
      }
    },

    mounted() {
      const config = this.$root.tinyMceCfg;

      config.init_instance_callback = this.getData;

      tinymce.init(config);

      this.$root.$el.onscroll = this.showFloatButton;
    },

    beforeDestroy() {
      tinymce.remove();

      this.$root.$el.onscroll = null;
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
  .news-editor
    padding: 0 16px 16px
    position: relative
    background: #fff
    width: 884px

    h2.md-title
      display: inline-block
      margin: 16px 0 4px
      position: relative
      font-size: 1.25rem
      &::after
        background-repeat: no-repeat
        background-size: cover
        position: absolute
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

    &__title
      border: none
      border-bottom: 1px solid #bbb
      background-color: #fff
      padding: 3px 5px 2px
      font-family: inherit
      border-radius: 2px
      font-size: 1.1rem
      width: 850px
      &:focus + .highlighter
        width: 100%
    .highlighter
      background: #4a89dc
      position: relative
      margin: -1px auto
      transition: .2s
      display: block
      height: 2px
      z-index: 2
      width: 0

    &__submit
      margin: 16px auto 0
      position: relative
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
