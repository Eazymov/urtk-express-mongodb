<template lang="pug">
  section(class="notify-box" :class="{ 'active': active }")
    h4(class="notify-box__text") {{ text }}
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    props: {
      active: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: 'Saved'
      }
    }
  })

  class NotifyBox extends Vue { }

  export default NotifyBox;
</script>

<style lang="sass">
  .notify-box
    box-shadow: 0 3px 6px rgba(#000, .3)
    background: #323232
    padding: 14px 24px
    border-radius: 2px
    max-width: 568px
    min-width: 288px
    position: fixed
    transition: .5s
    bottom: -50px
    height: 48px
    z-index: 25
    right: 48px
    opacity: 0
    &.active
      bottom: 24px
      opacity: 1
    &__text
      text-overflow: ellipsis
      display: inline-block
      line-height: 1.25rem
      font-size: 1.125rem
      white-space: nowrap
      max-width: 520px
      overflow: hidden
      font-weight: 300
      color: #fff

  @keyframes showSnackbar
    50%
      bottom: 5px
    100%
      bottom: 24px
      opacity: 1
</style>
