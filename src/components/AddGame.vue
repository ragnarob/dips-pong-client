<template>
  <div>
    <button v-if="!isAdding" @click="isAdding = true">Add game result</button>
    
    <form v-on:submit.prevent="addGame" v-show="isAdding">
      Winner: <select v-model="winningPlayer">
        <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
          {{player.name}} ({{player.elo}})
        </option>
      </select>

      Loser: <select v-model="losingPlayer">
        <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
          {{player.name}} ({{player.elo}})
        </option>
      </select>

      <input type="submit" value="Submit result" v-show="isValidGame">
    </form>

    <div v-show="hasAdded">
      <p style="color: green" v-show="addSuccessful">{{successMessage}}</p>
      <p style="color: red" v-show="!addSuccessful">Failed: {{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import gameApi from '@/api/gameApi'

export default {
  name: 'AddGame',

  data: function () {
    return {
      isAdding: false,
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
      let response = await gameApi.addGame(this.winningPlayer.id, this.losingPlayer.id)
      this.hasAdded = true
      if (!response.error) {
        this.addSuccessful = true

        this.$store.dispatch('getPlayerList')

        this.successMessage = `Success recording ${this.winningPlayer.name}'s win against ${this.losingPlayer.name}`
        this.isAdding = false
        this.winningPlayer = undefined
        this.losingPlayer = undefined
      }
      else {
        this.addSuccessful = false
        this.errorMessage = response.error
      }
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
