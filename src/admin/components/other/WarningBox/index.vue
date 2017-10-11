<template lang="pug">
  md-dialog-alert(:md-content="text"
                  class="md-warn"
                  md-ok-text="Ок"
                  ref="warning")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import Observable from 'Utils/observable';
  import { WARNING } from 'Admin/constants/actionTypes';

  interface Params {
    text: string;
  }

  @Component
  class WarningBox extends Vue {
    public text: string = 'Warning';

    private show (params: Params): void {
      const warning = this.$refs.warning;
      const text: string = params.text;
      this.text = text;

      console.error(text);

      (<any>warning).open();
    }
    
    public mounted () {
      Observable.subscribe(WARNING, this.show);
    }
  }

  export default WarningBox;
</script>
