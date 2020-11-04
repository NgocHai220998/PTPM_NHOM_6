import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './modules/i18n'
import example from './modules/example'
import badWord from './modules/badWord'
import word from './modules/word'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    i18n,
    example,
    badWord,
    word,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
