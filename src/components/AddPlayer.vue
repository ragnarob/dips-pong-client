<template>
  <div>
    <button v-if="!isAdding" @click="isAdding = true">Add new player</button>
    <form v-on:submit.prevent="addPlayer">
      <input type="text" v-model="newPlayerName" v-show="isAdding"/>
      <input type="submit" value="Add player" v-show="isValidName">
    </form>

    <div v-show="hasAdded">
      <p style="color: green" v-show="addSuccessful">{{successMessage}}</p>
      <p style="color: red" v-show="!addSuccessful">Failed: {{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import playerApi from '@/api/playerApi'

export default {
  name: 'AddPlayer',

  data: function () {
    return {
      isAdding: false,
      newPlayerName: '',
      addSuccessful: false,
      hasAdded: false,
      successMessage: '',
      errorMessage: '',
    }
  },

  methods: {
    async addPlayer () {
      if (this.newPlayerName.length < 1) { return }

      let response = await playerApi.addPlayer(this.newPlayerName)
      this.hasAdded = true

      if (!response.error) {
        this.addSuccessful = true
        this.$store.dispatch('getPlayerList')

        this.successMessage = 'Success adding ' + this.newPlayerName

        this.newPlayerName = ''
        this.isAdding = false
      }
      else {
        this.addSuccessful = false
        this.errorMessage = response.error
      }
    }
  },

  computed: {
    isValidName () {
      return this.newPlayerName.length > 1 && /^[\wÆØÅæøå\s]+$/i.test(this.newPlayerName)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
