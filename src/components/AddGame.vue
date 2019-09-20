<template>
  <div>
    <div>
      <button v-if="!$store.state.isAddingGame"
              @click="$store.state.isAddingGame = true"
              class="buttonWithIconFirst">
        <PlusIcon/> Add game result
      </button>
      
      <form v-on:submit.prevent="addGame"
            v-show="$store.state.isAddingGame"
            style="display: flex; flex-direction: column; margin-bottom: 8px;">
        <p><b>Add result</b></p>
        <p>Winner</p>
        <select v-model="winningPlayer">
          <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
            {{player.name}} ({{player.elo}})
          </option>
        </select>

        <p style="margin-top: 8px">Loser</p>
        <select v-model="losingPlayer">
          <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
            {{player.name}} ({{player.elo}})
          </option>
        </select>

        <span style="margin-top: 12px; width: 100%; display: flex; flex-direction: column;">
          <input type="submit" value="Submit result" :class="{'button-disabled': !isValidGame, 'normal-button': true}">
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

import CrossIcon from 'vue-material-design-icons/Close.vue'
import PlusIcon from 'vue-material-design-icons/PlusCircle.vue'

export default {
  name: 'AddGame',
  
  components: {
    CrossIcon,
    PlusIcon,
  },

  data: function () {
    return {
      winningPlayer: undefined,
      losingPlayer: undefined,
      errorMessage: '',
      successMessage: '',
      hasAdded: false,
      addSuccessful: false,
    }
  },

  methods: {
    async addGame () {
      if (!this.isValidGame) { return }

      let response = await gameApi.addGame(this.winningPlayer.id, this.losingPlayer.id,
        this.$store.getters.selectedOffice.id)
      this.hasAdded = true
      if (!response.error) {
        this.addSuccessful = true

        this.$store.dispatch('getPlayerList')
        this.$store.dispatch('getHotStreaks')
        this.$store.dispatch('getAllGames')
        this.$store.dispatch('getRatingStats')

        this.successMessage = `Success recording ${this.winningPlayer.name}'s win against ${this.losingPlayer.name}`
        this.$store.state.isAddingGame = false
        this.winningPlayer = undefined
        this.losingPlayer = undefined
      }
      else {
        this.addSuccessful = false
        this.errorMessage = response.error
      }
    },

    cancelAdd () {
      this.$store.state.isAddingGame = false
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
