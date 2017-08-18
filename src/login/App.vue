<template lang="html">
  <div id="App">

    <md-card class="auth-form">
      <form action="/login" method="POST">
        <md-card-header>
          <h2 class="md-title">Authorization</h2>
        </md-card-header>

        <md-card-content>
          <md-input-container>
            <label>Username</label>
            <md-input name="username" required />
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <md-input name="password" required type="password" />
          </md-input-container>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-primary" type="submit">Log in</md-button>
        </md-card-actions>
      </form>
    </md-card>

  </div>
</template>

<script>
  export default {
    data: () => ({
      login: '',
      pass: '',
      loginIsFilled: false,
      passIsFilled: false,
      loading: false,
      denied: false
    }),

    methods: {
      authorizate(login, pass) {
        this.loading = true;
        this.denied  = false;

        this.$http
          .post('index.php', { login, pass })
          .then(this.handleAjaxLoad)
          .catch(error => console.log(error));
      },

      handleAjaxLoad(response) {
        if (response.data === 'denied') {
          this.loading = false;
          this.denied  = true;
        } else {
          location = '../../admin/';
        }
      }
    }
  }
</script>

<style lang="sass">
  *,
  *::before,
  *::after
    box-sizing: border-box
    outline: none
    padding: 0
    margin: 0

  input
    background-color: #fff

  button::-moz-focus-inner
    border: 0

  html, body
    font: 16px "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif
    color: rgba(#000, .87)
    height: 100%
    width: 100%

  #App
    justify-content: center
    flex-direction: column
    align-items: center
    background: #eee
    height: 100%
    width: 100%
    display: flex

    .auth-form
      position: relative
      margin-bottom: 10vh
      background: #fff
      width: 320px
</style>
