<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Action } from 'Utils/observable';

  import Api from 'Api';
  import {
    NOTIFY,
    WARNING,
    OPEN_FILE_BOX,
  } from 'Admin/constants/actionTypes';

  @Component
  class Sponsors extends Vue {
    public sponsors: Sponsor[] = [];
    public loading: boolean = true;
    public promptCallback: () => void = () => {};

    @Action(NOTIFY)
    public notify: (params: { text: string }) => void;

    @Action(WARNING)
    public showWarning: (params: { text: string }) => void;

    @Action(OPEN_FILE_BOX)
    public openFileBox: () => void;

    private getData (): void {
      Api.Sponsor
        .get()
        .then(this.handleDataLoad)
        .catch((err: Error) => this.showWarning({
          text: err.message,
        }));
    }

    private handleDataLoad (sponsors: Sponsor[]): void {
      this.loading = false;

      this.sponsors = sponsors;
    }

    private addSponsor (obj: Sponsor): void {
      this.sponsors.push(obj);
    }

    public deleteSponsor (logo: string): void {
      this.promptCallback = () => {
        const sponsors: Sponsor[] = this.sponsors;
        const index: number = sponsors.findIndex((el: Sponsor) => {
          return el.logo === logo;
        });

        if (index === undefined) return;

        sponsors.splice(index, 1);

        Api.Sponsor
          .delete(logo)
          .then(() => this.notify({
            text: 'Deleted',
          }))
          .catch((err: Error) => this.showWarning({
            text: err.message,
          }));
      }

      (<any>this.$refs.prompt).$children[0].open()
    }

    public beforeDestroy (): void {
      this.$root.$off('sponsor-add', this.addSponsor);
    }

    public created (): void {
      this.getData();

      this.$root.$on('sponsor-add', this.addSponsor);
    }
  }

  export default Sponsors;
</script>

<style lang="sass" src="./style"></style>
