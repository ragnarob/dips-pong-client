const axios = require('axios')
const apiUrlBase = require('../config.json').apiUrlBase

export default {
  async addGame (winningPlayerId, losingPlayerId, officeId) {
    let response = await axios.post(apiUrlBase + '/api/games', {
      winnerId: winningPlayerId, 
      loserId: losingPlayerId,
      officeId: officeId
    })
    return response.data
  },

  async getAllGames (officeId) {
    let response = await axios.get(`${apiUrlBase}/api/games?officeId=${officeId}`)
    return response.data
  },

  async deleteGame (gameId) {
    let response = await axios.delete(`${apiUrlBase}/api/games/${gameId}`)
    return response.data
  },
}