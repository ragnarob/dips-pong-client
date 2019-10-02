export default {
  async getOtherStats (officeId) {
    let response = await fetch(`/api/otherstats?officeId=${officeId}`)
    return await response.json()
  },

  async getRatingStats (officeId) {
    let response = await fetch(`/api/ratingstats?officeId=${officeId}`)
    return await response.json()
  },

  async getOffices () {
    let response = await fetch('/api/offices')
    return await response.json()
  },

  async addOffice (officeName, slackBotUrl) {
    let response = await fetch(`/api/offices`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({officeName: officeName, slackBotUrl: slackBotUrl})
    })
    return await response.json()
  },

  async updateOffice (officeId, newOfficeName, newSlackBotUrl) {
    let response = await fetch(`/api/offices/${officeId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({officeName: newOfficeName, slackBotUrl: newSlackBotUrl})
    })
    return await response.json()
  }
}