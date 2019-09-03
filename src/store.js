import Vue from 'vue'
import Vuex from 'vuex'
import playerApi from './api/playerApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerList: []
  },

  mutations: {
    setPlayerList (state, playerList) {
      state.playerList = playerList
    }
  },

  actions: {
    async getPlayerList (context) {
      let playerList = await playerApi.getPlayerList()
      context.commit('setPlayerList', playerList)
    }
  },

  getters: {
    playerList: state => state.playerList,
  }
})
