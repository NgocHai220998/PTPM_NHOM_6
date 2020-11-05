import Vue from 'vue'
import VueI18n from 'vue-i18n'

import vi from './vi.json'

Vue.use(VueI18n)

const locale = 'vi'
const messages = {
  vi
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
