<template lang="html">

  <button @mousedown="setRippleCoords"
          @mouseup="animateRipple"
          @click="$emit('click')"
          class="material-btn ripple-btn">
          {{ text }}
    <span ref="ripple"
          class="ripple"
          :class="{ 'active': rippleActive }">
    </span>
  </button>

</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'Save'
      }
    },

    data: () => ({
      rippleActive: false
    }),

    computed: {
      ripple() {
        return this.$refs.ripple;
      }
    },

    methods: {
      setRippleCoords(e) {
        const top = e.offsetY - 270;
        const left = e.offsetX - 270;

        this.ripple.style.top = `${top}px`;
        this.ripple.style.left = `${left}px`;
      },

      animateRipple() {
        this.rippleActive = true;

        setTimeout(() => {
          this.rippleActive = false;
        }, 500);
      }
    }
  }
</script>

<style lang="sass">
  .material-btn
    border: 0
    text-shadow: 1px 1px 0 rgba(39, 110, 204, .5)
    box-shadow: 0 1px 2px rgba(#000, .3)
    border-bottom: 2px solid #3160B6
    font-family: 'Roboto', sans-serif
    background: #4a89dc
    font-size: 1.1rem
    text-align: center
    overflow: hidden
    position: relative
    font-weight: 300
    cursor: pointer
    transition: .2s
    padding: 9px
    color: #fff
    &:hover,
    &:focus
      box-shadow: 0 4px 8px rgba(#000, .2)
      background: #357bd8
    &:disabled
      color: rgba(#fff, .6)
    .ripple
      background: rgba(#bbb, .4)
      pointer-events: none
      border-radius: 50%
      transform: scale(0)
      position: absolute
      height: 540px
      width: 540px
      &.active
          animation: mb-splash .5s ease-in

  @keyframes mb-splash
    80%
      transform: scale(1)
    100%
      opacity: 0
</style>
