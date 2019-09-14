export default {
  async getPlayerList () {
    let response = await fetch('http://localhost:8081/api/players')
    return await response.json()
  },

  async addPlayer (playerName) {
    let response = await fetch('http://localhost:8081/api/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: playerName})
    })
    return await response.json()
  },

  async getPlayerData (playerName) {
    let response = await fetch('http://localhost:8081/api/player/' + playerName)
    return await response.json()
  },

  async changePlayerName (playerId, newPlayerName) {
    let response = await fetch('http://localhost:8081/api/player/' + playerId, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: newPlayerName})
    })
    return await response.json()
  },

  async deletePlayer (playerName) {
    let response = await fetch('http://localhost:8081/api/players/' + playerName, {
      method: 'DELETE'
    })
    return await response.json()
  }
}