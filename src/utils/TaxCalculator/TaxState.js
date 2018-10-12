/**
 * Created by duy on 2018/10/12 10:54.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    income: 0,
    deduction: 0,
    currentStep: 'taxCalculatorStep1'
  },
  mutations: {
    toggleStep (state) {
      state.currentStep = state.currentStep === 'taxCalculatorStep1'
        ? 'taxCalculatorStep2'
        : 'taxCalculatorStep1'
    },
    setData (state, {name, value}) {
      state[name] = value
    }
  }
})
