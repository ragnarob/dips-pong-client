<template>
  <div> 
    <div class="player-list">
      <h2>All games</h2>
      <table style="margin-top: 6px;" v-if="$store.getters.allGames.length > 0">
        <thead>
          <tr>
            <th>Time</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Rating<br/>change</th>
          </tr>
        </thead>

        <tr v-for="game in $store.getters.allGames" :key="game.gameId">
          <td style="text-align: center;">{{prettyDate(game.timestamp)}}</td>
          <td>{{game.winningPlayer}}</td>
          <td>{{game.losingPlayer}}</td>
          <td style="text-align: center;">{{game.winnerEloChange}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentGames',

  methods: {
    prettyDate (dateString) {
      return (new Date(dateString)).toDateString().substring(0, 10) + ', ' + ((new Date(dateString)).toTimeString().substring(0, 5))
    },
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
  }
  table {
    border-collapse: collapse;
  }
  td, th {
    padding: 4px 10px;
    border: 1px solid #aaa;
  }
</style>