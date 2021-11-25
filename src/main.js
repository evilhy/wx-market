import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'default-passive-events'
import { createApp } from 'vue'
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
  Area,
  ImagePreview
} from 'vant'
import plugin from 'utils/plugin'
import App from './App.vue'
import router from './router'
import store from './store'
import 'components/svgIcon'

import 'vue3-carousel/dist/carousel.css'
import 'assets/scss/common.scss'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(NoticeBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Image)
  .use(Popup)
  .use(Icon)
  .use(AddressList)
  .use(AddressEdit)
  .use(ActionSheet)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Switch)
  .use(Button)
  .use(PasswordInput)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(SwipeCell)
  .use(NumberKeyboard)
  .use(NavBar)
  .use(Radio)
  .use(RadioGroup)
  .use(Sticky)
  .use(Calendar)
  .use(Step)
  .use(Steps)
  .use(Form)
  .use(Circle)
  .use(Progress)
  .use(Dialog)
  .use(Tag)
  .use(Uploader)
  .use(Area)
  .use(Lazyload, {
    preLoad: 1.3,
    attempt: 1
  })
  .use(ImagePreview)
  .use(plugin)
  .mount('#app')
