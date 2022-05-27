import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
import { Dialog, Button, Cell, CellGroup } from 'vant'
import plugin from 'utils/plugin'
import App from './App.vue'
import router from './router'
import store from './store'
import 'components/svgIcon'

import 'assets/scss/common.scss'

const app = createApp(App)

app.use(store).use(router).use(Dialog).use(Cell).use(CellGroup).use(Button).use(plugin).mount('#app')
