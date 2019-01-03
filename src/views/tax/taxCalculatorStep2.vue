<template>
  <div class="tax-calculator-step2">
    <div class="white-box total-wrap">
      <div class="label">专项扣除(元)</div>
      <div class="value">{{deductionDetailTotal | money}}</div>
      <!-- <div class="finance-btn" @click="openSubmitPopup">提交给财务</div> -->
    </div>
    <div class="tip">请选择符合标准的扣除专项</div>
    <div class="deduction-list">
      <div class="deduction-item" v-for="(item, index) in list" :key="index" :class="{'open': item.open}">
        <div class="parent-item" @click="toggleDeduction(item)">
          <div class="v-checkbox" :class="{'checked':specialDeductionDetail[item.type].option !== -1}"></div>
          <div class="center-wrap">
            <div class="title">{{item.title}}<i class="iconfont icon-shurushuoming" @click.stop="openExplainPopup(item.type)"></i></div>
            <div class="short-desc">{{item.shortDesc}}</div>
          </div>
          <template v-if="item.options.length > 1">
            <span class="value" v-if="specialDeductionDetail[item.type].option !== -1">{{specialDeductionDetail[item.type].value}}</span>
            <span class="arrow"></span>
          </template>
          <template v-else>
            <span class="value" v-if="item.options[0].type==='fixed'">{{item.options[0].value}}</span>
            <input type="tel" class="input" placeholder="请输入" v-else v-model.number="item.options[0].value" @click.stop
              @blur="changeOptionValue(item, 0)">
          </template>
        </div>
        <div class="option-list" v-if="item.options.length > 1">
          <div class="option-item" v-for="(optionItem, optionIndex) in item.options" :key="`option-${optionIndex}`"
            @click="selectOption(item, optionIndex)">
            <div class="v-checkbox" :class="{'checked':specialDeductionDetail[item.type].option === optionIndex}"></div>
            <div class="label" :class="{'fixed':optionItem.type === 'fixed'}">{{optionItem.label}}</div>
            <div class="value" v-if="optionItem.type === 'fixed'">{{optionItem.value}}</div>
            <input type="tel" class="input" placeholder="请输入" v-else v-model.number="optionItem.value" @click.stop
              @blur="changeOptionValue(item, optionIndex)">
          </div>
        </div>
      </div>
    </div>
    <div class="sure-btn-wrap">
      <div class="sure-btn" @click="confirm">确认</div>
      <div class="cancel-btn" @click="cancel">返回</div>
    </div>
    <explain-popup ref="explain-popup" :type="popupType"></explain-popup>
    <submit-popup ref="submit-popup"></submit-popup>
  </div>
</template>

<script>
import checkBox from 'components/checkBox'
import TaxState from 'utils/TaxCalculator/TaxState'
import { MessageBox } from 'mint-ui'
import explainPopup from './explain-popup'
import submitPopup from './submit-popup'
export default {
  data () {
    // todo
    // let { child, parent, illness } = TaxState.state.specialDeductionDetail
    let { child, parent } = TaxState.state.specialDeductionDetail
    return {
      list: [
        {
          type: 'child',
          title: '子女教育',
          shortDesc: '包含学前教育和学历教育，夫妻择一',
          open: true,
          options: [
            {
              label: '1个',
              value: 1000,
              type: 'fixed'
            },
            {
              label: '2个',
              value: 2000,
              type: 'fixed'
            },
            {
              label: '3个',
              value: 3000,
              type: 'fixed'
            },
            {
              label: '4个',
              value: 4000,
              type: 'fixed'
            },
            {
              label: '自定义',
              value: child.value || '',
              type: 'auto'
            }
          ]
        },
        {
          type: 'learn',
          title: '继续教育',
          shortDesc: '学历教育',
          options: [{
            value: 400,
            type: 'fixed'
          }]
        },
        {
          type: 'houseLoan',
          title: '住房贷款利息',
          shortDesc: '本人或配偶首套房贷款利息（商业贷款），夫妻择一',
          options: [{
            value: 1000,
            type: 'fixed'
          }]
        },
        {
          type: 'rent',
          title: '住房租金',
          shortDesc: '同城，夫妻择一；不同城，分别抵扣',
          open: false,
          options: [
            {
              label: '直辖市、省会城市',
              value: 1200,
              type: 'fixed'
            },
            {
              label: '市辖区户籍人口超过100万',
              value: 1000,
              type: 'fixed'
            },
            {
              label: '市辖区户籍人口不超过100万(含)',
              value: 800,
              type: 'fixed'
            }
          ]
        },
        {
          type: 'parent',
          title: '赡养老人',
          shortDesc: '60岁以上父母及祖辈',
          open: false,
          max: 2000,
          options: [
            {
              label: '是独生子女',
              value: 2000,
              type: 'fixed'
            },
            {
              label: '非独生子女',
              value: parent.value || '',
              type: 'auto'
            }
          ]
        }
        /* {
          type: 'illness',
          title: '大病医疗',
          shortDesc: '每年医保目录范围内自付超过15000元不超过80000元部分',
          max: 80000,
          options: [
            {
              value: illness.value || '',
              type: 'auto'
            }
          ]
        } */
      ],
      hasShowTip: false,
      popupType: ''
    }
  },
  computed: {
    deductionDetailTotal () {
      return TaxState.getters.deductionDetailTotal
    },
    specialDeductionDetail () {
      return TaxState.state.specialDeductionDetail
    }
  },
  created () { },
  methods: {
    toggleDeduction (data) {
      let { open = false, options, type } = data
      !open && this.list.forEach(item => { item.open = false })
      if (options.length > 1) {
        data.open = !open
      } else {
        let option = this.specialDeductionDetail[type].option
        if (type === 'houseLoan' && option === -1) {
          this.showTip()
          TaxState.commit('clearDeductionDetail', 'rent')
        }
        this.setDeduction(
          type,
          option === -1 ? 0 : -1,
          option === -1 ? options[0].value : ''
        )
      }
    },
    selectOption (data, index) {
      let { type, options } = data
      let option = this.specialDeductionDetail[type].option
      if (type === 'rent' && option !== index) {
        this.showTip()
        TaxState.commit('clearDeductionDetail', 'houseLoan')
      }
      this.setDeduction(
        type,
        option === index ? -1 : index,
        option === index ? '' : options[index].value
      )
    },
    setDeduction (type, index, value) {
      TaxState.commit('setDeduction', {
        type,
        option: index,
        value
      })
    },
    showTip () {
      !this.hasShowTip && MessageBox.alert('首套房贷利息和住房租金扣减只可二选一')
      this.hasShowTip = true
    },
    changeOptionValue (data, index) {
      let { type, options, max } = data
      let currentDeduction = this.specialDeductionDetail[type]
      if (type === 'child') {
        options[index].value = Math.floor(options[index].value / 1000) * 1000
      }
      if ((type === 'parent' || type === 'illness') && options[index].value > max) {
        options[index].value = max
      }
      if (currentDeduction.option !== index) return false
      currentDeduction.value = options[index].value
    },
    confirm () {
      TaxState.commit('updateData', { type: 'specialDeduction', value: this.deductionDetailTotal })
      TaxState.commit('changeStep')
    },
    cancel () {
      TaxState.commit('changeStep', 'taxCalculatorStep1')
    },
    openExplainPopup (type) {
      this.popupType = type
      this.$refs['explain-popup'].show()
    },
    openSubmitPopup () {
      this.$refs['submit-popup'].show()
    }
  },
  components: {
    checkBox,
    explainPopup,
    submitPopup
  }
}
</script>