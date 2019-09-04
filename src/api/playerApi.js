export default {
  async getPlayerList () {
    let response = await fetch('/players')
    return await response.json()
  },

  async addPlayer (playerName) {
    let response = await fetch('/players', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newPlayerName: playerName})
    })
    return await response.json()
  }
}