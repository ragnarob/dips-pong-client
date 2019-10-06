const axios = require('axios')
const apiUrlBase = require('../config.json').apiUrlBase

export default {
  async getOtherStats (officeId) {
    let response = await axios.get(`${apiUrlBase}/api/otherstats?officeId=${officeId}`)
    return response.data
  },

  async getRatingStats (officeId) {
    let response = await axios.get(`${apiUrlBase}/api/ratingstats?officeId=${officeId}`)
    return response.data
  },

  async getOffices () {
    let response = await axios.get(`${apiUrlBase}/api/offices`)
    return response.data
  },

  async addOffice (officeName, officePassword, passwordHint, slackBotUrl) {
    let response = await axios.post(`${apiUrlBase}/api/offices`, {
      officeName: officeName, officePassword: officePassword, passwordHint: passwordHint, slackBotUrl: slackBotUrl
    })
    return response.data
  },

  async updateOffice (officeId, newOfficeName, currentPassword, newPassword, passwordHint, newSlackBotUrl) {
    let response = await axios.post(`${apiUrlBase}/api/offices/${officeId}`, {
      officeName: newOfficeName, currentPassword: currentPassword, newPassword: newPassword, passwordHint: passwordHint, slackBotUrl: newSlackBotUrl
    })
    return response.data
  },

  async login (officeId, password) {
    let response = await axios.post(`${apiUrlBase}/login`, {
      officeId: officeId, password: password
    })
    return response.data
  },

  async getRatingSystems () {
    let response = await axios.get(`${apiUrlBase}/api/testratingsystem/systems`)
    return response.data
  },

  async getSampleOutcomes () {
    let response = await axios.get(`${apiUrlBase}/api/testratingsystem/samples`)
    return response.data
  },

  async simulateRatingSystem (ratingSystemName, officeId) {
    let response = await axios.get(`${apiUrlBase}/api/testratingsystem/${ratingSystemName}?officeId=${officeId}`)
    return response.data
  }
}