export default {
  async addGame (winningPlayerId, losingPlayerId) {
    let response = await fetch('http://localhost:8081/api/games', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({winnerId: winningPlayerId, loserId: losingPlayerId})
    })
    return await response.json()
  },

  async getAllGames () {
    let response = await fetch('http://localhost:8081/api/games')
    return await response.json()
  },

  async deleteGame (gameId) {
    let response = await fetch('http://localhost:8081/api/games/' + gameId, {
      method: 'DELETE'
    })
    return await response.json()
  }
}