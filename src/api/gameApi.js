export default {
  async addGame (winningPlayerId, losingPlayerId, officeId) {
    let response = await fetch('/api/games', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        winnerId: winningPlayerId, 
        loserId: losingPlayerId,
        officeId: officeId
      })
    })
    return await response.json()
  },

  async getAllGames (officeId) {
    let response = await fetch(`/api/games?officeId=${officeId}`)
    return await response.json()
  },

  async deleteGame (gameId) {
    let response = await fetch('/api/games/' + gameId, {
      method: 'DELETE'
    })
    return await response.json()
  }
}