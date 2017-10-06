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

    show (event: CustomEvent) {
      const warning = this.$refs.warning;
      this.text = event.detail;

      (<any>warning).open();
    }
    
    mounted () {
      document.addEventListener(WARNING, this.show);
    }
  }

  export default WarningBox;
</script>
