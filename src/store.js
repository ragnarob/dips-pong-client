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
    otherStats: undefined,
    allGames: [],
    ratingStats:  [],
    isAddingPlayer: false,
    isAddingGame: false,
    offices: [],
    selectedOffice: undefined,
    showLoginModal: false,
    isLoggedIn: false,
    loggedInOffice: '',
  },

  mutations: {
    setPlayerList (state, playerList) {
      state.playerList = playerList
    },

    setSelectedPlayer (state, selectedPlayer) {
      state.selectedPlayer = selectedPlayer
    },

    setOtherStats (state, otherStats) {
      state.otherStats = otherStats
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
    },

    setShowLoginModal (state, showLoginModal) {
      state.showLoginModal = showLoginModal
    },

    setLoggedInOffice (state, loggedInOffice) {
      state.loggedInOffice = loggedInOffice
    }
  },

  actions: {
    async getPlayerList (context) {
      let playerList = await playerApi.getPlayerList(context.getters.selectedOffice.id)
      let playersWithGames = []
      let noGamesPlayers = []
      let positionCounter = 1
      for (var i=0; i<playerList.length; i++) {
        let player = playerList[i]
        if (player.gamesCount === 1 && player.elo === 1200) {
          player.gamesCount = 0
          noGamesPlayers.push(player)
        }
        else {
          player.position = positionCounter++
          playersWithGames.push(player)
        }
      }
      let finalPlayerList =  playersWithGames.concat(noGamesPlayers)
      context.commit('setPlayerList', finalPlayerList)
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

    async getOtherStats (context) {
      let otherStatsData = await miscApi.getOtherStats(context.getters.selectedOffice.id)
      context.commit('setOtherStats', otherStatsData)
      console.log(otherStatsData)
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
      if (context.state.selectedOffice) {
        context.dispatch('getPlayerList')
        context.dispatch('getOtherStats')
        context.dispatch('getAllGames')
        context.dispatch('getRatingStats')
      }
    },

    showLoginModal (context) {
      context.commit('setShowLoginModal', true)
    },

    setLoggedInOffice (context, loggedInOffice) {
      context.commit('setLoggedInOffice', loggedInOffice)
      window.localStorage.setItem('loggedInOffice', loggedInOffice)
    },
  },

  getters: {
    playerList: state => state.playerList,
    selectedPlayer: state => state.selectedPlayer,
    otherStats: state => state.otherStats,
    allGames: state => state.allGames,
    ratingStats: state => state.ratingStats,
    ratingStatsFunc: state => () => state.ratingStats,
    offices: state => state.offices,
    selectedOffice: state => state.selectedOffice,
    showLoginModal: state => state.showLoginModal,
    loggedInOffice: state => state.loggedInOffice,
    isLoggedIn: state => state.loggedInOffice && state.selectedOffice && (state.selectedOffice.name == state.loggedInOffice),
  }
})
