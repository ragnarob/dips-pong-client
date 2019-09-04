const baseUrl = 'http://localhost:8081/api'

export default {
  async getPlayerList () {
    let response = await fetch(baseUrl + '/players')
    return await response.json()
  },

  async addPlayer (playerName) {
    let response = await fetch(baseUrl + '/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: playerName})
    })
    return await response.json()
  }
}