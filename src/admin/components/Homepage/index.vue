<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Api from 'Api';

  import Editor from './simpleEditor';
  import { Action } from 'Admin/store';
  import { NOTIFY, WARNING } from 'Admin/constants/actionTypes';

  const tagRegex = /(<[^>]*>)|(&nbsp;)|( )/gi;

  @Component
  class HomePage extends Vue {
    public stage: string = '';
    public panelText: string = '';
    public loading: boolean = false;
    public stageIsValid: boolean = true;
    public panelTextIsValid: boolean = true;
    public Editor: {} = Editor;

    @Action(NOTIFY)
    private notify: (params: { text: string }) => void;

    @Action(WARNING)
    private showWarning: (params: { text: string }) => void;

    public get panelTextEdit () {
      return this.$refs.panelTextEdit;
    }

    private getData (): void {
      Api.Homepage
        .get()
        .then(this.handleDataLoad)
        .catch(console.error);
    }

    private handleDataLoad (homepage: Homepage): void {
      const { stage, panelText } = homepage;

      this.stage = stage;
      this.panelText = panelText;
    }

    private clearHTML (html: string): string {
      return html.trim().replace(tagRegex, '');
    }

    public sendData (): void {
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

    private handleUpdate (): void {
      this.loading = false;

      this.notify({
        text: 'Data has been successfully updated',
      });
    }

    private handleUpdateReject (err: Error): void {
      this.loading = false;
      this.showWarning({
        text: err.message,
      });
    }

    public created (): void {
      this.getData();
    }

    public mounted (): void {
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
