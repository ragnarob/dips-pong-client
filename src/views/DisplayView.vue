<template>
  <div style="display: flex; flex-direction: row; justify-content: center; align-items:center; width: 100%; height: 90vh;">
    <router-link :to="'/'" style="position: absolute; top: 3px; left: 3px; font-size: 12px;">
      Interactive view
    </router-link>

    <div style="height: fit-content; width: 240px; margin: 0 20px 0 10px; padding: 16px;">
      <PlayerList v-if="showPlayerList"/>
      <OtherStats style="margin-top: 30px;"/>
    </div>
    <div style="height: 100%; width: 100%; margin: 0 0 0 0px;">
      <Graph v-if="showGraph" :chartHeight="'100%'" :chartWidth="'100%'" :showTitle="false"/>
    </div>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue'
import Graph from '@/components/Graph.vue'
import OtherStats from '@/components/OtherStats.vue'

import BookIcon from 'vue-material-design-icons/BookOpenPageVariant.vue'

export default {
  name: 'home',

  components: {
    PlayerList,
    Graph,
    OtherStats,
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
