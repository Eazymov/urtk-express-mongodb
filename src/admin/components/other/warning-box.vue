<template lang="html">

  <md-dialog-alert
    :md-content="text"
    class="md-warn"
    md-ok-text="Ок"
    ref="warning" />

</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'There was an error while saving data'
      }
    }
  }
</script>
