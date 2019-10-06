const axios = require('axios')
const apiUrlBase = require('../config.json').apiUrlBase

export default {
  async getPlayerList (officeId) {
    let response = await axios.get(`${apiUrlBase}/api/players?officeId=${officeId}`)
    return response.data
  },

  async addPlayer (playerName, officeId) {
    let response = await axios.post(`${apiUrlBase}/api/players`, {
      newPlayerName: playerName, officeId: officeId
    })
    return response.data
  },

  async getPlayerData (playerName, officeId) {
    let response = await axios.get(`${apiUrlBase}/api/players/${playerName}?officeId=${officeId}`)
    return response.data
  },

  async changePlayerName (playerId, newPlayerName) {
    let response = await axios.post(`${apiUrlBase}/api/players/${playerId}`, {
      newPlayerName: newPlayerName
    })
    return response.data
  },

  async deletePlayer (playerId) {
    let response = await axios.delete(`${apiUrlBase}/api/players/${playerId}`)
    return response.data
  },
}