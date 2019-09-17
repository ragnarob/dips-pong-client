<template>
  <div style="max-width: 100%;"> 
    <div class="player-list">
      <h2>All games</h2>

      <button @click="toggleDeleteMode()"
              v-if="$store.getters.allGames.length > 0" 
              style="margin: 4px auto;" 
              class="small-button smallButtonWithIconFirst">
        <DeleteIcon v-if="!deleteModeActivated"/>
        <CrossIcon v-if="deleteModeActivated"/>
        {{deleteModeActivated ? 'Cancel deleting' : 'Delete a game'}}
      </button>

      <p class="successMessage" v-if="deleteGameSuccess">Successfully deleted game</p>
      <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>

      <table style="margin-top: 6px;" v-if="$store.getters.allGames.length > 0">
        <thead>
          <tr>
            <th v-if="deleteModeActivated"><DeleteIconFull/></th>
            <th>Time</th>
            <th>Winner</th>
            <th>Loser</th>
            <th><PlusMinusIcon/> Rating&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in $store.getters.allGames" :key="game.gameId">
            <td v-if="deleteModeActivated"
                class="deleteIcon" 
                @click="deleteClick(game)">
              <p v-if="deletingGame && deletingGame.gameId === game.gameId">
                <button @click="deleteConfirmed()" class="small-button">
                  Confirm <DeleteIconFull/>
                </button>
              </p>
              <p v-else>
                <button class="small-button">
                  <DeleteIconFull/>
                </button>
              </p>
            </td>
            <td style="text-align: center;">
              {{prettyDate(game.timestamp)}}
            </td>
            <td style="text-align: center;">
              <router-link :to="'/player/'+game.winningPlayer">{{game.winningPlayer}}</router-link>
              <br>
              <p class="elosmall">{{game.winnerElo}}</p>
            </td>
            <td style="text-align: center;">
              <router-link :to="'/player/'+game.losingPlayer">{{game.losingPlayer}}</router-link>
              <br>
              <p class="elosmall">{{game.loserElo}}</p>
            </td>
            <td style="text-align: center;" class="elo">
                {{game.winnerEloChange}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="$store.getters.allGames.length === 0" style="margin-top: 14px; text-align: center;">No games yet</p>
  </div>
</template>

<script>
import gameApi from '@/api/gameApi'

import DeleteIcon from 'vue-material-design-icons/DeleteOutline.vue'
import DeleteIconFull from 'vue-material-design-icons/Delete.vue'
import CrossIcon from 'vue-material-design-icons/Close.vue'
import PlusMinusIcon from 'vue-material-design-icons/PlusMinus.vue'

export default {
  name: 'RecentGames',

  components: {
    DeleteIcon,
    DeleteIconFull,
    CrossIcon,
    PlusMinusIcon,
  },

  data: function () {
    return {
      deleteModeActivated: false,
      mouseOverDeleteGame: undefined,
      deletingGame: undefined,
      errorMessage: undefined,
      deleteGameSuccess: false,
    }
  },

  methods: {
    deleteClick (game) {
      this.deletingGame = game
    },

    toggleDeleteMode () {
      this.deleteModeActivated = !this.deleteModeActivated
      this.errorMessage = undefined
      this.deleteGameSuccess = false
      this.deletingGame = undefined
    },

    async deleteConfirmed () {
      this.deleteGameSuccess = false
      this.errorMessage = undefined

      let response = await gameApi.deleteGame(this.deletingGame.gameId)
      if (response.error) {
        this.errorMessage = response.error
      }
      else {
        this.deleteGameSuccess = true
        this.$store.dispatch('getAllGames')
        this.$store.dispatch('getPlayerList')
        this.$store.dispatch('getHotStreaks')
      }

      this.deletingGame = undefined
    },

    prettyDate (dateString) {
      const newDate = new Date(dateString)
      return newDate.toDateString().substring(0,3) + ' ' + newDate.toTimeString().substring(0,5)
    },
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  td, th {
    border: 1px solid #e2e2e2;
  }
  th {
    padding: 8px 10px;
  }
  td {
    padding: 4px 10px;
    font-size: 14px;
    &.elo {
      font-size: 15px;
    }
  }
  .deleteIcon {
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .player-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>