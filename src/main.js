import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import myPlugin from './utils/plugin'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/fonts/iconfont.css'
import './assets/scss/common.scss'
import 'lib-flexible'
// 项目的import
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VeHistogram from 'v-charts/lib/histogram'
// import VeLine from 'v-charts/lib/line'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(myPlugin)
Vue.use(VueClipboard)
Vue.use(VueAwesomeSwiper)
Vue.component(VeHistogram.name, VeHistogram)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
