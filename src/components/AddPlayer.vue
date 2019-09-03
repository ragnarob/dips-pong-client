<template>
  <div>
    <button v-show="!isAdding" @click="isAdding = true">Add new player</button>
    <form v-on:submit.prevent="addPlayer" v-show="isAdding" style="display: flex; flex-direction: column;">
      <p>Player name</p>
      <input type="text" v-model="newPlayerName" style="width: 120px;"/>
      
      <input type="submit" value="Add player" :class="{'button-disabled': !isValidName}" style="margin-top: 12px;">
      <button @click="cancelAdd" style="margin-top: 8px;">Cancel</button>
    </form>

    <div v-show="hasAdded" style="margin-top: 8px;">
      <!-- <p style="color: green" v-show="addSuccessful">{{successMessage}}</p> -->
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
      if (!this.isValidName) { return }

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
    },

    cancelAdd () {
      this.newPlayerName = ''
      this.isAdding = false
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
