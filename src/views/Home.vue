<template>
  <div class="home">
    <div>
      <h1 style="margin-top: 20px;">DIPS-PONG</h1>
      
      <div style="display: flex; flex-direction: row; width: fit-content; margin: auto; flex-wrap: wrap; justify-content: center;">
        <div class="bordered">
          <PlayerList/>
        </div>

        <div class="display: flex; flex-direction: column; align-items: center;">
          <div class="bordered">
            <OtherStats/>
          </div>

          <div style="display: flex; flex-direction: column; width: fit-content; margin: 50px auto 30px auto;">
            <AddGame v-if="!$store.state.isAddingPlayer"/>
            <AddPlayer v-if="!$store.state.isAddingGame"/>
          </div>
        </div>
      </div>

      <div v-if="$store.getters.ratingStats" class="bordered" style="margin: 20px auto 40px auto; width: 1000px; max-width: 85%;">
        <Graph/>
      </div>

      <div class="bordered" style="margin: 20px auto 20px auto; max-width: 85%;">
        <RecentGames/>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue'
import AddPlayer from '@/components/AddPlayer.vue'
import AddGame from '@/components/AddGame.vue'
import OtherStats from '@/components/OtherStats.vue'
import RecentGames from '@/components/RecentGames.vue'
import Graph from '@/components/Graph.vue'

export default {
  name: 'home',

  components: {
    PlayerList,
    AddPlayer,
    AddGame,
    OtherStats,
    RecentGames,
    Graph
  },

  methods: {
    updateTables () {
      this.$store.dispatch('getPlayerList')
      this.$store.dispatch('getHotStreaks')
      this.$store.dispatch('getAllGames')
      this.$store.dispatch('getRatingStats')
    }
  },

  created () {
    this.updateTables()

    setInterval(this.updateTables, 1000*60)
  }
}
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }
  .bordered {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    width: fit-content;
    height: fit-content;
    margin: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 16px;
  }
</style>
