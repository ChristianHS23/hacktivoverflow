import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSwal from 'vue-swal'

Vue.use(Vuex)
Vue.use(VueSwal)
Vue.use(VueAxios, axios)

let server = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    check: {
      isLogin: false,
      isNotLogin: true
    },
    questions: [],
    question: {}
  },
  mutations: {
    mcheckLogin (state) {
       if (localStorage.getItem('token')) {
        state.check.isLogin = true
        state.check.isNotLogin = false
      } else {
        state.check.isLogin = false
        state.check.isNotLogin = true
      }
    },
    mgetquestion (state, data) {
      state.questions = data
    },
    mgetsinglequestion(state, data) {
      state.question = data
    }
  },
  actions: {
    checkLogin({commit}) {
      commit('mcheckLogin')
    },

    getQuestion({commit}) {
      axios({
        method: 'get',
        url: `${server}/question/`
      })
      .then(({data}) => {
        commit('mgetquestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    getSingleQuestion({commit}, questionId) {
      axios({
        method: 'get',
        url: `${server}/question/${questionId}`
      })
      .then(({data}) => {
        if(!data.voters.length) {
          data.voters = data.voters.length
        } else{
          let upvote = data.voters.filter(e => e.status === "upvote").length
          let downvote = data.voters.filter(e => e.status === "downvote").length
          data.voters = upvote - downvote
        }
        if(data.answers.length) {
          data.answers.voters = data.answers.map(e => {
            if(!e.voters.length) {
              return e.voters = e.voters.length
            } else {
              let upvote = e.voters.filter(v => v.status === 'upvote').length
              let downvote = e.voters.filter(v => v.status === 'downvote').length
              return e.voters = upvote - downvote
            }
          })
        }
        commit('mgetsinglequestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    loginUser ({ commit }, objUser) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${server}/users/login`,
          data: objUser
        })
          .then(({ data }) => {
            swal('Success Login', '', 'success')
            console.log(data.token)
            localStorage.setItem('token', data.token)
            commit('mcheckLogin')
            resolve()
          })
          .catch((error) => {
            if (error.response.data.msg.message) {
              swal(`Seems your input wrong`, '', 'error')
            } else {
              swal(`${error.response.data.msg}`, '', 'error')
            }
            reject(error)
          })
      })
    },

    registerUser ({ commit }, objUser) {
      return new Promise((resolve, reject) => {
        Vue.axios({
          method: 'post',
          url: `${server}/users/register`,
          data: objUser
        })
          .then(({ data }) => {
            swal(`Success register, welcome ${data.username}`, '', 'success')
            resolve()
          })
          .catch((error) => {
            if (error.response.data.msg.message) {
              swal(`Seems your input wrong`, '', 'error')
            } else {
              swal(`${error.response.data.msg}`, '', 'error')
            }
            reject(error)
          })
      })
    }
  }
})
