<template lang="pug">
  md-dialog-confirm(:md-title="text"
                    md-ok-text="Delete"
                    md-content="Cancel this action will be unpossible"
                    md-cancel-text="Cancel"
                    @close="onClose"
                    ref="confirm")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  type Answer = 'ok' | 'cancel';

  @Component
  class PromptBox extends Vue {
    @Prop({
      type: String,
      required: true
    })
    public text: string;

    @Prop({
      type: Function,
      required: true
    })
    public callback: () => void;

    public onClose (answer: Answer): void {
      if (answer !== 'ok') return;

      if (typeof this.callback === 'function') {
        this.callback();
      }
    }
  }

  export default PromptBox;
</script>
