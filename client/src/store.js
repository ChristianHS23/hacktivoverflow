import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSwal from 'vue-swal'
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {}); // config is optional. more below
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
    },
    mpushquestion(state, data) {
      state.questions.push(data)
    }
  },
  actions: {
    checkLogin({commit}) {
      commit('mcheckLogin')
    },

    createQuestion({commit}, objCreate) {
      let token = localStorage.getItem('token')
      axios.post(`${server}/question`, objCreate, {headers : {
        'Content-Type': 'application/json',
        token
      }})
      .then((result) =>{
        commit('mpushquestion', result)
      })
      .catch((err)=> {
        console.log(err)
      })
    },

    createAnswer({commit}, objCreate) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios.post(`${server}/answer/${objCreate.questionId}`, objCreate.answer, {headers : {
          'Content-Type': 'application/json',
          token
        }})
        .then((result) => {
          console.log(result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    getQuestion({commit}) {
      axios({
        method: 'get',
        url: `${server}/question/`
      })
      .then(({data}) => {
        data.description = data.map(e => e.description = e.description.slice(0, 200))
        commit('mgetquestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    upvoteQuestion({commit}, questionId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject)=> {
        axios({
          method: 'put',
          url: `${server}/question/vote/${questionId}`,
          data: {status: 'upvote'},
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

    downvoteQuestion({commit}, questionId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject)=> {
        axios({
          method: 'put',
          url: `${server}/question/vote/${questionId}`,
          data: {status: 'downvote'},
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

    upvoteAnswer({commit}, answerId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject)=> {
        axios({
          method: 'put',
          url: `${server}/answer/vote/${answerId}`,
          data: {status: 'upvote'},
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

    downvoteAnswer({commit}, answerId) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject)=> {
        axios({
          method: 'put',
          url: `${server}/answer/vote/${answerId}`,
          data: {status: 'downvote'},
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
