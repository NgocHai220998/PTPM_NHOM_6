import app from '../../main.js'

const state = {
  lang: 'vi'
}

const getters = {
  lang (state) {
    return state.lang
  }
}

const actions = {
  async setLang ({ commit }, payload) {
    if (payload in app.$i18n.messages) {
      commit('SET_LANG', payload)
    } else {
      try {
        const res = await import(`../../constants/lang/${payload}.json`)
        app.$i18n.setLocaleMessage(payload, res)
        commit('SET_LANG', payload)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

const mutations = {
  SET_LANG (state, payload) {
    state.lang = payload
    app.$i18n.locale = payload
    window.localStorage.setItem('lang', payload)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
