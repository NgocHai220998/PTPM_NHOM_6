
import io from 'socket.io-client'

const state = {
  socket: io.connect('http://localhost:3000')
}

const getters = {
  socket (state) {
    return state.socket
  }
}

const actions = {
  setSocket ({ commit }, payload) {
    commit('SET_SOCKET', payload)
  }
}

const mutations = {
  SET_SOCKET (state, payload) {
    state.socket = io.connect(payload)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
