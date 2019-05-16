import 'babel-polyfill'
import Vue from 'vue'
import Vant from 'vant'
import App from './App'
import router from './router'
import myPlugin from './utils/plugin'
import 'vant/lib/index.css'

import './assets/fonts/iconfont.css'
import './assets/scss/common.scss'
import 'lib-flexible'
// 项目的import

import 'swiper/dist/css/swiper.css'
// import VeHistogram from 'v-charts/lib/histogram'
// import VeLine from 'v-charts/lib/line'
import VueClipboard from 'vue-clipboard2'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(myPlugin)
Vue.use(VueClipboard)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
}) 