export default {
  async getHotStreaks () {
    let response = await fetch('http://localhost:8081/api/hotstreaks')
    return await response.json()
  },

  async getRatingStats () {
    let response = await fetch('http://localhost:8081/api/ratingstats')
    return await response.json()
  }
}