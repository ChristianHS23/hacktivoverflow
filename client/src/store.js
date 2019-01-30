import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSwal from 'vue-swal'
import wysiwyg from 'vue-wysiwyg'
import swal from 'sweetalert';
import router from './router'

Vue.use(wysiwyg, {}) // config is optional. more below
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
    question: {},
    answer: {}
  },
  mutations: {
    mchecklogin (state) {
      if (localStorage.getItem('token')) {
        state.check.isLogin = true
        state.check.isNotLogin = false
      } else {
        state.check.isLogin = false
        state.check.isNotLogin = true
      }
    },
    mgetsingleanswer(state, data) {
      state.answer = data
    },
    mgetquestion (state, data) {
      state.questions = data
    },
    mgetsinglequestion (state, data) {
      state.question = data
    },
    mpushquestion (state, data) {
      state.questions.push(data)
    }
  },
  actions: {
    checkLogin ({ commit }) {
      commit('mchecklogin')
    },

    createQuestion ({ commit }, objCreate) {
      let token = localStorage.getItem('token')
      axios.post(`${server}/question`, objCreate, { headers: {
        'Content-Type': 'application/json',
        token
      } })
        .then((result) => {
          commit('mpushquestion', result)
          swal('Success Create Question','','success')
          router.push('/')
        })
        .catch((err) => {
          if(err.response.status == 400){
            swal('Input Seems Wrong', '','error')
          } else if(err.response.status == 401) {
            swal('You Need To Login Before Create Question', '','error')
          } else {
            swal('Seems Something Going Wrong','','error')
          }
        })
    },

    createAnswer ({ commit }, objCreate) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.post(`${server}/answer/${objCreate.questionId}`, objCreate.answer, { headers: {
          'Content-Type': 'application/json',
          token
        } })
          .then((result) => {
            console.log(result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getSingleAnswer({commit}, answerId) {
      let token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${server}/answer/${answerId}`,
        headers: {
          'Content-Type': 'application/json',
          token
        }
      })
      .then(({data}) => {
        commit('mgetsingleanswer', data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    updateAnswer({commit}, objUpdate) {
      let token = localStorage.getItem('token')
      console.log(objUpdate)
      axios({
        method: 'put',
        url: `${server}/answer/${objUpdate.answerId}`,
        data: objUpdate.answer,
        headers: {
          'Content-Type': 'application/json',
          token
        }
      })
      .then(() => {
        swal('Success Update Answer','','success')
        this.dispatch('getSingleQuestion', objUpdate.questionId)
        router.push(`/question/${objUpdate.questionId}`)
      })
      .catch(err => {
        if(err.response.status == 401) {
          swal('You Need To Login', '', 'error')
          router.push(`/question/${objUpdate.questionId}`)
        } else if(err.response.status == 500) {
          swal('You Didn\'t Have Access To Update This Answer', '', 'error')
          router.push(`/question/${objUpdate.questionId}`)
        } else {
          console.log(err.response)
        }
      })
    },

    getQuestion ({ commit }) {
      axios({
        method: 'get',
        url: `${server}/question/`
      })
        .then(({ data }) => {
          data.description = data.map(e => e.description = e.description.slice(0, 200))
          data.created_at = data.map(e => {
            let date = new Date(e.created_at).toString()
            e.created_at = date
            return e.created_at
          })
          commit('mgetquestion', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateQuestion({commit}, objUpdate) {
      let token = localStorage.getItem('token')

      axios({
        method: 'put',
        url: `${server}/question/${objUpdate.questionId}`,
        data: objUpdate.question,
        headers: {
          'Content-Type': 'application/json',
          token
        }
      })
      .then(() => {
        swal('Success Update Question','','success')
        router.push(`/question/${objUpdate.questionId}`)
      })
      .catch(err => {
        if(err.response.status == 401) {
          swal('You Need To Login', '', 'error')
          router.push(`/question/${objUpdate.questionId}`)
        } else if(err.response.status == 500) {
          swal('You Didn\'t Have Access To Update This Question', '', 'error')
          router.push(`/question/${objUpdate.questionId}`)
        } else {
          console.log(err.response)
        }
      })
    },

    deleteQuestion({commit}, questionId) {
      let token = localStorage.getItem('token')
      axios({
        method: 'delete',
        url: `${server}/question/${questionId}`,
        headers: {
          'Content-Type': 'application/json',
          token
        }
      })
      .then(() => {
        swal('Success Delete Question','','success')
        router.push('/')
      })
      .catch(err => {
        if(err.response.status == 401) {
          swal('You Need To Login', '', 'error')
        } else if(err.response.status == 500) {
          swal('You Didn\'t Have Access To Delete This Question', '', 'error')
        } else {
          console.log(err.response)
        }
      })
    },

    upvoteQuestion ({ commit }, questionId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${server}/question/vote/${questionId}`,
          data: { status: 'upvote' },
          headers: {
            'Content-Type': 'application/json',
            token
          }
        })
          .then(() => {
            console.log('Success Upvote Question')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    downvoteQuestion ({ commit }, questionId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${server}/question/vote/${questionId}`,
          data: { status: 'downvote' },
          headers: {
            'Content-Type': 'application/json',
            token
          }
        })
          .then(() => {
            console.log('Success Downvote Question')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    upvoteAnswer ({ commit }, answerId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${server}/answer/vote/${answerId}`,
          data: { status: 'upvote' },
          headers: {
            'Content-Type': 'application/json',
            token
          }
        })
          .then(() => {
            console.log('Success Upvote Answer')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    downvoteAnswer ({ commit }, answerId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${server}/answer/vote/${answerId}`,
          data: { status: 'downvote' },
          headers: {
            'Content-Type': 'application/json',
            token
          }
        })
          .then(() => {
            console.log('Success Downvote Answer')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    getSingleQuestion ({ commit }, questionId) {
      console.log('masuk')
      axios({
        method: 'get',
        url: `${server}/question/${questionId}`
      })
        .then(({ data }) => {
          if (!data.voters.length) {
            data.voters = data.voters.length
          } else {
            let upvote = data.voters.filter(e => e.status === 'upvote').length
            let downvote = data.voters.filter(e => e.status === 'downvote').length
            data.voters = upvote - downvote
          }
          if (data.answers.length) {
            data.answers.voters = data.answers.map(e => {
              if (!e.voters.length) {
                e.voters = e.voters.length
                return e.voters
              } else {
                let upvote = e.voters.filter(v => v.status === 'upvote').length
                let downvote = e.voters.filter(v => v.status === 'downvote').length
                e.voters = upvote - downvote
                return e.voters
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
            commit('mchecklogin')
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
