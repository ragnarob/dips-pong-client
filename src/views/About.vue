<template>
  <div style="display: flex; flex-direction: column; max-width: 500px; margin: auto; text-align: justify; padding: 0 16px;">
    <h1>About</h1>

    <router-link :to="'/'" style="width: fit-content; margin: 6px auto 0 auto;">
      <ArrowLeft/> Back to home
    </router-link>

    <h3 style="margin-top: 10px;">Rating</h3>
    <p style="margin-top: 2px;">The rating system being used is standard <a href="https://en.wikipedia.org/wiki/Elo_rating_system">ELO</a>. Very simple to implement, but not very sophisticated.</p>
    <p>The basics of ELO are:</p>
    <ul>
      <li>Each player starts at a predefined rating (1200)</li>
      <li>The winning player wins as many points as the losing player loses. In other words, rating is transferred from the losing player to the winning player</li>
      <li>The average rating in a league is always 1200</li>
      <li>How much rating is transferred is determined by how likely the result is. If the winning player is expected to win, less rating is transferred. If the winning player is expected to lose, more rating is transferred.</li>
    </ul>

    <p>Min/max rating transferred is <span class="consolas-text">probability * k</span>. Currently, this constant <span class="consolas-text">k</span> is set to 32.
       This means that no matter how big the rating difference is, <u>no more than 32 points can ever be transferred</u>.</p>
    <p>Below are some examples of ratings and points transferred:</p>
    <table>
      <thead>
        <tr>
          <th>A</th>
          <th>X</th>
          <th>A wins</th>
          <th>X wins</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1200</td>
          <td>1200</td>
          <td>16</td>
          <td>16</td>
        </tr>
        <tr>
          <td>1300</td>
          <td>1200</td>
          <td>12</td>
          <td>20</td>
        </tr>
        <tr>
          <td>1400</td>
          <td>1200</td>
          <td>8</td>
          <td>24</td>
        </tr>
        <tr>
          <td>1400</td>
          <td>1100</td>
          <td>5</td>
          <td>27</td>
        </tr>
        <tr>
          <td>1600</td>
          <td>900</td>
          <td>1</td>
          <td>31</td>
        </tr>
      </tbody>
    </table>

    <p><i>Changes to the constant k, or the imeplementation of a new and better rating system such as Glicko-2, can be considered. All that needs to be done afterwards is to rerun all the games through the new rating calculations.</i></p>

    <p><i>If players at some point travel to other offices/leagues, I might implement a feature where players can essentially steal points from the other league by winning against their players (and keep a record of which office has stolen the most points from which). This would mean that the average rating in each league would differ from 1200.</i></p>

    <h3>Rivalry calculation</h3>
    <p style="margin-top: 2px;">The rivalries list will list the top three pairs of players with the highest "rivalry score".</p>
    <p>The function is shown below, where <pre>diff</pre> is the difference in games between the two players, and <pre>total</pre> is the total number of games they've played. Improvements to this function are welcome.</p>
    <p class="consolas-text">rivalryScore = total - ((diff + 1) * total) / 5</p>
    <p>A player pair must also have more than five games in total for the score to count.</p>
    <p>This list will work better the more games there are in a league. It might look a little silly at first. (Oslo office, I'm looking at you (at the time of writing))</p>

    <h3>Deleting games</h3>
    <p style="margin-top: 2px;">Games can be deleted as long as neither player involved has had a more recent game than the one being deleted.</p>
    <p>This feature is meant to be used immediately after registering a wrong result.</p>

    <h3>Hosting &amp; etc</h3>
    <p style="margin-top: 2px;">Server: Node.js with Express and MySQL running on an Ubuntu-vm hosted by Vultr.</p>

    <h3>More content to come here later?</h3>
    <p style="margin-top: 2px;">Stay tuned!</p>
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

  mounted () {
    window.scrollTo(0,0)
  }
}
</script>

<style lang="scss" scoped>
  ul {
    margin-left: 18px;
    li {
      margin-top: 6px;
    }
  }
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
    margin-top: 16px;
  }
  pre {
    display: inline;
  }
  .consolas-text {
    font-size: 16px;
    font-family: 'Courier New', Courier, monospace;
  }
  table {
    margin-bottom: 6px;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  td, th {
    border: 1px solid #e2e2e2;
    text-align: center;
  }
  th {
    padding: 8px 10px;
  }
  td {
    font-family: 'Consolas';
    padding: 4px 10px;
    font-size: 14px;
    &.elo {
      font-size: 15px;
    }
  }

</style>