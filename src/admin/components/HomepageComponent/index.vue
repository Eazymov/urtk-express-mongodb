<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Action } from 'vuex-class';
  import Api from 'Api';

  import Editor from './simpleEditor';

  const tagRegex = /(<[^>]*>)|(&nbsp;)|( )/gi

  @Component
  class HomePage extends Vue {
    public stage: string = '';
    public panelText: string = '';
    public loading: boolean = false;
    public stageIsValid: boolean = true;
    public panelTextIsValid: boolean = true;
    public Editor: {} = Editor;

    @Action notify: (text: string) => void;
    @Action showWarning: (text: string) => void;

    public get panelTextEdit () {
      return this.$refs.panelTextEdit;
    }

    getData (): void {
      Api.Homepage
        .get()
        .then(this.handleDataLoad)
        .catch(console.error);
    }

    handleDataLoad (homepage: Homepage): void {
      const { stage, panelText } = homepage;

      this.stage = stage;
      this.panelText = panelText;
    }

    clearHTML (html: string): string {
      return html.trim().replace(tagRegex, '');
    }

    sendData (): void {
      const stage: string = this.stage;
      const panelText: string = (<any>this.panelTextEdit).innerHTML;

      if (!stage) {
        this.stageIsValid = false;
        return;
      }

      if (!this.clearHTML(panelText)) {
        this.panelTextIsValid = false;
        return;
      }

      this.loading = true;

      const updates: Homepage = { stage, panelText };

      Api.Homepage
        .update(updates)
        .then(this.handleUpdate)
        .catch(this.handleUpdateReject);
    }

    handleUpdate (): void {
      this.loading = false;

      this.notify('Data has been successfully updated');
    }

    handleUpdateReject (err: Error): void {
      const errText = err.message;

      console.error(errText)

      this.loading = false;

      this.showWarning(errText);
    }

    created () {
      this.getData();
    }

    mounted () {
      setTimeout(() => {
        const input = this.$el.querySelector('input');

        if (input)
          input.focus();
      }, 300);
    }
  }

  export default HomePage;
</script>

<style lang="sass" src="./style"></style>
