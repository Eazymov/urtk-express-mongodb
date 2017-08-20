<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Api from 'api';

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

    public get panelTextEdit () {
      return this.$refs.panelTextEdit;
    }

    getData (): void {
      Api.Homepage
        .get()
        .then(this.handleDataLoad)
        .catch(console.error);
    }

    handleDataLoad (response: ApiResponse): void {
      const { homepage, err } = response.data;

      if (err)
        throw err;

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
        .then(this.handleAjaxLoad)
        .catch(this.handleAjaxError);
    }

    handleAjaxLoad (response: ApiResponse): void {
      const { err } = response.data;

      this.loading = false;

      if (err)
        throw err;

      this.$emit('notify', 'Data has been successfully updated');
    }

    handleAjaxError (err: Error): void {
      const errText = err.message;

      console.error(errText)

      this.loading = false;

      this.$emit('warning', errText);
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
