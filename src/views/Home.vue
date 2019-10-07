<template>
  <div class="home">
    <router-link :to="'/display'" style="position: absolute; top: 3px; left: 3px; font-size: 12px;">
      Display view
    </router-link>

    <p v-show="$store.getters.loggedInOffice" style="position: absolute; top: 3px; right: 3px; font-size: 12px;">
      Logged in: {{$store.getters.loggedInOffice}}
    </p>
    
    <div>
      <h1 style="margin-top: 20px;">DIPS-PONG</h1>
      
      <OfficeSelector/>

      <RecentChanges/>

      <div v-if="$store.getters.selectedOffice">
        <div style="display: flex; flex-direction: row; width: fit-content; margin: auto; flex-wrap: wrap; justify-content: center;">
          <div class="bordered">
            <PlayerList/>
          </div>

          <div class="display: flex; flex-direction: column; align-items: center;">
            <div class="bordered">
              <OtherStats/>
            </div>

            <div style="display: flex; flex-direction: column; width: fit-content; margin: 50px auto 30px auto; align-items: center;">
              <AddGame v-if="!$store.state.isAddingPlayer"/>
              <AddPlayer v-if="!$store.state.isAddingGame"/>

              <router-link :to="'/rules'" style="width: fit-content; margin-top: 22px;">
                <BookIcon/> Game rules
              </router-link>

              <router-link :to="'/about'" style="width: fit-content; margin-top: 8px;">
                <InformationIcon/> How stuff works
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="$store.getters.ratingStats.length > 0" class="bordered" style="margin: 20px auto 40px auto; width: 100%; max-width: 85%; padding-bottom: 0;">
          <Graph :chartHeight="'400'" :chartWidth="'100%'" :showTitle="true"/>
        </div>

        <div class="bordered" style="margin: 20px auto 20px auto; max-width: 85%;">
          <RecentGames/>
        </div>
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
import OfficeSelector from '@/components/OfficeSelector.vue'
import RecentChanges from '@/components/RecentChanges.vue'

import BookIcon from 'vue-material-design-icons/BookOpenPageVariant.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'

export default {
  name: 'home',

  components: {
    PlayerList,
    AddPlayer,
    AddGame,
    OtherStats,
    RecentGames,
    Graph,
    OfficeSelector,
    RecentChanges,
    BookIcon,
    InformationIcon,
  },
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
