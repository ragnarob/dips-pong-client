<template>
  <div> 
    <div class="player-list">
      <h2 style="text-align: center;">Player ratings</h2>
      <table v-if="$store.getters.playerList.length > 0">
        <tr v-for="player in $store.getters.playerList" :key="player.id">
          <td style="padding-right: 10px;">
            <router-link :to="`/player/${player.name}`">
              {{player.name}}
            </router-link>
          </td>
          <td style="text-align: right;" class="elo">{{player.elo}}</td>
        </tr>
      </table>

      <p v-else style="margin-top: 14px; text-align: center;">
        No players
      </p>
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
  margin: 8px auto 0 auto;
  width: 100%;
  td {
    padding: 4px 0;
  }
}
</style>
