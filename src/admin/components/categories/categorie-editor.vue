<template lang="html">
  <section id="content">

    <md-card class='categorie-editor'>
      <form @submit.prevent="sendData">
        <h2 class="md-title">Название {{ id ? '' : 'новой' }} категории</h2>
        <input v-model="title"
               class='categorie-editor__title'
               type='text'
               autocomplete='off'
               required />
        <span class="highlighter"></span>

        <h2 class="md-title">Содержание {{ id ? '' : '(не обязательно)' }}</h2>
        <textarea id="categorieContent"></textarea>

        <material-button class="categorie-editor__submit"
                         ref="submitButton"
                         :text="'Сохранить'"
                         :type="'submit'"
                         :disabled="loading" />

        <loader class="categorie-editor__loader" v-show="loading" />
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
      categorie: {},
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

        tinymce.get('categorieContent').setContent('');
      },

      getData() {
        const id = +this.id;
        const uniqueParam = (new Date()).getTime();

        if (!id) return;

        this.$http
          .get(`../../../../server_scripts/get/categorie_content.php?id=${id}&${uniqueParam}`)
          .then(this.handleDataLoad)
          .catch(error => console.log(error))
      },

      handleDataLoad(response) {
        if (!this.id) return;

        const { title, content } = response.data;

        if (title === undefined || content === undefined) return;

        this.title = title;

        try {
          tinymce.get('categorieContent').setContent(content);
          this.showFloatButton();
        } catch (e) {
          console.log('Error when setting content. Source: categorie editor');
        }
      },

      sendData() {
        const data = {};
        const goal = this.purpose;

        this.loading = true;

        data['id']      = this.id;
        data['title']   = this.title;
        // data['content'] = tinymce.get('categorieContent').getContent();
        data['content'] = '';

        this.$http
          .post(`/categories/${goal}`, data)
          .then(this.handleAjaxLoad)
          .catch(this.handleAjaxError)
      },

      handleAjaxLoad(response) {
        this.loading = false;

        const data = response.data;
        const goal = this.purpose;

        if (goal === 'create') {
          this.$emit('notify', 'Категория успешно добавлена');
        } else {
          this.$emit('notify', 'Данные успешно обновлены');
        }

        if (typeof data === 'object') {
          const id = data._id;

          this.$router.replace(`/categories/${id}/edit`);

          this.$root.$emit(`categorie-${goal}`, data);
        } else {
          this.handleAjaxError();
        }
      },

      handleAjaxError(err) {
        console.error(err);

        this.loading = false;

        const errorText = 'В процессе сохранения данных произошла ошибка';

        this.$emit('warning', errorText);
      },

      leave(id) {
        (this.id === id) && this.$router.replace('/');
      }
    },

    mounted() {
      const config = this.$root.tinyMceCfg;

      config.init_instance_callback = this.getData;

      tinymce.init(config);

      this.$root.$el.onscroll = this.showFloatButton;
    },

    beforeDestroy() {
      this.$root.$off('categorie-delete', this.leave);

      tinymce.remove();

      this.$root.$el.onscroll = null;
    },

    created() {
      this.$root.$on('categorie-delete', this.leave);
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
  .categorie-editor
    position: relative
    background: #fff
    padding: 0 16px
    width: 882px

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
      display: inline-block
      padding: 3px 5px 2px
      font-family: inherit
      font-size: 1.1em
      width: 850px
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
