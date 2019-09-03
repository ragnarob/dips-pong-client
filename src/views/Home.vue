<template>
  <div class="home">
    
    Ragnars fantastiske ping-pong-webapp, velkommen!
    Praise Javascript.

    <PlayerList/>
    <AddPlayer/>
    <AddGame/>

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
