import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ask',
      name: 'ask',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Ask.vue')
    },
    {
      path: '/question/:id',
      name: 'question',

      component: () => import('./views/Question.vue')
    },
    {
      path: '/edit/question/:id',
      name: 'edit-question',

      component: () => import('./views/EditQuestion.vue')
    },
    {
      path: '/edit/answer/:id',
      name: 'edit-answer',

      component: () => import('./views/EditAnswer.vue')
    }
  ]
})
