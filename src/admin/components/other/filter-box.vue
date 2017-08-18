<template lang="html">

  <md-card class="filter-box" :class="{ 'active': active }">
    <form @submit.prevent="active = false">
      <input type="text"
             placeholder="Search..."
             v-model="filterQuery"
             @click="active = true"
             autocomplete="off" />
      <md-tooltip md-delay="500">Start typing any word...</md-tooltip>

      <md-icon class="filter-box__search-icon md-dark md-20">search</md-icon>

      <label for="search-param">Filter by:</label>

      <select id="search-param" v-model="filter">
        <option v-for="(value, key) in options" :value="value">
          {{ key }}
        </option>
      </select>
    </form>

    <md-icon class="filter-box__reset-btn md-dark md-20"
             @click.native="resetFilter">close
     <md-tooltip md-delay="500">Reset filter</md-tooltip>
    </md-icon>
  </md-card>

</template>

<script>
  export default {
    props: {
      options: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      filter: 'title',
      filterQuery: '',
      active: false
    }),

    methods: {
      resetFilter() {
        this.filterQuery = '';

        this.active = false;
      },
    },

    watch: {
      filter(value) {
        this.$emit('filterChange', value);
      },

      filterQuery(value) {
        this.$emit('queryChange', value);
      }
    }
  }
</script>

<style lang="sass">
  .filter-box
    background-color: #fff
    overflow: visible
    transition: .2s
    padding: 4px 0 0 4px
    height: 28px
    width: 100px
    &.active
      padding: 7px 6px 5px 10px
      width: 190px
      height: 65px
      label
        opacity: 1
      select
        opacity: 1

    form
      overflow: hidden
      border: none
      height: 100%
      min-width: 0
      width: 100%
      float: left

    input
      width: calc(100% - 24px)
      font-family: inherit
      margin-bottom: 8px
      font-size: .9rem
      padding: 3px
      border: none
      height: 20px
      float: left
    &__search-icon
      border-radius: 50%
      transition: .3s
      display: block
      border: none
      height: 20px
      opacity: .54
      width: 20px
      float: left
    &__reset-btn
      position: absolute
      cursor: pointer
      display: block
      border: none
      opacity: .54
      right: -25px
      &:hover,
      &:focus
        opacity: .87

    label
      transition: .5s
      color: rgba(#000, .54)
      transition-delay: .2s
      line-height: 1.5rem
      font-size: .9rem
      padding: 0 3px
      display: block
      height: 24px
      opacity: 0
      float: left

    select
      transition: .5s
      vertical-align: baseline
      width: calc(100% - 76px)
      transition-delay: .2s
      line-height: 1.5rem
      padding-right: 2px
      font-size: .9rem
      display: block
      border: none
      height: 24px
      float: left
      opacity: 0
      option
        line-height: 1.125rem
        font-size: .9rem
        padding: 0 2px
        height: 18px
</style>
