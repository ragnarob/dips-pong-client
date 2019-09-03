<template>
  <div class="home">
    <div>
      <h1 style="margin-top: 20px;">DIPS-PONG</h1>

      <p style="margin: 0 10px;">Ragnars fantastiske ping-pong-webapp, velkommen!
      Praise Javascript.</p>

      <div class="bordered">
        <PlayerList/>
      </div>

      <div class="bordered" style="width: 300px; align-items: center; justify-content: space-between; border: none;">
        <AddPlayer/>
        <AddGame/>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerList from '@/components/PlayerList.vue'
import AddPlayer from '@/components/AddPlayer.vue'
import AddGame from '@/components/AddGame.vue'

export default {
  name: 'home',

  components: {
    PlayerList,
    AddPlayer,
    AddGame,
  },

  created () {
    this.$store.dispatch('getPlayerList')
  }
}
</script>

<style scoped lang="scss">
  h1, p {
    text-align: center;
  }
  .bordered {
    border: 1px solid #aaa;
    border-radius: 10px;
    width: fit-content;
    margin: 20px auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 16px;
  }
</style>