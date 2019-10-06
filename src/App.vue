<template>
  <div id="app">
    <router-view/>

    <LoginModal v-if="$store.getters.showLoginModal"/>

    <p style="text-align: center; font-size: 11px; margin-top: 24px; margin-bottom: 6px;">
      <i>
        Made with 
        <span style="color: #ff0050;">
          <HeartIcon title="Love"/>
        </span>
        + 
        <span style="color: #e4a637;">
          <JsIcon title="Javascript"/>
        </span>
        + 
        <span style="color: #4fc08d;">
          <VueIcon title="Vue"/>
        </span>
        by 
        <span style="color: #cc4cc1;">
          <CatIcon title="Kitty"/>
        </span>
        Ragnar &nbsp;&nbsp;&nbsp;
        <a href="https://github.com/ragnarob/dips-pong-client"><GithubIcon/>client</a> |
        <a href="https://github.com/ragnarob/dips-pong-server"><GithubIcon/>server</a>
      </i>
    </p>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'

import GithubIcon from 'vue-material-design-icons/GithubCircle.vue'
import HeartIcon from 'vue-material-design-icons/Heart.vue'
import JsIcon from 'vue-material-design-icons/LanguageJavascript.vue'
import VueIcon from 'vue-material-design-icons/Vuejs.vue'
import CatIcon from 'vue-material-design-icons/Cat.vue'

export default {
  components: {
    LoginModal,
    GithubIcon,
    HeartIcon,
    JsIcon,
    VueIcon,
    CatIcon,
  },

  created () {
    let selectedOffice = window.localStorage.getItem('selectedOffice')
    if (selectedOffice) {
      this.$store.dispatch('setSelectedOffice', JSON.parse(selectedOffice))
    }
    this.$store.dispatch('getOffices')
  },

  mounted () {
    setInterval(
      () => this.$store.dispatch('loadData'),
      1000*30
    )

    setTimeout( () => {
      let loggedInOffice = window.localStorage.getItem('loggedInOffice')
      if (loggedInOffice) {
        this.$store.dispatch('setLoggedInOffice', loggedInOffice)
      }
    }, 400)
  }
}
</script>

<style lang="scss">
div, p, ul, li, table, td, th, tr, span, h1, h2, h3, h4 {
  margin: 0;
  padding: 0;
}
body {
  background-color: #eee;
  margin: 0;
  font-family: Helvetica;
}
button, input[type=submit] {
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  background-color: #fff;
  font-weight: 300;
  color: black;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.19), 0 4px 8px rgba(0,0,0,0.29);
    cursor: pointer;
  }
}
.button-disabled {
  background-color: #aaa !important;
  box-shadow: none !important;
  &:hover {
    cursor: not-allowed !important;
  }
}
.normal-button {
  font-size: 14px !important;
}
.small-button {
  font-size: 14px !important;
  padding: 4px 8px !important;
  border-radius: 4px !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) !important;
    &.button-disabled {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
    }
  }
}
.error-message {
  color: red;
}
.row-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.col-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.border-around {
  padding: 10px;
  width: 100%;
  box-shadow: 0 19px 20px rgba(0,0,0,0.30), 0 11px 8px rgba(0,0,0,0.12);
  margin-bottom: 20px;
}
select {
  background-color: white;
}
a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  color: #d02d28;
  transition: 180ms ease;
  &:hover {
    border-bottom: 1px solid #d02d28;
  }
}
.elo {
  font-family: Consolas;
}
.elosmall {
  font-family: Consolas;
  font-size: 14px;
}
h2 {
  font-weight: normal;
}
.successMessage {
  text-align: center;
  color: green;
}
.errorMessage {
  text-align: center;
  color: red;
}
.buttonWithIconFirst {
  padding: 8px 14px 8px 10px;
  span {
    margin-top: 1px;
  }
}
.buttonWithIconLast {
  padding: 8px 10px 8px 14px;
}
.smallButtonWithIconFirst {
  padding: 4px 8px 4px 6px !important;
}
th {
  font-weight: normal;
  background-color: #e2e2e2;
}
::selection {
  background-color: rgba(255, 83, 83, 0.555);
}
</style>
