<template>
  <div style="display: flex; flex-direction: column; max-width: 500px; margin: auto; text-align: justify; padding: 0 16px;">
    <h1>Rules</h1>

    <router-link :to="'/'" style="width: fit-content; margin: 6px auto 0 auto;">
      <ArrowLeft/> Back to home
    </router-link>

    <h3 style="margin-top: 10px;">Scoring</h3>
    <p>First player to 11 points wins the match.</p>
    <p>Points are always awarded (<i>not</i> only when the scoring player is serving).</p>
    <p>A player must win by at least two points. In the event of a tie at 10-10, the game continues until one player is ahead by two points (e.g. 12-10, 13-11, etc). From the moment the 10-10 tie occurs, each player serves <i>one</i> serve each, not two.</p>

    <h3>Serve rules</h3>
    <p>Each player serves twice (two points), alternating.</p>
    <p>The player with lower rating serves first.</p>
    <p>The ball must be behind the end of the table until struck.</p>
    <p>Official rules require the ball to be tossed into the air - we don't care. Just don't spin the ball with your hand.</p>
    <p>The ball must bounce once on the serving player's side of the table, go over the net, and then land on the opposing side.</p>
    <p>If the serve is legal but hits the net on its way over, redo the serve.</p>
    <p>In singles, there is no rule dictating where on the opposing side of the table the ball should end up.</p>

    <h3>Other rules</h3>
    <p>Touching the table is not allowed. Doing so results in a lost point.</p>
    <p>Hitting the ceiling or walls results in a lost point.</p>
    <p>Trash-talking is allowed and encouraged.</p>
  </div>
</template>

<script>
import ArrowLeft from 'vue-material-design-icons/ArrowLeftCircle.vue'

export default {
  name: 'player',

  components: {
    ArrowLeft,
  },

  data: function () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
  h1, button, a {
    text-align: center;
  }
  h1 {
    margin: 20px auto 0 auto;
    max-width: 90%;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
  }
  p {
    margin-top: 8px;
  }
</style>