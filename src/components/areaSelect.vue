<template>
  <van-action-sheet class="area-select" v-model="show" title="配送至">
    <div class="area-select-tab">
      <div class="tab-item" v-for="(item, index) in tabList" :key="index" :class="{ active: step === item.step }"
        v-show="step === item.step || currentArea[item.type]" @click="changeTab(item)">
        {{currentArea[item.type] || '请选择'}}</div>
    </div>
    <div class="area-select-main" ref="area-select-main">
      <template v-if="step === 0">
        <van-cell :class="{active: item.code ===currentArea.provinceCode }" :title="item.name"
          v-for="(item, index) in provinceList" :key="`province-${index}`"
          @click="select('province', item.code, item.name, 1)">
          <img v-if="item.code ===currentArea.provinceCode" class="icon-select" src="../assets/img/duigou.png" alt="">
        </van-cell>
      </template>
      <template v-if="step === 1">
        <van-cell :class="{active: item.code ===currentArea.cityCode }" :title="item.name"
          v-for="(item, index) in cityList" :key="`city-${index}`" @click="select('city', item.code, item.name, 2)">
          <img v-if="item.code ===currentArea.cityCode" class="icon-select" src="../assets/img/duigou.png" alt="">
        </van-cell>
      </template>
      <template v-if="step === 2">
        <van-cell :class="{active: item.code ===currentArea.countyCode }" :title="item.name"
          v-for="(item, index) in countyList" :key="`city-${index}`" @click="select('county', item.code, item.name, 3)">
          <img v-if="item.code ===currentArea.countyCode" class="icon-select" src="../assets/img/duigou.png" alt="">
        </van-cell>
      </template>
      <template v-if="step === 3">
        <van-cell :class="{active: item.code ===currentArea.townCode }" :title="item.name"
          v-for="(item, index) in townList" :key="`city-${index}`" @click="selectTown(item.code, item.name)">
          <img v-if="item.code ===currentArea.townCode" class="icon-select" src="../assets/img/duigou.png" alt="">
        </van-cell>
      </template>
    </div>
  </van-action-sheet>
</template>

<script>
import loading from 'utils/loading'
import { deepCopy } from 'utils/assist'
export default {
  data () {
    return {
      show: false,
      step: 0,
      currentArea: {
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        county: '',
        countyCode: '',
        town: '',
        townCode: ''
      },
      tabList: [
        { step: 0, type: 'province' },
        { step: 1, type: 'city' },
        { step: 2, type: 'county' },
        { step: 3, type: 'town' }
      ],
      typeList: ['province', 'city', 'county', 'town'],
      provinceList: [],
      cityList: [],
      countyList: [],
      townList: [],
      edit: !!this.$route.query.id
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    open (area) {
      this.show = true
      this.$nextTick(() => {
        this.initData(area)
        this.getData()
      })
    },
    initData (area) {
      this.clearData()
      this.currentArea = deepCopy(area)
      if (this.currentArea.townCode) {
        this.step = 3
      } else if (this.currentArea.countyCode) {
        this.step = 2
      } else {
        this.step = 0
      }
    },
    async getData (refresh = true) {
      let type = this.typeList[this.step]
      if (!refresh && this[`${type}List`].length) {
        if (this.step === 3 && !this.townList.length) {
          this.selectSure()
        }
        return
      }
      try {
        loading.show({ type: 'bounce', parent: document.querySelector('.van-action-sheet__content') })
        let parentCode = this.step === 0 ? '' : this.currentArea[`${this.typeList[this.step - 1]}Code`]
        if (this.step !== 3) {
          let res = await this.$WelfareCust.baseQuery(type.toUpperCase(), parentCode)
          this[`${type}List`] = res.data || []
        } else {
          let res = await this.$WelfareCust.townQuery(parentCode)
          this[`${type}List`] = res.data || []
          if (!res.data.length) {
            this.selectSure()
          }
        }
      } finally {
        loading.hide()
      }
    },
    changeTab ({ step, type }) {
      this.step = step
      if (!this[`${type}List`].length) {
        this.getData()
      }
    },
    select (type, code, name, nextStep) {

      let hasSelect = this.dealHasSelect(type, code, name, nextStep)

      if (this.step === 3) {
        this.selectSure()
        return
      }
      this.step = nextStep
      this.getData(!hasSelect)
    },
    dealHasSelect (type, code, name, nextStep) {
      if (this.currentArea[`${type}Code`] === code) return true
      let childTypeList = this.typeList.slice(nextStep)
      childTypeList.forEach((item) => {
        this[`${item}List`] = []
        this.currentArea[`${item}`] = ''
        this.currentArea[`${item}Code`] = ''
      })
      this.currentArea[type] = name
      this.currentArea[`${type}Code`] = code
      return false
    },
    selectTown (code, name) {
      this.currentArea.townCode = code
      this.currentArea.town = name
      this.selectSure()
    },
    selectSure () {
      this.show = false
      this.$emit('select', this.currentArea)
    },
    clearData () {
      this.provinceList = []
      this.cityList = []
      this.countyList = []
      this.townList = []
      this.currentArea = {
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        county: '',
        countyCode: '',
        town: '',
        townCode: ''
      }
    }
  }
}
</script>