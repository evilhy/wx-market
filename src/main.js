import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import {
  Lazyload,
  DropdownMenu,
  DropdownItem,
  NoticeBar,
  Swipe,
  SwipeItem,
  Image,
  Popup,
  Icon,
  AddressList,
  AddressEdit,
  ActionSheet,
  Cell,
  CellGroup,
  Field,
  Switch,
  Button,
  PasswordInput,
  List,
  Tab,
  Tabs,
  PullRefresh,
  SwipeCell,
  NumberKeyboard,
  NavBar,
  RadioGroup,
  Radio,
  Sticky,
  Calendar,
  Step,
  Steps,
  Form,
  Circle,
  Progress,
  Dialog,
  Tag,
  Uploader,
  Area
} from 'vant'
import VueClipboard from 'vue-clipboard2'
import vueEsign from 'vue-esign'
import App from './App'
import router from './router'
import store from './store'
import myPlugin from './utils/plugin'

import './assets/fonts/iconfont.css'
import './assets/scss/common.scss'
// 项目的import

// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
// vant
Vue.use(Lazyload, {
  preLoad: 1.3,
  attempt: 1
})
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(NoticeBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Image)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(ActionSheet)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Switch)
Vue.use(Button)
Vue.use(PasswordInput)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(NumberKeyboard)
Vue.use(NavBar)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Sticky)
Vue.use(Calendar)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Form)
Vue.use(Circle)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(vueEsign)
Vue.use(Tag)
Vue.use(Uploader)
Vue.use(Area)

Vue.use(myPlugin)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
