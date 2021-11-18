import { createStore, createLogger } from 'vuex'
import calculator from './modules/calculator'
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    calculator
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
