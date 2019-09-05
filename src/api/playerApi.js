export default {
  async getPlayerList () {
    let response = await fetch('/api/players')
    return await response.json()
  },

  async addPlayer (playerName) {
    let response = await fetch('/api/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: playerName})
    })
    return await response.json()
  },

  async getPlayerData (playerName) {
    let response = await fetch('/api/player/' + playerName)
    return await response.json()
  },

  async changePlayerName (playerId, newPlayerName) {
    let response = await fetch('/api/player/' + playerId, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: newPlayerName})
    })
    return await response.json()
  },

  async getHotStreaks () {
    let response = await fetch('/api/hotstreaks')
    return await response.json()
  },
}