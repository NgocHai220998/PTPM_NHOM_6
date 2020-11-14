import { API } from '@/constants/api'
import { getMethod, jsonHeader } from '@/utils/fetchTool'

const state = {
  examples: []
}

const getters = {
  examples (state) {
    return state.examples
  }
}

const mutations = {
  GET_EXAMPLES (state, examples) {
    state.examples = examples
  }
}

const actions = {
  getExamples ({ commit }, data) {
    fetch(`${API.GET_EXAMPLES}/${data.email}`, {
      headers: jsonHeader.headers,
      method: getMethod.method
    }).then((response) => response.json())
      .then((res) => {
        commit('GET_EXAMPLES', res.data.examples)
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
