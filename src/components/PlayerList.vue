<template>
  <div> 
    <div class="player-list">
      <h2 style="text-align: center;" v-if="!hideHeader">Player ratings</h2>

      <table v-if="filteredPlayerList.length > 0">
        <tr v-for="player in filteredPlayerList" :key="player.id">
          <td>
            <p v-if="player.position===1" style="color: #C9B037;">
              <TrophyIcon/>
            </p>
            <p v-if="player.position===2" style="color: #B4B4B4;">
              <TrophyIcon/>
            </p>
            <p v-if="player.position===3" style="color: #AD8A56;">
              <TrophyIcon/>
            </p>
          </td>
          <td style="padding-right: 10px;">
            <router-link :to="`/player/${player.name}`">
              {{player.name}}
            </router-link>
          </td>
          <td style="text-align: right;" :class="{'elo': true, 'noGamesStyle': player.gamesCount===0}">
            <b>{{player.elo}}</b>
          </td>
          <td :class="{'elo': true, 'noGamesStyle': player.gamesCount===0}" style="padding-left: 12px;">
            {{player.gamesCount}}
          </td>
        </tr>
      </table>

      <p v-else style="margin-top: 14px; text-align: center;">
        No players
      </p>

      <p v-if="filteredPlayerList.length > 0"
         @click="showInactivePlayers = !showInactivePlayers"
         class="link-color"
         style="font-size: 12px; margin: 4px auto 0 auto; width: fit-content;">
        {{showInactivePlayers ? 'Hide inactive players' : 'Show inactive players'}}
      </p>
    </div>
  </div>
</template>

<script>
import TrophyIcon from 'vue-material-design-icons/Trophy.vue'

export default {
  name: 'PlayerList',

  props: {
    hideInactivePlayers: Boolean,
    listToUse: Array,
    hideHeader: Boolean,
  },

  components: {
    TrophyIcon,
  },

  data: function () {
    return {
      showInactivePlayers: false,
    }
  },

  methods: {
    toggleShowInactivePlayers () {
      this.showInactivePlayers = !this.showInactivePlayers
      this.$forceUpdate()
    }
  },

  computed: {
    filteredPlayerList () {
      let threeWeeksAgo = new Date()
      threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)
      if (!this.listToUse) {
        return this.$store.getters.playerList.filter(
          p => (!this.hideInactivePlayers || p.gamesCount > 0) && (this.showInactivePlayers || p.mostRecentGameDate > threeWeeksAgo)
        )
      }
      else {
        return this.listToUse
      }
    }
  },
}
</script>

<style lang="scss" scoped>
table {
  margin: 8px auto 0 auto;
  width: 100%;
  td {
    padding: 4px 0;
  }
}
.noGamesStyle {
  opacity: 0.4;
}
</style>
