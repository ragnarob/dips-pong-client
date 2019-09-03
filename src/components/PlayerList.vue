<template>
  <div>
    <h2>Player ratings</h2>
    <table>
      <tr v-for="player in $store.getters.playerList" :key="player.id">
        <td>{{player.name}}</td>
        <td>{{player.elo}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
}
</script>

<style scoped lang="scss">
</style>
