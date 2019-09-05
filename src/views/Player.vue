<template>
  <div>
    <h1>Player: {{$route.params.name}}</h1>

    <div style="margin-top: 20px; display: flex; align-items: center; flex-direction: column;" v-if="playerNotFound">
      <p>Player does not exist</p>
      <br>
      <router-link :to="'/'">
        Back to index
      </router-link>
    </div>

    <div v-if="$store.getters.selectedPlayer" style="display: flex; flex-direction: column; align-items: center;">
      <button @click="isChangingName = true" v-show="!isChangingName" style="margin-top: 4px;">
        Change player name
      </button>

      <form v-on:submit.prevent="changePlayerName" v-show="isChangingName" style="display: flex; flex-direction: column; margin-top: 4px;">
        <span style="display: flex; flex-direction: row; align-items: center;">
          <p style="margin-right: 4px;">Player name</p>
          <input type="text" v-model="playerName" style="width: 120px;"/>
        </span>
        <span style="display: flex; flex-direction: row; align-items: center; margin-top: 4px;">
          <input type="submit" value="Change name" :class="{'button-disabled': !isValidName}" style="margin-left: 12px;">
          <button @click="cancelAdd()" style="margin-left: 8px;">Cancel</button>
        </span>
      </form>

      <br>

      <router-link :to="'/'">
        Back to index
      </router-link>

      <h2 style="margin-top: 20px;">Current rating: {{$store.getters.selectedPlayer.elo}}</h2>


      <p style="color: red" v-show="!changeNameSuccess">Failed: {{errorMessage}}</p>

      <h2 style="margin-top: 20px;">Game history</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Rating<br/>change</th>
          </tr>
        </thead>
        <tr v-for="game in $store.getters.selectedPlayer.matches" :key="game.gameId" :class="{'winnerRow': isWinner(game), 'loserRow': !isWinner(game)}">
          <td style="text-align: center;">{{prettyDate(game.timestamp)}}</td>
          <td>{{game.winningPlayer}} ({{game.winnerElo}})</td>
          <td>{{game.losingPlayer}} ({{game.loserElo}})</td>
          <td style="text-align: center;">{{calculateEloChange(game)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import playerApi from '@/api/playerApi'

export default {
  name: 'player',

  data: function () {
    return {
      isChangingName: false,
      playerName: '',
      changeNameSuccess: true,
      errorMessage: '',
      playerNotFound: false,
    }
  },

  methods: {
    async changePlayerName () {
      if (!this.isValidName) { return }

      let response = await playerApi.changePlayerName(this.$store.getters.selectedPlayer.id, this.playerName)

      if (!response.error) {
        this.$store.dispatch('getPlayerData', this.$store.getters.selectedPlayer.name)
        this.$router.push('/')
        this.isChangingName = false
        this.playerName = ''
        this.changeNameSuccess = true
        this.playerNotFound = false
        this.initialize()
      }
      else {
        this.changeNameSuccess = false
        this.errorMessage = response.error
      }
    },

    cancelAdd () {
      this.isChangingName = false
      this.playerName = ''
    },

    prettyDate (dateString) {
      return (new Date(dateString)).toDateString().substring(4, 10)
    },

    calculateEloChange (game) {
      if (game.winningPlayer === this.$store.getters.selectedPlayer.name) {
        return '+' + game.winnerEloChange
      }
      else {
        return game.loserEloChange
      }
    },

    isWinner (game) {
      return game.winningPlayer === this.$store.getters.selectedPlayer.name
    },

    async initialize () {
      console.log('getting player data for ', this.$route.params.name)
      await this.$store.dispatch('getPlayerData', this.$route.params.name)
      if (!this.$store.getters.selectedPlayer) {
        this.playerNotFound = true
      }
    }
  },

  computed: {
    isValidName () {
      return this.playerName.length > 1 && /^[\wÆØÅæøå\s]+$/i.test(this.playerName)
    }
  },

  async mounted () {
    this.initialize()
  }
}
</script>

<style lang="scss" scoped>
  h1, button, a {
    text-align: center;
  }

  table {
    border-collapse: collapse;
  }
  td, th {
    padding: 4px 10px;
    border: 1px solid #aaa;
  }
  .winnerRow {
    td {
      color: rgb(0, 107, 0);
    }
  }
  .loserRow {
    td {
      color: rgb(156, 0, 0);
    }
  }
</style>