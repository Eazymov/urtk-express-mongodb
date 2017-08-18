<template lang="html">

  <md-dialog-confirm
    :md-title="text"
    md-ok-text="Delete"
    md-content="Cancel this action will be unpossible"
    md-cancel-text="Cancel"
    @close="onClose"
    ref="confirm" />

</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },

    callback: {
      type: Function,
      required: false
    }
  },

  methods: {
    onClose(answer) {
      if (answer === 'ok')
        if (typeof this.callback === 'function')
          this.callback()
    }
  }
}
</script>
