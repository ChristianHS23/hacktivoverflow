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
    }
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
    }
  },
  actions: {
    checkLogin({commit}) {
      commit('mcheckLogin')
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
