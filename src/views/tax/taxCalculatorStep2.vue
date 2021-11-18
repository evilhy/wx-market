<template>
  <div class="tax-calculator-step2">
    <div class="white-box total-wrap">
      <div class="label">专项扣除(元)</div>
      <div class="value">{{ $filter.money(deductionDetailTotal) }}</div>
      <!-- <div class="finance-btn" @click="openSubmitPopup">提交给财务</div> -->
    </div>
    <div class="tip">请选择符合标准的扣除专项</div>
    <div class="deduction-list">
      <div class="deduction-item" v-for="(item, index) in list" :key="index" :class="{ open: item.open }">
        <div class="parent-item" @click="toggleDeduction(item)">
          <div class="v-checkbox" :class="{ checked: specialDeductionDetail[item.type].option !== -1 }"></div>
          <div class="center-wrap">
            <div class="title">
              {{ item.title }}
              <span class="icon-wrap" extend-click @click.stop="openExplainPopup(item.type)">
                <van-icon name="question"/>
              </span>
            </div>
            <div class="short-desc">{{ item.shortDesc }}</div>
          </div>
          <template v-if="item.options.length > 1">
            <span class="value" v-if="specialDeductionDetail[item.type].option !== -1">{{ specialDeductionDetail[item.type].value }}</span>
            <span class="arrow"></span>
          </template>
          <template v-else>
            <span class="value" v-if="item.options[0].type === 'fixed'">{{ item.options[0].value }}</span>
            <input type="tel" class="input" placeholder="请输入" v-else v-model.number="item.options[0].value" @click.stop @blur="changeOptionValue(item, 0)" @focus="changeMargin" />
          </template>
        </div>
        <div class="option-list" v-if="item.options.length > 1">
          <div class="option-item" v-for="(optionItem, optionIndex) in item.options" :key="`option-${optionIndex}`" @click="selectOption($event, item, optionIndex)">
            <div class="v-checkbox" :class="{ checked: specialDeductionDetail[item.type].option === optionIndex }"></div>
            <div class="label" :class="{ fixed: optionItem.type === 'fixed' }">{{ optionItem.label }}</div>
            <div class="value" v-if="optionItem.type === 'fixed'">{{ optionItem.value }}</div>
            <input type="tel" class="input" placeholder="请输入" v-else v-model.number="optionItem.value" @blur="changeOptionValue(item, optionIndex)" @focus="changeMargin" />
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
import { Dialog } from 'vant'
import { createNamespacedHelpers } from 'vuex'
import explainPopup from './explain-popup'
import submitPopup from './submit-popup'
const { mapGetters, mapState, mapMutations } = createNamespacedHelpers('calculator')

export default {
  data() {
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
              value: '',
              type: 'auto'
            }
          ]
        },
        {
          type: 'learn',
          title: '继续教育',
          shortDesc: '学历教育',
          options: [
            {
              value: 400,
              type: 'fixed'
            }
          ]
        },
        {
          type: 'houseLoan',
          title: '住房贷款利息',
          shortDesc: '本人或配偶首套房贷款利息（商业贷款），夫妻择一',
          options: [
            {
              value: 1000,
              type: 'fixed'
            }
          ]
        },
        {
          type: 'rent',
          title: '住房租金',
          shortDesc: '同城，夫妻择一；不同城，分别抵扣',
          open: false,
          options: [
            {
              label: '直辖市、省会(首府)城市',
              value: 1500,
              type: 'fixed'
            },
            {
              label: '市辖区户籍人口超过100万',
              value: 1100,
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
              value: '',
              type: 'auto'
            }
          ]
        }
      ],
      hasShowTip: false,
      popupType: ''
    }
  },
  computed: {
    ...mapState(['specialDeductionDetail']),
    ...mapGetters(['deductionDetailTotal'])
  },
  created() {
    this.initList()
  },
  methods: {
    ...mapMutations(['clearDeductionDetail', 'setDeduction', 'updateData', 'changeStep']),
    initList () {
      let { child, parent } = this.specialDeductionDetail
      this.list[0].options[4].value = child.value || ''
      this.list[4].options[1].value = parent.value || ''
    },
    toggleDeduction(data) {
      const { open = false, options, type } = data
      !open &&
        this.list.forEach((item) => {
          item.open = false
        })
      if (options.length > 1) {
        data.open = !open
      } else {
        const o = this.specialDeductionDetail[type].option
        if (type === 'houseLoan' && o === -1) {
          this.showTip()
          this.clearDeductionDetail('rent')
        }
        this.setDeduction({ type, option: o === -1 ? 0 : -1, value: o === -1 ? options[0].value : '' })
      }
    },
    selectOption(e, data, index) {
      const { type, options } = data
      const tagName = e.target.tagName
      const o = this.specialDeductionDetail[type].option
      if (type === 'rent' && o !== index) {
        this.showTip()
        this.clearDeductionDetail('houseLoan')
      }
      if (o !== index || tagName === 'INPUT') {
        this.setDeduction({ type, option: index, value: options[index].value })
      } else {
        this.setDeduction({ type, option: -1, value: '' })
      }
    },
    showTip() {
      !this.hasShowTip &&
        Dialog.alert({
          title: '提示',
          message: '首套房贷利息和住房租金扣减只可二选一'
        })
      this.hasShowTip = true
    },
    changeOptionValue(data, index) {
      const { type, options, max } = data
      const currentDeduction = this.specialDeductionDetail[type]
      if (type === 'child') {
        options[index].value = Math.floor(options[index].value / 1000) * 1000
      }
      if (type === 'parent' && options[index].value > max / 2) {
        options[index].value = max / 2
      }
      if (currentDeduction.option !== index) return
      this.setDeduction({ type, option: currentDeduction.option, value: options[index].value })
      window.document.getElementsByTagName('html')[0].style.marginTop = `1px`
    },
    confirm() {
      this.updateData({ type: 'specialDeduction', value: this.deductionDetailTotal })
      this.changeStep()
    },
    cancel() {
      this.changeStep('taxCalculatorStep1')
    },
    openExplainPopup(type) {
      this.popupType = type
      this.$refs['explain-popup'].show()
    },
    openSubmitPopup() {
      this.$refs['submit-popup'].show()
    },
    changeMargin() {
      window.document.getElementsByTagName('html')[0].style.marginTop = `0px`
    }
  },
  components: {
    explainPopup,
    submitPopup
  }
}
</script>
