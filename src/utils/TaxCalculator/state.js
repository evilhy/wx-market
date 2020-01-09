import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    income: '',
    deduction: '',
    specialDeduction: '',
    specialDeductionDetail: {
      child: { // 子女教育
        option: -1,
        value: 0
      },
      learn: { // 继续教育
        option: -1,
        value: 0
      },
      houseLoan: { // 首套房贷利息
        option: -1,
        value: 0
      },
      rent: { // 住房租金
        option: -1,
        value: 0
      },
      parent: { // 赡养老人
        option: -1,
        value: 0
      },
      illness: { // 大病医保
        option: -1,
        value: 0
      }
    },
    currentStep: 'taxCalculatorStep1'
  },
  getters: {
    deductionDetailTotal ({ specialDeductionDetail }) { 
      let sum = 0
      for (let item of Object.values(specialDeductionDetail)) {
        if (item.option !== -1) {
          sum += Number(item.value)
        }
      }
      return sum
    }
  },
  mutations: {
    changeStep (state, stepName = 'taxCalculatorStep1') {
      state.currentStep = stepName
    },
    updateData (state, { type, value = '' }) {
      state[type] = value
    },
    setDeduction (state, { type, option, value }) {
      state.specialDeductionDetail[type] = {
        option,
        value
      }
    },
    clearDeductionDetail ({ specialDeductionDetail }, type = '') {
      let emptyItem = {
        option: -1,
        value: ''
      }
      if (type) {
        specialDeductionDetail[type] = emptyItem
      } else {
        for (let key of Object.keys(specialDeductionDetail)) {
          specialDeductionDetail[key] = emptyItem
        }
      }
    }
  }
})