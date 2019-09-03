<template>
  <div>
    <div>
      <button v-if="!isAdding" @click="isAdding = true">Add game result</button>
      
      <form v-on:submit.prevent="addGame" v-show="isAdding" style="display: flex; flex-direction: column;">
        <p>Winner</p>
        <select v-model="winningPlayer">
          <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
            {{player.name}} ({{player.elo}})
          </option>
        </select>

        <p style="margin-top: 10px">Loser</p>
        <select v-model="losingPlayer">
          <option v-for="player in $store.getters.playerList" :key="player.id" :value="player">
            {{player.name}} ({{player.elo}})
          </option>
        </select>

        <span style="margin-top: 12px; width: 100%; display: flex; flex-direction: column;">
          <input type="submit" value="Submit result" :class="{'button-disabled': !isValidGame}">
          <button @click="cancelAdd" style="margin-top: 8px;">Cancel</button>
        </span>
      </form>

      <div v-show="hasAdded" style="margin-top: 8px;">
        <!-- <p style="color: green" v-show="addSuccessful">{{successMessage}}</p> -->
        <p style="color: red" v-show="!addSuccessful">Failed: {{errorMessage}}</p>
      </div>
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
      if (!this.isValidGame) { return }

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
    },

    cancelAdd () {
      this.isAdding = false
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
