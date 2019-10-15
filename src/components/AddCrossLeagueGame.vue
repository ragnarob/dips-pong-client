<template>
  <div>
    <div>
      <button v-if="!$store.state.isAddingCrossLeagueGame"
              @click="startAddingGame()"
              style="margin-top: 16px;"
              class="small-button smallButtonWithIconFirst">
        <SwapIcon/> Add X-league result
      </button>
      
      <form v-on:submit.prevent="addGame"
            v-show="$store.state.isAddingCrossLeagueGame"
            style="display: flex; flex-direction: column; margin-bottom: 8px;">
        <p><b>Add result</b></p>
        <p>Winner</p>
        <select v-model="winningPlayer">
          <option v-for="player in allPlayers" :key="player.id" :value="player">
            {{player.officeName}}: {{player.name}} ({{player.elo}})
          </option>
        </select>

        <p style="margin-top: 8px">Loser</p>
        <select v-model="losingPlayer">
          <option v-for="player in allPlayers" :key="player.id" :value="player">
            {{player.officeName}}: {{player.name}} ({{player.elo}})
          </option>
        </select>

        <span style="margin-top: 12px; width: 100%; display: flex; flex-direction: column;">
          <button type="submit" value="Submit result" :class="{'button-disabled': !isValidGame, 'normal-button': true, 'buttonWithIconFirst': true}">
            <CheckIcon/> Submit result
          </button>
          <button @click="cancelAdd" style="margin-top: 8px;" class="normal-button buttonWithIconFirst">
            <CrossIcon/> Cancel
          </button>
        </span>
      </form>

      <div v-show="hasAdded" style="margin-top: 8px;">
        <p style="color: red" v-show="!addSuccessful">Failed: {{errorMessage}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import gameApi from '@/api/gameApi'
import playerApi from '@/api/playerApi'

import CrossIcon from 'vue-material-design-icons/Close.vue'
import SwapIcon from 'vue-material-design-icons/SwapHorizontal.vue'
import CheckIcon from 'vue-material-design-icons/CheckBold.vue'

export default {
  name: 'AddGame',
  
  components: {
    CrossIcon,
    SwapIcon,
    CheckIcon,
  },

  data: function () {
    return {
      allPlayers: undefined,
      winningPlayer: undefined,
      losingPlayer: undefined,
      errorMessage: '',
      successMessage: '',
      hasAdded: false,
      addSuccessful: false,
    }
  },

  methods: {
    async startAddingGame () {
      if (this.$store.getters.isLoggedIn) {
        this.$store.state.isAddingCrossLeagueGame = true
        
        if (!this.allPlayers) {
          this.allPlayers = await playerApi.getAllPlayers()
        }
      }
      else {
        this.$store.dispatch('showLoginModal')
      }
    },

    async addGame () {
      if (!this.isValidGame) { return }

      let response = await gameApi.addCrossLeagueGame(this.winningPlayer.id, this.losingPlayer.id, this.winningPlayer.officeId, this.losingPlayer.officeId)
      this.hasAdded = true
      if (!response.error) {
        this.addSuccessful = true
        this.errorMessage = ''

        this.$store.dispatch('getPlayerList')
        this.$store.dispatch('getOtherStats')
        this.$store.dispatch('getAllGames')
        this.$store.dispatch('getRatingStats')

        this.successMessage = `Success recording ${this.winningPlayer.name}'s win against ${this.losingPlayer.name}`
        this.$store.state.isAddingCrossLeagueGame = false
        this.winningPlayer = undefined
        this.losingPlayer = undefined
      }
      else {
        this.addSuccessful = false
        this.errorMessage = response.error
        if (response.error === 'Not logged in') {
          this.$store.dispatch('setLoggedInOffice', null)
          this.$store.dispatch('showLoginModal')
        }
      }
    },

    cancelAdd () {
      this.$store.state.isAddingCrossLeagueGame = false
      this.winningPlayer = undefined
      this.losingPlayer = undefined
    }
  },

  computed: {
    isValidGame () {
      return this.winningPlayer && this.losingPlayer && this.winningPlayer !== this.losingPlayer
    }
  }
}
</script>

<style scoped lang="scss">
</style>
