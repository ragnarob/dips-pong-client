export default {
  async getHotStreaks () {
    let response = await fetch('/api/hotstreaks')
    return await response.json()
  },

  async getRatingStats () {
    let response = await fetch('/api/ratingstats')
    return await response.json()
  }
}