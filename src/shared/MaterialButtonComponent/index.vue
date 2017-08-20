<template lang="pug">
  button(@mousedown="setRippleCoords"
         @mouseup="animateRipple"
         @click="$emit('click')"
         class="material-btn ripple-btn") {{ text }}
    span(ref="ripple"
         class="ripple"
         :class="{ 'active': rippleActive }")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    props: {
      text: {
        type: String,
        default: 'Save'
      }
    }
  })

  class MaterialButton extends Vue {
    public rippleActive: boolean = false;

    get ripple (): any {
      return this.$refs.ripple;
    }

    public setRippleCoords (event: MouseEvent): void {
      const top: number = event.offsetY - 270;
      const left: number = event.offsetX - 270;

      this.ripple.style.top = `${top}px`;
      this.ripple.style.left = `${left}px`;
    }

    public animateRipple (): void {
      this.rippleActive = true;

      setTimeout(() => {
        this.rippleActive = false;
      }, 500);
    }
  }

  export default MaterialButton;
</script>

<style lang="sass">
  .material-btn
    border: 0
    text-shadow: 1px 1px 0 rgba(39, 110, 204, .5)
    box-shadow: 0 1px 2px rgba(#000, .3)
    font-family: 'Roboto', sans-serif
    border-bottom: 2px solid #3160B6
    background: #4a89dc
    position: relative
    text-align: center
    font-size: 1.1rem
    overflow: hidden
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
      transform: scale(0)
      border-radius: 50%
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
