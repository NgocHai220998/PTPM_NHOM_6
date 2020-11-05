// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import VueQriously from 'vue-qriously'
import i18n from './constants/lang/index'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
var VueScrollTo = require('vue-scrollto')

Vue.use(Antd)
Vue.use(VueQriously)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
