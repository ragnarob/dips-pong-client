<template>
  <div style="display: flex; flex-direction: column; max-width: 600px; margin: auto; text-align: justify; padding: 0 16px;">
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
       This means that no matter how big the rating difference is, <u>no more than 32 points can ever be transferred</u>. This can change with different variations of ELO, see further below.</p>
    <p>Further below are some examples of ratings and points transferred.</p>

    <p><i>Changes to the constant k, or the imeplementation of a new and better rating system can be considered. All that needs to be done afterwards is to rerun all the games through the new rating calculations.</i></p>

    <p><i>If players at some point travel to other offices/leagues, I might implement a feature where players can essentially steal points from the other league by winning against their players (and keep a record of which office has stolen the most points from which). This would mean that the average rating in each league would differ from 1200.</i></p>

    <h3>Rivalry calculation</h3>
    <p style="margin-top: 2px;">The rivalries lists the top three pairs of players with the highest "rivalry score".</p>
    <p>The function for calculating score is shown below, where <pre>diff</pre> is the difference in wins between the two players, and <pre>total</pre> is the total number of games they've played against each other. Improvements to this function are welcome.</p>
    <p class="consolas-text">rivalryScore = total - ((diff + 1) * total) / 5</p>
    <p>A player pair must also have more than five games in total for the score to count.</p>
    <p>This list will work better the more games there are in a league. It might look a little silly at first. (Oslo office, I'm looking at you (at the time of writing))</p>

    <h3>Deleting games</h3>
    <p style="margin-top: 2px;">
      Games can be deleted as long as neither player involved has had a more recent game than the one being deleted.
    </p>
    <p>
      This feature is meant to be used immediately after registering a wrong result.
    </p>

    <h3>Hosting &amp; etc</h3>
    <p style="margin-top: 2px;">
      Server: Node.js with Express and MySQL running on an Ubuntu-vm hosted by Vultr.
    </p>

    <h3>Different rating systems</h3>
    <div class="row-flex">
      <p style="margin-top: 2px;">
        <select v-model="selectedRatingSystem">
          <option v-for="ratingSystemName in ratingSystems" :key="ratingSystemName">
            {{ratingSystemName}}
          </option>
        </select>
      </p>

      <button class="normal-button small-button" 
              style="margin-left: 6px;" 
              @click="testRatingSystem()"
              :class="{'button-disabled': !$store.getters.selectedOffice || !selectedRatingSystem}">
        Test
      </button>
    </div>

    
    <p v-if="!$store.getters.selectedOffice">
      You must select a league from the home page to simulate ratings for.
    </p>

    <div class="row-flex" v-if="testedSystemRatings.length > 0" style="margin-top: 10px;">
      <div class="col-flex">
        <h2 style="margin-bottom: -10px;">Regular ELO</h2>
        <PlayerList :hideInactivePlayers="true" :hideHeader="true"/>
      </div>
      <div class="col-flex" style="margin-left: 30px;">
        <h2 style="margin-bottom: -10px;">{{selectedRatingSystem}}</h2>
        <PlayerList :listToUse="testedSystemRatings" :hideInactivePlayers="true" :hideHeader="true"/>
      </div>
    </div>

    <p>Below are the different rating systems proposed. So far, they all have the same outcome if the player with higher rating wins.</p>
    <table v-if="ratingSamples">
      <thead>
        <tr>
          <th rowspan="2">A</th>
          <th rowspan="2">X</th>
          <th rowspan="2">Diff</th>
          <th v-for="system in ratingSystems" :key="system" colspan="2">
            {{system}}
          </th>
        </tr>
        <tr>
          <th v-for="i in ratingSystems.length * 2" :key="i">
            {{i%2 === 1 ? 'A' : 'X'}} wins
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ratings, sampleIndex) in ratingSamples.ratings" :key="sampleIndex">
          <td>{{ratings[0]}}</td>
          <td>{{ratings[1]}}</td>
          <td><b>{{ratings[1] - ratings[0]}}</b></td>
          <td v-for="i in ratingSystems.length * 2" :key="i">
            
            {{  ratingSamples.changes[ratingSystems[Math.floor((i-1)/2)]] [sampleIndex] [ i%2==1 ? 'expectedChange' : 'upsetChange' ]  }}
          </td>
        </tr>
      </tbody>
    </table>

    <img src="../../assets/elograph.jpg" style="width: 100%;"/>

    <h3>More content to come here later?</h3>
    <p style="margin-top: 2px;">Stay tuned!</p>
  </div>
</template>

<script>
import miscApi from '@/api/miscApi'

import PlayerList from '@/components/PlayerList.vue'
import ArrowLeft from 'vue-material-design-icons/ArrowLeftCircle.vue'

export default {
  name: 'player',

  components: {
    ArrowLeft,
    PlayerList,
  },

  data: function () {
    return {
      ratingSystems: [],
      selectedRatingSystem: undefined,
      testedSystemRatings: [],
      ratingSamples: undefined,
    }
  },

  methods: {
    async testRatingSystem () {
      if (this.$store.getters.selectedOffice) {
        this.testedSystemRatings = await miscApi.simulateRatingSystem(this.selectedRatingSystem, this.$store.getters.selectedOffice.id)
      }
    }
  },

  async mounted () {
    window.scrollTo(0,0)

    this.ratingSystems = await miscApi.getRatingSystems()
    this.ratingSamples = await miscApi.getSampleOutcomes()
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
  tr:hover {
    background-color: #d4d4d4;
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