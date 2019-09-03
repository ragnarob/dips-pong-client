<template>
  <div> 
    <div class="player-list">
      <h2>Player ratings</h2>
      <table style="margin: 8px auto 0 auto;">
        <tr v-for="player in $store.getters.playerList" :key="player.id">
          <td style="padding-right: 10px;">{{player.name}}</td>
          <td style="text-align: right;">{{player.elo}}</td>
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

<style lang="scss">
</style>
