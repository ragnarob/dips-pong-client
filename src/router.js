import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Player from './views/Player.vue'
import Rules from './views/Rules.vue'
import DisplayView from './views/DisplayView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/player/:name',
      name: 'player',
      component: Player
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/display',
      name: 'DisplayView',
      component: DisplayView
    },
  ]
})
