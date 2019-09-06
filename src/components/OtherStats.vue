<template>
  <div> 
    <div>
      <h2 style="text-align: center;">Hot streaks</h2>

      <table v-if="$store.getters.hotStreaks.length > 0" style="width: 100%;">
        <tr v-for="streak in $store.getters.hotStreaks" :key="streak.name">
          <td style="padding-right: 10px;">
            <router-link :to="'/player/' + streak.name">
              {{streak.name}}
            </router-link>
          </td>
          <td style="text-align: right;" class="elo">{{streak.streak}}</td>
        </tr>
      </table>

      <p v-else style="margin-top: 14px;">
        None at the moment
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