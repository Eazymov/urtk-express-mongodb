<template lang="pug">
  md-dialog-alert(:md-content="text"
                  class="md-warn"
                  md-ok-text="Ок"
                  ref="warning")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import { Subscribe } from 'Admin/store';
  import { WARNING } from 'Admin/constants/actionTypes';

  interface Params {
    text: string;
  }

  @Component
  class WarningBox extends Vue {
    public text: string = 'Warning';

    @Subscribe(WARNING)
    public show (params: Params): void {
      const warning = this.$refs.warning;
      const text: string = params.text;
      this.text = text;

      console.error(text);

      (<any>warning).open();
    }
  }

  export default WarningBox;
</script>
