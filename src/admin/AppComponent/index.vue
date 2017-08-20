<template lang="pug">
  #App
    warning-box(ref="warningBox" :text="warningText")

    notify-box(:text="notifyText" :active="notifyBoxIsActive")

    file-box(ref="fileBox"
             @warning="showWarning"
             @notify="showNotify")

    menu-sidebar(@fileBoxBtnClick="showFileBox")

    router-view(@notify="showNotify"
                @warning="showWarning"
                @fileBoxBtnClick="showFileBox")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import FileBox from 'admin/components/FileBoxComponent';
  import NotifyBox from 'admin/components/NotifyBoxComponent';
  import MenuSidebar from 'admin/components/SidebarComponent';

  @Component({
    components: {
      FileBox,
      NotifyBox,
      MenuSidebar
    }
  })

  class App extends Vue {
    public notifyBoxIsActive: boolean = false;
    public warningText: string = 'Предупреждение';
    public notifyText: string = 'Сохранено';

    /* get fileBox () {
      return this.$refs.fileBox.$children[0];
    }

    get warning () {
      return this.$refs.warningBox.firstChild.$children[0];
    } */

    showFileBox (): void {
      // this.fileBox.open()
    }

    showWarning (text: string): void {
      this.warningText = text;

      // this.warning.open()
    }

    showNotify (text: string): void {
      this.notifyText = text;
      this.notifyBoxIsActive = true;

      setTimeout(() => {
        this.notifyBoxIsActive = false;
      }, 3000)
    }
  }

  export default App;
</script>

<style lang="sass">
  @import '~@/default.sass'

  #App
    padding: 0 calc(50vw - 650px)
    background-color: #eee
    overflow: auto
    height: 100%
    width: 100%

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
