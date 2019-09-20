<template>
  <div>
    <h1>{{$route.params.name}}</h1>

    <div style="margin-top: 20px; display: flex; align-items: center; flex-direction: column;" v-if="playerNotFound">
      <p>Player does not exist</p>
      <br>
      <router-link :to="'/'">
        <ArrowLeft/> Back to home
      </router-link>
    </div>

    <div v-if="$store.getters.selectedPlayer" style="display: flex; flex-direction: column; align-items: center;">
      <p style="margin: 4px 0;">League: {{$store.getters.selectedPlayer.officeName}}</p>

      <!-- RENAME PLAYER -->
      <button @click="isChangingName = true"
              v-show="!isChangingName && !isDeletingPlayer"
              style="margin-top: 4px;"
              class="small-button smallButtonWithIconFirst">
        <EditIcon/> Change player name
      </button>

      <form v-on:submit.prevent="changePlayerName" 
            v-show="isChangingName"
            style="display: flex; flex-direction: column; margin-top: 4px; margin-bottom: 10px;">
        <span style="display: flex; flex-direction: row; align-items: center;">
          <p style="margin-right: 4px;">New player name</p>
          <input type="text" v-model="playerName" style="width: 120px;"/>
        </span>
        <span style="display: flex; flex-direction: row; align-items: center; margin-top: 4px;">
          <input type="submit" value="Change name" :class="{'button-disabled': !isValidName, 'small-button': true}" style="margin-left: 12px;">
          <button @click="cancelRename()" style="margin-left: 8px;" class="small-button">
            <CrossIcon/> Cancel rename
          </button>
        </span>
      </form>

      
      <!-- DELETE PLAYER -->
      <button @click="isDeletingPlayer=true"
              v-if="!isDeletingPlayer && !isChangingName"
              style="margin-top: 8px;"
              class="small-button smallButtonWithIconFirst">
        <DeleteIcon/> Delete player
      </button>

      <button @click="deletePlayer()" v-if="isDeletingPlayer" style="margin-top: 4px;" class="small-button"> 
        Confirm <DeleteIconFull/>
      </button>

      <button @click="cancelDelete()" v-if="isDeletingPlayer" style="margin-top: 8px;" class="small-button">
        <CrossIcon/> Cancel delete
      </button>

      <!-- CONTENT  -->
      <br>

      <router-link :to="'/'">
        <ArrowLeft/> Back to index
      </router-link>

      <h2 style="margin-top: 20px;">Current rating: <span class="elo" style="font-weight: bold">{{$store.getters.selectedPlayer.elo}}</span></h2>

      <p style="color: red" v-show="!changeNameSuccess">Failed: {{errorMessage}}</p>

      <h2 style="margin-top: 20px;">Game history</h2>
      <table v-if="$store.getters.selectedPlayer.matches.length > 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
            <th>Loser</th>
            <th><PlusMinusIcon/> Rating&nbsp;</th>
          </tr>
        </thead>
        <tr v-for="game in $store.getters.selectedPlayer.matches" :key="game.gameId">
          <td style="text-align: center;">{{prettyDate(game.timestamp)}}</td>
          <td>
            <router-link :to="'/player/'+game.winningPlayer" :class="{'bold': game.winningPlayer === $store.getters.selectedPlayer.name}">
              {{game.winningPlayer}}
            </router-link>
            <br>
            <p class="elosmall">{{game.winnerElo}}</p>
          </td>
          <td>
            <router-link :to="'/player/'+game.losingPlayer" :class="{'bold': game.losingPlayer === $store.getters.selectedPlayer.name}">
              {{game.losingPlayer}}
            </router-link>
            <br>
            <p class="elosmall">{{game.loserElo}}</p>
          </td>
          <td style="text-align: center;" 
              :class="{'elo': true, 'winnerRating': isWinner(game), 'loserRating': !isWinner(game)}">
            {{calculateEloChange(game)}}
          </td>
        </tr>
      </table>

      <p v-else>No games yet</p>
    </div>
  </div>
</template>

<script>
import playerApi from '@/api/playerApi'

import DeleteIcon from 'vue-material-design-icons/DeleteOutline.vue'
import DeleteIconFull from 'vue-material-design-icons/Delete.vue'
import CrossIcon from 'vue-material-design-icons/Close.vue'
import EditIcon from 'vue-material-design-icons/PencilOutline.vue'
import ConfirmIcon from 'vue-material-design-icons/CheckBold.vue'
import ArrowLeft from 'vue-material-design-icons/ArrowLeftCircle.vue'
import PlusMinusIcon from 'vue-material-design-icons/PlusMinus.vue'

export default {
  name: 'player',

  components: {
    DeleteIcon,
    DeleteIconFull,
    CrossIcon,
    EditIcon,
    ConfirmIcon,
    ArrowLeft,
    PlusMinusIcon,
  },

  data: function () {
    return {
      isChangingName: false,
      playerName: '',
      changeNameSuccess: true,
      errorMessage: '',
      playerNotFound: false,
      isDeletingPlayer: false,
    }
  },

  methods: {
    async changePlayerName () {
      if (!this.isValidName) { return }

      let response = await playerApi.changePlayerName(this.$store.getters.selectedPlayer.id, this.playerName)

      if (!response.error) {
        this.$store.dispatch('getPlayerData', this.$store.getters.selectedPlayer.name)
        this.$router.push('/player/' + this.playerName)
        this.isChangingName = false
        this.playerName = ''
        this.changeNameSuccess = true
        this.playerNotFound = false
        this.initialize()
        this.$store.dispatch('loadData')
      }
      else {
        this.changeNameSuccess = false
        this.errorMessage = response.error
      }
    },

    cancelRename () {
      this.isChangingName = false
      this.playerName = ''
    },

    async deletePlayer () {
      await playerApi.deletePlayer(this.$store.getters.selectedPlayer.id)
      this.$router.push('/')
    },

    cancelDelete () {
      this.isDeletingPlayer = false
    },

    prettyDate (dateString) {
      return (new Date(dateString)).toDateString().substring(0, 10) + ', ' + ((new Date(dateString)).toTimeString().substring(0, 5))
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
      await this.$store.dispatch('getPlayerData', this.$route.params.name)
      if (!this.$store.getters.selectedPlayer) {
        this.playerNotFound = true
      }
    },

    async checkSelectedPlayer () {
      if (this.$store.getters.selectedPlayer && this.$store.getters.selectedPlayer.name !== this.$route.params.name) {
        this.$store.dispatch('clearSelectedPlayer')
        this.initialize()
      }
    }
  },

  computed: {
    isValidName () {
      return this.playerName.length > 1 
        && this.playerName.length < 25
        && /^[\wÆØÅæøå\s]+$/i.test(this.playerName)
    }
  },

  created () {
    if (!this.$store.getters.selectedOffice) {
      this.$router.push('/')
    }
  },

  async mounted () {
    if (this.$store.getters.selectedOffice) {
      this.initialize()
    }
  },

  async beforeUpdate () {
    this.checkSelectedPlayer()
  },

  beforeDestroy () {
    this.$store.dispatch('clearSelectedPlayer')
  },
}
</script>

<style lang="scss" scoped>
  h1, button, a {
    text-align: center;
  }
  h1 {
    margin: 20px auto 0 auto;
    max-width: 90%;
  }
  table {
    margin-top: 2px;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 95%;
  }
  td, th {
    padding: 4px 10px;
    border: 1px solid #e2e2e2;
    text-align: center;
  }
  th {
    padding: 8px 10px;
  }
  td {
    font-size: 14px;
    &.elo {
      font-size: 15px;
    }
  }
  .winnerRating {
    color: rgb(0, 107, 0);
  }
  .loserRating {
    color: rgb(156, 0, 0);
  }
  .bold {
    font-weight: bold;
  }
</style>