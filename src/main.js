import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
import {
  Dialog,
  Lazyload,
  ImagePreview
} from 'vant'
import plugin from 'utils/plugin'
import App from './App.vue'
import router from './router'
import store from './store'
import 'components/svgIcon'

import 'assets/scss/common.scss'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(Dialog)
  .use(Lazyload, {
    preLoad: 1.3,
    attempt: 1
  })
  .use(ImagePreview)
  .use(plugin)
  .mount('#app')
