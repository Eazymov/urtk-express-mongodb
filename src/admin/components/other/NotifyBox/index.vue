<template lang="pug">
  md-snackbar(md-position="bottom right"
              ref="notifyBox"
              :md-duration="time")
    span {{ text }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import { Subscribe } from 'Admin/store';
  import { NOTIFY } from 'Admin/constants/actionTypes';

  interface Params {
    text: string;
    time?: number;
  }

  @Component
  class NotifyBox extends Vue {
    public text: string = '';
    public time: number = 3000;

    @Subscribe(NOTIFY)
    public async show (params: Params) {
      const notifyBox = this.$refs.notifyBox;
      const { text, time } = params;
      this.text = text;

      if (time) {
        await (this.time = time);
      }
      
      try {
        (<any>notifyBox).open();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  export default NotifyBox;
</script>

<style lang="sass"></style>
