<template>
  <div>
    <div>
      <button v-show="!$store.state.isAddingPlayer"
              @click="startAddingPlayer()"
              style="width: 100%; margin-top: 16px;"
              class="buttonWithIconFirst">
        <AddUserIcon/> Add new player
      </button>
      <form v-on:submit.prevent="addPlayer" v-show="$store.state.isAddingPlayer" style="display: flex; flex-direction: column;">
        <p><b>Add player</b></p>

        <p>Player name</p>

        <input type="text" v-model="newPlayerName" style="width: 128px;"/>
        
        <button type="submit" :class="{'button-disabled': !isValidName, 'normal-button': true, 'buttonWithIconFirst': true}" style="margin-top: 8px;">
          <CheckIcon/> Add player
        </button>

        <button @click="cancelAdd" style="margin-top: 8px;" class="normal-button buttonWithIconFirst">
          <CrossIcon/> Cancel
        </button>
      </form>

      <div v-show="hasAdded" style="margin-top: 8px;">
        <p style="color: red" v-show="!addSuccessful">Failed: {{errorMessage}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import playerApi from '@/api/playerApi'

import AddUserIcon from 'vue-material-design-icons/AccountPlus.vue'
import CrossIcon from 'vue-material-design-icons/Close.vue'
import CheckIcon from 'vue-material-design-icons/CheckBold.vue'

export default {
  name: 'AddPlayer',

  components: {
    AddUserIcon,
    CrossIcon,
    CheckIcon,
  },

  data: function () {
    return {
      newPlayerName: '',
      addSuccessful: false,
      hasAdded: false,
      successMessage: '',
      errorMessage: '',
    }
  },

  methods: {
    startAddingPlayer () {
      if (this.$store.getters.isLoggedIn) {
        this.$store.state.isAddingPlayer = true
      }
      else {
        this.$store.dispatch('showLoginModal')
      }
    },

    async addPlayer () {
      if (!this.isValidName) { return }

      let response = await playerApi.addPlayer(this.newPlayerName, this.$store.getters.selectedOffice.id)
      this.hasAdded = true

      if (!response.error) {
        this.addSuccessful = true
        this.$store.dispatch('getPlayerList')

        this.successMessage = 'Success adding ' + this.newPlayerName

        this.newPlayerName = ''
        this.$store.state.isAddingPlayer = false
      }
      else {
        this.addSuccessful = false
        this.errorMessage = response.error
      }
    },

    cancelAdd () {
      this.newPlayerName = ''
      this.$store.state.isAddingPlayer = false
    }
  },

  computed: {
    isValidName () {
      return this.newPlayerName.length > 1 
        && this.newPlayerName.length < 25
        && /^[\wÆØÅæøå\s]+$/i.test(this.newPlayerName)
    }
  }
}
</script>
