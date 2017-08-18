<template lang="html">
  <section class="notify-box" :class="{ 'active': active }">

    <h4 class="notify-box__text">{{ text }}</h4>

  </section>
</template>

<script>
  export default {
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
  }
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
      white-space: nowrap
      text-overflow: ellipsis
      line-height: 1.25rem
      display: inline-block
      font-size: 1.125rem
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
