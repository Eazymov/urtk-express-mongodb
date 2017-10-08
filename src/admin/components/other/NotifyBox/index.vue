<template lang="pug">
  md-snackbar(md-position="bottom right"
              ref="notifyBox"
              :md-duration="notificationTime")
    span {{ notificationText }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { State, Action, namespace } from 'vuex-class';
  
  const notificationState = namespace('notification', State);
  const notificationAction = namespace('notification', Action);

  @Component
  class NotifyBox extends Vue {
    @notificationState public notificationText: string;
    @notificationState public notificationTime: number;

    @notificationAction private setNotifyBox: (notifyBox: any) => void;

    public mounted (): void {
      const notifyBox = this.$refs.notifyBox;

      if (notifyBox) {
        this.setNotifyBox(notifyBox);
      }
    }
  }

  export default NotifyBox;
</script>

<style lang="sass"></style>
