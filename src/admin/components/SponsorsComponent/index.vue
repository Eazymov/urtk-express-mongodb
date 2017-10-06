<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Axios from 'axios';

  import Api from 'Api';

  @Component
  class Sponsors extends Vue {
    public sponsors: Sponsor[] = [];
    public loading: boolean = true;
    public promptCallback: () => void = () => {};

    getData (): void {
      Api.Sponsor
        .get()
        .then(this.handleDataLoad)
        .catch(console.error);
    }

    handleDataLoad (sponsors: Sponsor[]): void {
      this.loading = false;

      this.sponsors = sponsors;
    }

    addSponsor (obj: Sponsor): void {
      this.sponsors.push(obj);
    }

    deleteSponsor (logo: string): void {
      this.promptCallback = () => {
        const sponsors: Sponsor[] = this.sponsors;
        const index: number = sponsors.findIndex((el: Sponsor) => {
          return el.logo === logo;
        });

        if (!index) return;

        sponsors.splice(index, 1);

        Axios
          .post('/api/sponsors/delete', { logo })
          .catch(console.error);
      }

      (<any>this.$refs.prompt).$children[0].open()
    }

    beforeDestroy (): void {
      this.$root.$off('sponsor-add', this.addSponsor);
    }

    created (): void {
      this.getData();

      this.$root.$on('sponsor-add', this.addSponsor);
    }
  }

  export default Sponsors;
</script>

<style lang="sass" src="./style"></style>
