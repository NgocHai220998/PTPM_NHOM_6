import { API } from '@/constants/api'
import { getMethod, jsonHeader } from '@/utils/fetchTool'

const state = {
  words: []
}

const getters = {
  words (state) {
    return state.words
  }
}

const mutations = {
  GET_WORDS (state, words) {
    state.words = words
  }
}

const actions = {
  getWords ({ commit }, data) {
    window.fetch(`${API.GET_WORDS}/${data.email}`, {
      headers: jsonHeader.headers,
      method: getMethod.method
    }).then((response) => response.json())
      .then((res) => {
        commit('GET_WORDS', res.data.words)
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
