<template>
  <div class="login-background" @click="closeModal()">
    <div class="login-modal" @click.stop>
      <h2>Enter password</h2>
      <p style="margin-top: 4px;">You must enter this league's password in order to add, delete or change things.</p>
      <p style="margin-top: 4px;">Your session will be active until you "log in" to another league.</p>
      <form v-on:submit.prevent="submitPassword">
        <input type="text" v-model="password" ref="passwordInput" placeholder="Say the magic word(s)" style="width: 150px; padding: 6px;"/>
        <button type="submit" class="normal-button buttonWithIconFirst" style="margin-left: 12px; margin-bottom: 3px;">
          <LoginIcon/> Submit
        </button>
      </form>

      <p style="margin-top: 10px;">
        Password hint for {{$store.getters.selectedOffice.name}}: <i><u>{{$store.getters.selectedOffice.passwordHint}}</u></i>
      </p>

      <p class="error-message" style="margin-top: 10px; margin-bottom: -6px;">{{loginError}}</p>

      <button @click="closeModal()" class="normal-button buttonWithIconFirst" style="margin-top: 20px;">
        <CrossIcon/> Cancel
      </button>
    </div>
  </div>
</template>

<script>
import miscApi from '../api/miscApi'

import CrossIcon from 'vue-material-design-icons/Close.vue'
import LoginIcon from 'vue-material-design-icons/Login.vue'

export default {
  name: 'Login',

  components: {
    CrossIcon,
    LoginIcon,
  },

  data: function () {
    return {
      newPlayerName: '',
      password: '',
      loginError: '',
    }
  },

  methods: {
    async submitPassword () {
      let response = await miscApi.login(this.$store.getters.selectedOffice.id, this.password)

      if ('error' in response) {
        this.loginError = response.error
      }
      else {
        this.closeModal()
        this.$store.dispatch('setLoggedInOffice', this.$store.getters.selectedOffice.name)
      }
    },

    closeModal () {
      this.reset()
      this.$store.commit('setShowLoginModal', false)
    },

    reset () {
      this.password = ''
      this.loginError = false
    },
  },

  mounted () {
    this.$refs.passwordInput.focus()
  }
}
</script>

<style lang="scss">
.login-background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
}
.login-modal {
  text-align: center;
  cursor: initial;
  padding: 24px;
  margin: 0 10px;
  background-color: #eee;
  z-index: 3;
  box-shadow: 0 19px 20px rgba(0,0,0,0.30), 0 11px 8px rgba(0,0,0,0.22);

  form {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>