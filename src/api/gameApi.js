export default {
  async addGame (winningPlayerId, losingPlayerId) {
    let response = await fetch('/games', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({winnerId: winningPlayerId, loserId: losingPlayerId})
    })
    return await response.json()
  },
}