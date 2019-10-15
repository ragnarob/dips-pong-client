<template>
  <div> 
    <div>
      <h2 style="text-align: center;">Streaks</h2>

      <!-- STREAKS  -->
      <table v-if="$store.getters.otherStats && $store.getters.otherStats.streaks.length > 0" style="width: 100%;">
        <tr v-for="streak in $store.getters.otherStats.streaks" :key="streak.name">
          <td style="padding-right: 20px;">
            <router-link :to="'/player/' + streak.name">
              {{streak.name}}
            </router-link>
          </td>
          <td style="text-align: right;" class="elo">{{streak.streak}}</td>
        </tr>
      </table>

      <p v-else style="margin-top: 8px; text-align: center;">
        None at the moment
      </p>

      <!-- RIVALRIES -->
      <h2 style="text-align: center; margin-top: 16px;">Top rivalries</h2>

      <table v-if="$store.getters.otherStats && $store.getters.otherStats.rivalries.length > 0" style="width: 100%;">
        <tr v-for="(rivalry, index) in $store.getters.otherStats.rivalries" :key="index">
          <td style="padding-right: 10px;">
            <router-link :to="'/player/' + rivalry.p1">
              {{rivalry.p1}}</router-link>
            -
            <router-link :to="'/player/' + rivalry.p2">
              {{rivalry.p2}}
            </router-link>
          </td>
          <td style="text-align: right;" class="elo">
            {{rivalry.games[0]}}-{{rivalry.games[1]}}
          </td>
        </tr>
      </table>

      <p v-else style="margin-top: 8px; text-align: center;">
        None at the moment
      </p>

      <!-- CROSS LEAGUE -->
      <h2 v-if="$store.getters.otherStats && $store.getters.otherStats.crossLeagueResults.length > 0" style="text-align: center; margin-top: 16px;">Cross-league</h2>

      <table v-if="$store.getters.otherStats && $store.getters.otherStats.crossLeagueResults.length > 0" style="width: 100%;">
        <tr v-for="(crossLeagueStat, index) in $store.getters.otherStats.crossLeagueResults" :key="index">
          <td>
            <p @click="$store.dispatch('setSelectedOffice', $store.getters.offices.find(o => o.id === crossLeagueStat.officeId))"
               class="link-color"
               style="width: fit-content;">
              {{crossLeagueStat.officeName}}
            </p>
          </td>
          <td style="text-align: center; padding-left: 10px;">
            <p class="elo" style="margin-bottom: 1px;">
              {{crossLeagueStat.ratingChange >= 0 ? '+'+crossLeagueStat.ratingChange : crossLeagueStat.ratingChange}}
              ({{crossLeagueStat.games}})
            </p>
          </td>
        </tr>
      </table>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
}
</script>

<style lang="scss" scoped>
table {
  margin: 4px auto 0 auto;
  width: 100%;
  td {
    padding: 4px 0;
  }
}
</style>