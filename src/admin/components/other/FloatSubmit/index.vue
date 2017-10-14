<template lang="pug">
  button(:class="{ active, loading }"
         class="float-button"
         title="Save")
    span(class="loader")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    props: {
      active: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  })
  class FloatSubmit extends Vue { }

  export default FloatSubmit;
</script>

<style lang="sass">
  .float-button
    background-image: url('~Assets/icons/reply-white-36dp.png')
    box-shadow: 0 0 6px rgba(#000, 1)
    background-position: 22px 2px
    background-repeat: no-repeat
    background-size: 36px 36px
    background-color: #4a89dc
    transition: .2s ease-out
    left: calc(50% + 101px)
    transform: scale(-1, 1)
    border-radius: 50%
    position: fixed
    cursor: pointer
    display: block
    bottom: -100px
    border: none
    height: 80px
    width: 80px
    z-index: 5
    &:hover,
    &:active
      transform: scale(-1.1, 1.1)
      background-color: #1976d2
    &.active
      bottom: -40px
      &.loading
        box-shadow: 0 0 12px rgba(#000, 1)
        background-image: none
        transform: scale(-.7, .7)
        bottom: 100px
        .loader
          animation: rotate .45s linear infinite
          display: block
    .loader
      border: 4px solid transparent
      border-top-color: #fff
      border-radius: 50%
      display: none
      margin: 15px
      height: 50px
      width: 50px

  @keyframes rotate
    100%
      transform: rotateZ(-360deg)
</style>
