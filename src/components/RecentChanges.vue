<template>
  <div class="recent-changes col-flex" v-if="recentChanges.length" style="font-size: 12px;">
    <p @click="isOpen = !isOpen" class="cursor-pointer link-color" style="text-align:center;">
      {{isOpen ? 'Hide' : 'Show'}} recent changes
    </p>
    <span v-if="isOpen" style="margin-top: 2px; text-align: justify; margin-bottom: -8px;">
      <p v-for="change in recentChanges" :key="change.change" class="smaller-text" style="margin-bottom: 8px;">
        - {{change.change}}
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'RecentChanges',

  data: function () {
    return {
      isOpen: false,
      recentChanges: [],
    }
  },

  created () {
    let settings = require('../config.json')
    let nowTime = new Date().getTime()
    this.recentChanges = settings.recentChanges.filter(c => nowTime - new Date(c.date).getTime() < 86400*1000*5)
  }
}
</script>

<style lang="scss">
.recent-changes {
  // border: 1px solid #ccc;
  width: fit-content;
  margin: 10px auto -6px auto;
  padding: 0 10px;
}
.smaller-text {
  font-size: 12px;
}
</style>