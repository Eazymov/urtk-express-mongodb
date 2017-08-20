<template lang="pug">
  md-dialog-alert(:md-content="text"
                  class="md-warn"
                  md-ok-text="Ок"
                  ref="warning")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    props: {
      text: {
        type: String,
        default: 'There was an error while saving data'
      }
    }
  })

  class WarningBox extends Vue { }

  export default WarningBox;
</script>
