import { API } from '@/constants/api'
import { getMethod, jsonHeader } from '@/utils/fetchTool'

const state = {
  userByEmail: null
}

const getters = {
  userByEmail (state) {
    return state.userByEmail
  }
}

const mutations = {
  GET_USER_BY_EMAIL (state, userByEmail) {
    state.userByEmail = userByEmail
  }
}

const actions = {
  getUserByEmail ({ commit }, data) {
    window.fetch(`${API.GET_USER_BY_EMAIL}/${data.email}`, {
      headers: jsonHeader.headers,
      method: getMethod.method
    }).then((response) => response.json())
      .then((res) => {
        commit('GET_USER_BY_EMAIL', res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
