import { API } from '@/constants/api'
import { getMethod, jsonHeader } from '@/utils/fetchTool'

const state = {
  badWords: []
}

const getters = {
  badWords (state) {
    return state.badWords
  }
}

const mutations = {
  GET_BADWORDS (state, badWords) {
    state.badWords = badWords
  }
}

const actions = {
  getBadWords ({ commit }, data) {
    fetch(`${API.GET_BADWORDS}/${data.email}`, {
      headers: jsonHeader.headers,
      method: getMethod.method
    }).then((response) => response.json())
      .then((res) => {
        commit('GET_BADWORDS', res.data.badWords)
        console.log(res)
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
