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
        <input type="text" v-model="newOfficeName" style="grid-row: 1; grid-column: 2; width: 140px;"/>

        <label style="grid-row: 2; grid-column: 1;">League password</label>
        <input type="text" v-model="newOfficePassword" style="grid-row: 2; grid-column: 2; width: 140px;"/>

        <label style="grid-row: 3; grid-column: 1;">Password hint</label>
        <textarea v-model="newOfficePasswordHint" placeholder="Something everyone in the league will understand" style="grid-row: 3; grid-column: 2; width: 140px; font-family: Helvetica;" rows="3"/>

        <!-- <label style="grid-row: 2; grid-column: 1;">Slack bot URL</label>
        <input type="text" v-model="newOfficeSlackBotUrl" style="grid-row: 2; grid-column: 2; width: 300px;"/> -->
      </div>

      <div class="row-flex" style="margin-top: 8px;">
        <button @click="saveAddOffice" :class="{'button-disabled': !isValidOffice, 'normal-button': true, 'buttonWithIconFirst': true}">
          <CheckIcon/> Add league
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
        <input type="text" v-model="manageOfficeName" style="grid-row: 1; grid-column: 2; width: 140px;"/>

        <label style="grid-row: 2; grid-column: 1;">Current password</label>
        <input type="text" v-model="manageOfficeCurrentPassword" style="grid-row: 2; grid-column: 2; width: 140px;"/>

        <label style="grid-row: 3; grid-column: 1;">New password</label>
        <input type="text" v-model="manageOfficePassword" placeholder="Blank for no change" style="grid-row: 3; grid-column: 2; width: 140px;"/>

        <label style="grid-row: 4; grid-column: 1;">Password hint</label>
        <textarea v-model="manageOfficePasswordHint" placeholder="Something everyone in your office will understand" style="grid-row: 4; grid-column: 2; width: 140px; font-family: Helvetica;" rows="3"/>

        <!-- <label style="grid-row: 2; grid-column: 1;">Slack bot URL</label>
        <input type="text" v-model="manageOfficeSlackBotUrl" style="grid-row: 2; grid-column: 2; width: 300px;"/> -->
      </div>

      <div class="row-flex" style="margin-top: 8px;">
        <button @click="saveManageOffice" :class="{'button-disabled': !isValidOffice, 'normal-button': true, 'buttonWithIconFirst': true}">
          <CheckIcon/> Save
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
import CheckIcon from 'vue-material-design-icons/CheckBold.vue'

export default {
  name: 'OfficeSelector',

  components: {
    SettingsIcon,
    PlusIcon,
    CrossIcon,
    CheckIcon,
  },

  data: function () {
    return {
      selectedOffice: undefined,
      isManagingOffice: false,
      isAddingOffice: false,
      newOfficeName: '',
      newOfficeSlackBotUrl: '',
      newOfficePassword: '',
      newOfficePasswordHint: '',
      manageOfficeName: '',
      manageOfficeId: undefined,
      manageOfficeCurrentPassword: '',
      manageOfficePassword: '',
      manageOfficePasswordHint: '',
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
      if (!this.isValidOffice) { return }

      let response = await miscApi.addOffice(this.newOfficeName, this.newOfficePassword, this.newOfficePasswordHint, this.newOfficeSlackBotUrl)
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
      this.newOfficePassword = ''
      this.newOfficePasswordHint = ''
      this.newOfficeSlackBotUrl = ''
      if (resetToPreviousOffice && this.previousOfficeCopy) {
        this.$store.dispatch('setSelectedOffice', this.previousOfficeCopy)
        this.selectedOffice = this.previousOfficeCopy
      }
    },

    manageOffice () {
      if (this.$store.getters.isLoggedIn) {
        this.isManagingOffice = true
        this.manageOfficeName = this.$store.getters.selectedOffice.name
        this.manageOfficeId = this.$store.getters.selectedOffice.id
        this.manageOfficePasswordHint = this.$store.getters.selectedOffice.passwordHint
        this.manageOfficeSlackBotUrl = this.$store.getters.selectedOffice.slackBotUrl || ''
        this.previousOfficeCopy = this.$store.getters.selectedOffice
        this.$store.dispatch('setSelectedOffice', undefined)
      }
      else {
        this.$store.dispatch('showLoginModal')
      }
    },

    async saveManageOffice () {
      if (!this.isValidOffice) { return }

      let response = await miscApi.updateOffice(this.manageOfficeId, this.manageOfficeName, this.manageOfficeCurrentPassword, this.manageOfficePassword, this.manageOfficePasswordHint, this.manageOfficeSlackBotUrl)
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
      this.manageOfficeCurrentPassword = ''
      this.manageOfficePassword = ''
      this.manageOfficePasswordHint = ''
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
    isValidOffice () {
      return isValidNewOffice(this.newOfficeName, this.newOfficePassword, this.newOfficePasswordHint)
        || isValidManageOffice(this.manageOfficeName, this.manageOfficeCurrentPassword, this.manageOfficePassword, this.manageOfficePasswordHint)
      
      function isValidManageOffice (officeName, currentPassword, newPassword, passwordHint) {
        return officeName.length > 0 &&
               currentPassword && currentPassword.length > 3 &&
               (!newPassword || newPassword && newPassword.length > 3) &&
               passwordHint && passwordHint.length > 3
      }

      function isValidNewOffice (newOfficeName, newOfficePassword, newOfficePasswordHint) {
        return newOfficeName && newOfficeName.length > 0 && 
               newOfficePassword && newOfficePassword.length > 3 &&
               newOfficePasswordHint && newOfficePasswordHint.length > 3
      }
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