<template>
  <div style="display: flex; flex-direction: row; width: 100vw; height: 94vh;">
    <router-link :to="'/'" style="position: absolute; top: 3px; left: 3px; font-size: 12px;">
      Interactive view
    </router-link>

    <div style="height: fit-content; width: 240px; margin: 10px 10px 0 10px; padding: 16px; flex-shrink: 0;">
      <PlayerList v-if="showPlayerList" :hideInactivePlayers="true"/>
      <OtherStats style="margin-top: 30px;"/>
    </div>
    <div style="height: 100%; margin: 0 0 0 0px; display: flex; flex-direction: column; overflow: hidden; width: 2000px;">
      <Graph v-if="showGraph" :chartHeight="'100%'" :chartWidth="'100%'" :showTitle="false" style="margin-bottom: 10px;"/>
      <RecentGames :hoursCutoff="12" :horizontalView="true"/>
    </div>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue'
import Graph from '@/components/Graph.vue'
import OtherStats from '@/components/OtherStats.vue'
import RecentGames from '@/components/RecentGames.vue'

import BookIcon from 'vue-material-design-icons/BookOpenPageVariant.vue'

export default {
  name: 'home',

  components: {
    PlayerList,
    Graph,
    OtherStats,
    RecentGames,
    BookIcon,
  },

  data: function () {
    return {
      showGraph: true,
      showPlayerList: true,
      showLFG: false,
    }
  }
}
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }
</style>
