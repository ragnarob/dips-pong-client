import Vue from 'vue'
import Vuex from 'vuex'
import playerApi from './api/playerApi'
import gameApi from './api/gameApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerList: [],
    selectedPlayer: undefined,
    hotStreaks: [],
    allGames: [],
  },

  mutations: {
    setPlayerList (state, playerList) {
      state.playerList = playerList
    },

    setSelectedPlayer (state, selectedPlayer) {
      state.selectedPlayer = selectedPlayer
    },

    setHotStreaks (state, hotStreaks) {
      state.hotStreaks = hotStreaks
    },

    setAllGames (state, allGames) {
      state.allGames = allGames
    }
  },

  actions: {
    async getPlayerList (context) {
      let playerList = await playerApi.getPlayerList()
      context.commit('setPlayerList', playerList)
    },

    async getPlayerData (context, playerName) {
      let playerData = await playerApi.getPlayerData(playerName)
      if (!playerData.error) {
        context.commit('setSelectedPlayer', playerData)
      }
      else {
        context.commit('setSelectedPlayer', undefined)
      }
    },

    clearSelectedPlayer (context) {
      context.commit('setSelectedPlayer', undefined)
    },

    async getHotStreaks (context) {
      let streakData = await playerApi.getHotStreaks()
      context.commit('setHotStreaks', streakData)
    },

    async getAllGames (context) {
      let allGames = await gameApi.getAllGames()
      context.commit('setAllGames', allGames)
    }
  },

  getters: {
    playerList: state => state.playerList,
    selectedPlayer: state => state.selectedPlayer,
    hotStreaks: state => state.hotStreaks,
    allGames: state => state.allGames,
  }
})
