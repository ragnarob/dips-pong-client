export default {
  async getPlayerList (officeId) {
    let response = await fetch(`/api/players?officeId=${officeId}`)
    return await response.json()
  },

  async addPlayer (playerName, officeId) {
    let response = await fetch('/api/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: playerName, officeId: officeId})
    })
    return await response.json()
  },

  async getPlayerData (playerName, officeId) {
    let response = await fetch(`/api/players/${playerName}?officeId=${officeId}`)
    return await response.json()
  },

  async changePlayerName (playerId, newPlayerName) {
    let response = await fetch('/api/players/' + playerId, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: newPlayerName})
    })
    return await response.json()
  },

  async deletePlayer (playerId) {
    let response = await fetch('/api/players/' + playerId, {
      method: 'DELETE'
    })
    return await response.json()
  }
}