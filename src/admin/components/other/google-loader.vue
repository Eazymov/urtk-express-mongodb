<template lang="html">

  <div class="google-loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
    </svg>
  </div>

</template>

<script>
  export default { }
</script>

<style lang="sass">
  $green: #008744
  $blue: #0057e7
  $red: #d62d20
  $yellow: #ffa700
  $white: #eee

  .google-loader

    .circular
      animation: gl-rotate 2s linear infinite
      height: 100%
      transform-origin: center center
      width: 100%
      margin: auto

      .path
        stroke-dasharray: 1, 200
        stroke-dashoffset: 0
        animation: gl-dash 1.5s ease-in-out infinite, gl-color 6s ease-in-out infinite
        stroke-linecap: round

  @keyframes gl-rotate
    100%
      transform: rotate(360deg)

  @keyframes gl-dash
    0%
      stroke-dasharray: 1, 200
      stroke-dashoffset: 0
    50%
      stroke-dasharray: 89, 200
      stroke-dashoffset: -35px
    100%
      stroke-dasharray: 89, 200
      stroke-dashoffset: -124px

  @keyframes gl-color
    100%,
    0%
      stroke: $red
    40%
      stroke: $blue
    66%
      stroke: $green
    80%,
    90%
      stroke: $yellow
</style>
