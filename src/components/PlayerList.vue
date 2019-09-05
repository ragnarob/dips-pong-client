<template>
  <div> 
    <div class="player-list">
      <h2 style="text-align: center;">Player ratings</h2>
      <table>
        <tr v-for="player in $store.getters.playerList" :key="player.id">
          <td style="padding-right: 10px;">
            <router-link :to="`/player/${player.name}`">
              {{player.name}}
            </router-link>
          </td>
          <td style="text-align: right;" class="elo">{{player.elo}}</td>
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
  margin: 8px auto 0 auto;
  width: 100%;
  td {
    padding: 4px 0;
  }
}
</style>
