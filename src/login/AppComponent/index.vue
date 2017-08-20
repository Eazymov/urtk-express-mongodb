<template lang="pug">
  #App
    md-card(class="auth-form")
      form(@submit.prevent="login(username, password)")
        md-card-header
          h2(class="md-title") Authorization

        md-card-content
          md-input-container(:class="{ 'md-input-invalid' : denied }")
            label Username
            md-input(v-model.trim="username"
                     @input="denied = false"
                     required)
          md-input-container(:class="{ 'md-input-invalid' : denied }")
            label Password
            md-input(v-model.trim="password"
                     @input="denied = false"
                     type="password"
                     required)

        md-card-actions
          md-button(class="md-raised md-primary" type="submit") Log in

      p(class="denied-label" v-show="denied") Your login or password is incorrect
      md-spinner(class="loader" md-indeterminate v-show="loading")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Axios, { AxiosResponse } from 'axios';

  @Component
  class App extends Vue {
    public username: string = '';
    public password: string = '';
    public loading: boolean = false;
    public denied: boolean = false;

    public login (username: string, password: string): void {
      this.loading = true;
      this.denied = false;
      
      const user: User = { username, password };

      Axios
        .post('/login', user)
        .then(this.handleAjaxLoad)
        .catch(console.error);
    }

    private handleAjaxLoad (response: AxiosResponse): void {
      const data: boolean = response.data;

      this.loading = false;

      if (data) {
        window.location.href = '/admin/';
      } else {
        this.denied = true;
      }
    }
  }

  export default App;
</script>

<style lang="sass">
  @import '~@/default.sass'

  #App
    justify-content: center
    flex-direction: column
    align-items: center
    background: #eee
    display: flex
    height: 100%
    width: 100%

    .auth-form
      margin-bottom: 10vh
      position: relative
      overflow: visible
      background: #fff
      width: 320px

      .denied-label
        position: absolute
        text-align: center
        display: block
        bottom: -30px
        width: 100%
        color: red
    
      .loader
        position: absolute
        margin: 0 auto
        bottom: -65px
        right: 0
        left: 0
</style>
