<template lang="pug">
  md-snackbar(md-position="bottom right"
              ref="snackbar"
              :md-duration="4000")
    span {{ text }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import { NOTIFICATION } from 'Admin/constants/customEvents';

  @Component
  class NotifyBox extends Vue {
    public text: string = 'Success';

    show (event: CustomEvent) {
      const snackbar = this.$refs.snackbar;
      this.text = event.detail;

      (<any>snackbar).open();
    }

    mounted () {
      document.addEventListener(NOTIFICATION, this.show);
    }
  }

  export default NotifyBox;
</script>

<style lang="sass"></style>
