import Vue from 'vue'
import Vuex from 'vuex'
import playerApi from './api/playerApi'
import gameApi from './api/gameApi'
import miscApi from './api/miscApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerList: [],
    selectedPlayer: undefined,
    hotStreaks: [],
    allGames: [],
    ratingStats:  [],
    isAddingPlayer: false,
    isAddingGame: false,
    offices: [],
    selectedOffice: undefined,
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
    },

    setRatingStats (state, ratingStats) {
      state.ratingStats = ratingStats
    },

    setSelectedOffice (state, selectedOffice) {
      state.selectedOffice = selectedOffice
    },

    setOffices (state, offices) {
      state.offices = offices
    }
  },

  actions: {
    async getPlayerList (context) {
      let playerList = await playerApi.getPlayerList(context.getters.selectedOffice.id)
      context.commit('setPlayerList', playerList)
    },

    async getPlayerData (context, playerName) {
      let playerData = await playerApi.getPlayerData(playerName, context.getters.selectedOffice.id)
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
      let streakData = await miscApi.getHotStreaks(context.getters.selectedOffice.id)
      context.commit('setHotStreaks', streakData)
    },

    async getAllGames (context) {
      let allGames = await gameApi.getAllGames(context.getters.selectedOffice.id)
      context.commit('setAllGames', allGames)
    },

    async getRatingStats (context) {
      let ratingStats = await miscApi.getRatingStats(context.getters.selectedOffice.id)
      context.commit('setRatingStats', ratingStats)
    },

    async getOffices (context) {
      let offices = await miscApi.getOffices()
      context.commit('setOffices', offices)
    },

    async setSelectedOffice (context, selectedOffice) {
      context.commit('setSelectedOffice', selectedOffice)
      if (selectedOffice) {
        context.dispatch('loadData')
      }
    },

    async loadData (context) {
      context.dispatch('getPlayerList')
      context.dispatch('getHotStreaks')
      context.dispatch('getAllGames')
      context.dispatch('getRatingStats')
    },
  },

  getters: {
    playerList: state => state.playerList,
    selectedPlayer: state => state.selectedPlayer,
    hotStreaks: state => state.hotStreaks,
    allGames: state => state.allGames,
    ratingStats: state => state.ratingStats,
    ratingStatsFunc: state => () => state.ratingStats,
    offices: state => state.offices,
    selectedOffice: state => state.selectedOffice,
  }
})
