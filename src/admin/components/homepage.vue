<template lang="html">
  <div id="content">

    <md-whiteframe md-elevation="2" class="homepage-editor">
      <form @submit.prevent="sendData">
        <span class="md-title">Stage</span>
        <input class="homepage-editor__stage"
               @input="stageIsValid = true"
               v-model="stage"
               :class="{ 'nonValid': !stageIsValid }" />
        <span class="highlighter"></span>

        <span class="md-title">Main panel text</span>
        <div class="homepage-editor__command-panel">
          <button type="button"
                  v-for="command in commands"
                  class="homepage-editor__command-panel__btn"
                  @click="command.action"
                  :class="command.name">
            <md-tooltip md-delay="500">{{ command.name }}</md-tooltip>
          </button>
        </div>
        <div ref="panelTextEdit"
             contentEditable="true"
             class="homepage-editor__panel-text"
             v-html="panelText"
             @keydown="panelTextIsValid = true"
             :class="{ 'nonValid': !panelTextIsValid }">
        </div>

        <material-button class="homepage-editor__submit"
                         :type="'submit'"
                         :text="'Save'"
                         :disabled="loading" />

        <loader class="homepage-editor__loader" v-show="loading" />
      </form>
    </md-whiteframe>

  </div>
</template>

<script>
  const tagRegex = /(<[^>]*>)|(&nbsp;)|( )/gi

  export default {
    data: () => ({
      stage: '',
      panelText: '',
      loading: false,
      stageIsValid: true,
      panelTextIsValid: true
    }),

    computed: {
      panelTextEdit() {
        return this.$refs.panelTextEdit;
      },

      commands() {
        return [
          {
            name: 'removeFormat',
            action: this.removeFormat
          }, {
            name: 'bold',
            action: this.bold
          }, {
            name: 'italic',
            action: this.italic
          }, {
            name: 'underline',
            action: this.underline
          }, {
            name: 'subscript',
            action: this.subscript
          }, {
            name: 'superscript',
            action: this.superscript
          }
        ]
      }
    },

    methods: {
      getData() {
        this.$http
          .get('/homepage')
          .then(this.handleDataLoad)
          .catch(err => console.error(err.message));
      },

      handleDataLoad(response) {
        const { homepage, err } = response.data;

        if (err)
          throw err;

        const { stage, panelText } = homepage;

        this.stage = stage;
        this.panelText = panelText;
      },

      removeFormat() {
        document.execCommand('removeFormat');
      },

      bold() {
        document.execCommand('bold');
      },

      italic() {
        document.execCommand('italic');
      },

      underline() {
        document.execCommand('underline');
      },

      subscript() {
        document.execCommand('subscript');
      },

      superscript() {
        document.execCommand('superscript');
      },

      clearHTML(html) {
        return html.trim().replace(tagRegex, '');
      },

      sendData(e) {
        const stage = this.stage;
        const panelText = this.panelTextEdit.innerHTML;

        if (!stage) {
          this.stageIsValid = false;
          return;
        }

        if (!this.clearHTML(panelText)) {
          this.panelTextIsValid = false;
          return;
        }

        this.loading = true;

        const data = { stage, panelText };

        this.$http
          .post('/homepage/update', data)
          .then(this.handleAjaxLoad)
          .catch(this.handleAjaxError);
      },

      handleAjaxLoad(response) {
        const { err } = response.data;

        this.loading = false;

        if (err)
          throw err;

        this.$emit('notify', 'Data has been successfully updated');
      },

      handleAjaxError(err) {
        const errText = err.message || err.errmsg;

        console.error(errText)

        this.loading = false;

        this.$emit('warning', errText);
      }
    },

    created() {
      this.getData();
    },

    mounted() {
      setTimeout(() => {
        this.$el.querySelector('input').focus();
      }, 300);
    }
  }
</script>

<style lang="sass">
  .homepage-editor
    position: relative
    border-radius: 2px
    margin-left: 50px
    background: #fff
    padding: 0 16px
    height: 458px
    width: 532px
    .md-title
      display: inline-block
      position: relative
      margin: 16px 0 4px
      &::after
        background-repeat: no-repeat
        background-size: cover
        position: absolute
        height: 24px
        opacity: .54
        right: -25px
        width: 24px
        content: ''
        top: 1px
      &:first-of-type::after
        background-image: url('../../assets/icons/title.png')
      &:last-of-type::after
        background-image: url('../../assets/icons/subject.png')

    &__stage
      background-color: transparent
      border: none
      border-bottom: 1px solid #999
      padding: 3px 5px 2px
      font-family: inherit
      font-size: 1.1rem
      font-weight: 400
      width: 500px
      &:focus + .highlighter
        width: 100%
      &.nonValid + .highlighter
        background: #f44336
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

    &__command-panel
      margin-bottom: 6px
      height: 30px
      &__btn
        box-shadow: 0 1px 0 rgba(#000, .3)
        background-repeat: no-repeat
        background-position: 2px 2px
        background-size: 24px 24px
        background-color: #fff
        border: 1px solid #bbb
        display: inline-block
        border-radius: 2px
        margin-right: 5px
        cursor: pointer
        transition: .2s
        height: 30px
        opacity: .87
        width: 30px
        &.removeFormat
          background-image: url('../../assets/icons/clear.png')
        &.bold
          background-image: url('../../assets/icons/bold.png')
        &.italic
          background-image: url('../../assets/icons/italic_black.png')
        &.underline
          background-image: url('../../assets/icons/underlined.png')
        &.subscript
          background-image: url('../../assets/icons/subscript.png')
        &.superscript
          background-image: url('../../assets/icons/superscript.png')
        &:hover,
        &:focus
          box-shadow: 0 1px 2px rgba(#000, .2)

    &__panel-text
      background-color: #fff
      border: 1px solid #bbb
      font-family: inherit
      padding: 8px 10px
      font-size: 1.1rem
      font-weight: 400
      overflow-y: auto
      height: 230px
      width: 500px
      &.nonValid
        border: 2px solid #f44336
      &:focus
        border-color: #1976d2

    &__submit
      width: 180px !important
      position: relative
      margin: 16px auto
      display: block

    &__loader
      left: calc(50% - 25px)
      position: absolute
      bottom: -60px
      height: 50px
      width: 50px
      margin: 0
</style>
