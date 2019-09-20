<template>
  <div> 
    <div v-if="!isAddingOffice && !isManagingOffice"
         style="display: flex; flex-direction: row; justify-content: center; align-items: center;" 
         :class="{'margin-top-4': $store.getters.selectedOffice, 'margin-top-20': !$store.getters.selectedOffice}">
      <!-- SELECTOR -->
      <p v-if="!$store.getters.selectedOffice" style="margin-right: 4px;">
        Select league: 
      </p>
      <select v-model="selectedOffice" style="padding: 4px;">
        <option v-for="office in $store.getters.offices" :key="office.id" :value="office">
          {{office.name}}
        </option>
      </select>

      <!-- MANAGE OFFICE BUTTON -->
      <button @click="manageOffice()" 
              v-if="$store.getters.selectedOffice"
              style="margin-left: 6px; height: fit-content; width: fit-content;"
              class="small-button smallButtonWithIconFirst">
        <SettingsIcon/> Manage
      </button>

      <!-- NEW OFFICE BUTTON -->
      <button @click="addOffice()"
              style="margin-left: 28px; height: fit-content; width: fit-content;"
              class="small-button smallButtonWithIconFirst">
        <PlusIcon/> New league
      </button>
    </div>

    <!-- ADDING NEW OFFICE -->
    <div v-if="isAddingOffice" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 20px;">
      <p><b>New league</b></p>
      <div id="addOfficeGrid">
        <label style="grid-row: 1; grid-column: 1;">League name</label>
        <input type="text" v-model="newOfficeName" style="grid-row: 1; grid-column: 2; width: 100px;"/>

        <!-- <label style="grid-row: 2; grid-column: 1;">Slack bot URL</label>
        <input type="text" v-model="newOfficeSlackBotUrl" style="grid-row: 2; grid-column: 2; width: 300px;"/> -->
      </div>

      <div class="row-flex" style="margin-top: 8px;">
        <button @click="saveAddOffice" :class="{'button-disabled': !isValidName, 'normal-button': true}">
          Add league
        </button>

        <button @click="cancelAddOffice" class="normal-button buttonWithIconFirst" style="margin-left: 10px;">
          <CrossIcon/> Cancel
        </button>
      </div>
    </div>

    <!-- MANAGING OFFICE -->
    <div v-if="isManagingOffice" style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 4px;">
      <p><b>Manage league</b></p>
      <div id="addOfficeGrid">
        <label style="grid-row: 1; grid-column: 1;">League name</label>
        <input type="text" v-model="manageOfficeName" style="grid-row: 1; grid-column: 2; width: 100px;"/>

        <!-- <label style="grid-row: 2; grid-column: 1;">Slack bot URL</label>
        <input type="text" v-model="manageOfficeSlackBotUrl" style="grid-row: 2; grid-column: 2; width: 300px;"/> -->
      </div>

      <div class="row-flex" style="margin-top: 8px;">
        <button @click="saveManageOffice" :class="{'button-disabled': !isValidName, 'normal-button': true}">
          Save
        </button>

        <button @click="cancelManageOffice"
                class="normal-button buttonWithIconFirst"
                style="margin-left: 10px;">
          <CrossIcon/> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import miscApi from '@/api/miscApi'

import SettingsIcon from 'vue-material-design-icons/Settings.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import CrossIcon from 'vue-material-design-icons/Close.vue'

export default {
  name: 'OfficeSelector',

  components: {
    SettingsIcon,
    PlusIcon,
    CrossIcon,
  },

  data: function () {
    return {
      selectedOffice: undefined,
      isManagingOffice: false,
      isAddingOffice: false,
      newOfficeName: '',
      newOfficeSlackBotUrl: '',
      manageOfficeName: '',
      manageOfficeId: undefined,
      manageOfficeSlackBotUrl: '',
      previousOfficeCopy: undefined,
    }
  },

  methods: {
    addOffice () {
      this.isAddingOffice = true
      this.selectedOffice = undefined
      this.previousOfficeCopy = this.$store.getters.selectedOffice
      this.$store.dispatch('setSelectedOffice', undefined)
    },

    async saveAddOffice () {
      if (!this.isValidName) { return }

      let response = await miscApi.addOffice(this.newOfficeName, this.newOfficeSlackBotUrl)
      if (!response.error) {
        this.$store.dispatch('setSelectedOffice', response)
        await this.$store.dispatch('getOffices')
        this.selectedOffice = response
        this.cancelAddOffice(false)
      }
    },

    cancelAddOffice (resetToPreviousOffice=true) {
      this.isAddingOffice = false
      this.newOfficeName = ''
      this.newOfficeSlackBotUrl = ''
      if (resetToPreviousOffice && this.previousOfficeCopy) {
        this.$store.dispatch('setSelectedOffice', this.previousOfficeCopy)
        this.selectedOffice = this.previousOfficeCopy
      }
    },

    manageOffice () {
      this.isManagingOffice = true
      this.manageOfficeName = this.$store.getters.selectedOffice.name
      this.manageOfficeId = this.$store.getters.selectedOffice.id
      this.manageOfficeSlackBotUrl = this.$store.getters.selectedOffice.slackBotUrl || ''
      this.previousOfficeCopy = this.$store.getters.selectedOffice
      this.$store.dispatch('setSelectedOffice', undefined)
    },

    async saveManageOffice () {
      if (!this.isValidName) { return }

      let response = await miscApi.updateOffice(this.manageOfficeId, this.manageOfficeName, this.manageOfficeSlackBotUrl)
      if (!response.error) {
        this.$store.dispatch('setSelectedOffice', response)
        await this.$store.dispatch('getOffices')
        this.selectedOffice = response
        this.cancelManageOffice(false)
      }
    },

    cancelManageOffice (resetToPreviousOffice=true) {
      this.isManagingOffice = false
      this.manageOfficeName = ''
      this.manageOfficeId = undefined
      this.manageOfficeSlackBotUrl = ''
      if (resetToPreviousOffice) {
        this.$store.dispatch('setSelectedOffice', this.previousOfficeCopy)
        this.selectedOffice = this.previousOfficeCopy
      }
    }
  },

  watch: {
    selectedOffice (office) {
      this.$store.dispatch('setSelectedOffice', office)
      if (office) {
        window.localStorage.setItem('selectedOffice', JSON.stringify(office))
      }
      else {
        window.localStorage.removeItem('selectedOffice')
      }
    }
  },

  computed: {
    isValidName () {
      return this.newOfficeName.length > 3 || this.manageOfficeName.length > 3
    }
  },

  mounted () {
    if (this.$store.getters.selectedOffice) {
      this.selectedOffice = this.$store.getters.selectedOffice
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-top-4 {
  margin-top: 4px;
}
.margin-top-20 {
  margin-top: 20px;
}
#addOfficeGrid {
  margin-top: 4px;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  grid-row-gap: 4px;
  grid-column-gap: 4px;
  align-items: center;
}
</style>