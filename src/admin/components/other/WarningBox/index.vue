<template lang="pug">
  md-dialog-alert(:md-content="text"
                  class="md-warn"
                  md-ok-text="Ок"
                  ref="warning")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import { WARNING } from 'Admin/constants/customEvents';

  @Component
  class WarningBox extends Vue {
    public text: string = 'Warning';

    private show (event: CustomEvent) {
      const errText: string = event.detail;
      const warning = this.$refs.warning;
      this.text = errText;

      console.error(errText);

      (<any>warning).open();
    }
    
    public mounted () {
      document.addEventListener(WARNING, this.show);
    }
  }

  export default WarningBox;
</script>
