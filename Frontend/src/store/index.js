import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './modules/i18n'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    i18n
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
