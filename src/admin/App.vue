<template lang="html">
  <div id="App">

    <warning-box ref="warningBox" :text="warningText" />

    <notify-box :text="notifyText" :active="notifyBoxIsActive" />

    <file-box ref="fileBox"
              @warning="showWarning"
              @notify="showNotify" />

    <menu-sidebar @fileBoxBtnClick="showFileBox" />

    <router-view @notify="showNotify"
                 @warning="showWarning"
                 @fileBoxBtnClick="showFileBox" />

  </div>
</template>

<script>
import FileBox from './components/file-box.vue'
import NotifyBox from './components/notify-box.vue'
import MenuSidebar from './components/menu-sidebar.vue'

export default {
  components: {
    'file-box': FileBox,
    'notify-box': NotifyBox,
    'menu-sidebar': MenuSidebar
  },

  data: () => ({
    notifyBoxIsActive: false,
    warningText: 'Предупреждение',
    notifyText: 'Сохранено'
  }),

  computed: {
    fileBox() {
      return this.$refs.fileBox.$children[0]
    },

    warning() {
      return this.$refs.warningBox.$children[0]
    }
  },

  methods: {
    showFileBox() {
      this.fileBox.open()
    },

    showWarning(text) {
      this.warningText = text;

      this.warning.open()
    },

    showNotify(text) {
      this.notifyText = text;
      this.notifyBoxIsActive = true;

      setTimeout(() => {
        this.notifyBoxIsActive = false;
      }, 3000)
    }
  }
}
</script>

<style lang="sass">
*,
*::before,
*::after
  outline: none
  padding: 0
  margin: 0

button::-moz-focus-inner
  border: 0

input
  background-color: #fff

input:invalid,
select:invalid
  -moz-mox-shadow: none
  box-shadow: none

a
  text-decoration: none

img
  border: none

html, body
  font-family: Roboto, Noto Sans, Noto, sans-serif
  color: rgba(#000, .87)
  min-width: 1300px
  font-size: 16px
  height: 100%
  width: 100%

#App
  padding: 0 calc(50vw - 650px)
  background-color: #eee
  overflow: auto
  height: 100%

  .md-card,
  .md-whiteframe
    overflow: visible

  .mce-panel
    background-color: #fff
    .mce-btn:not(.mce-primary)
      background-color: #fff
      border: none

.md-dialog
  margin-bottom: 13vh
  overflow: visible
  font-size: 14px

#content
  padding: 36px 0 75px 348px
  width: 100%
  &::after
    clear: both
    display: table
    content: ''

#db-output
  float: left
  width: 100%
  a
    text-decoration: underline
  *
    border-collapse: collapse
    padding: 2px
    margin: 2px

#date
  margin-top: 25px
  font-size: .9em
  display: block
  float: right

.google-loader
  margin: 150px 0 0 300px
  width: 100px
</style>
