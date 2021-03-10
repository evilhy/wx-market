<template>
  <div class="wage-list-page">
    <van-dropdown-menu :active-color="themeColor">
      <van-dropdown-item :title="currentEnt.entName" ref="group-dropdown">
        <div class="group-list">
          <div v-for="(item, index) in entList" :key="index" class="group-item" :class="{active: item.entId === currentEnt.entId}" @click="changeEnt(item)">
            <p class="group-name">{{item.entName}}</p>
            <van-icon name="success" v-if="item.entId === currentEnt.entId"/>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item v-model="currentType" :options="typeList" @change="(value) => { changeType(value) }"/>
    </van-dropdown-menu>
    <year-wage-outline :wage="outlineWage" :flag="flag" @toggle="toggle"></year-wage-outline>
    <ul class="bill-list">
      <wage-item :wage="item" v-for="(item, index) in wageList" :key="index" :flag="flag"></wage-item>
    </ul>
    <!-- swiper -->
    <year-swiper ref="year-swiper" :years="years" @transitionEnd="changeYear"></year-swiper>
  </div>
</template>
<script type="text/ecmascript-6">
import yearWageOutline from 'components/yearWageOutline'
import wageItem from 'components/wageItem'
import amtPercentLine from 'components/amtPercentLine'
import yearSwiper from 'components/yearSwiper'
import helper from 'utils/helper'
import storage from 'utils/storage'

export default {
  components: {
    yearWageOutline,
    wageItem,
    amtPercentLine,
    yearSwiper
  },
  data() {
    return {
      entList: storage.getSession('entList', []),
      currentEnt: '',
      wageList: [],
      years: [],
      currentYear: '',
      typeList: [
        {
          text: '资金已到账',
          value: '0'
        },
        {
          text: '合计',
          value: '1'
        }
      ],
      currentType: '1',
      outlineWage: {
        shouldTotalAmt: 0,
        deductTotalAmt: 0,
        realTotalAmt: 0
      },
      flag: storage.getSession('amtFlag', true),
      query: this.$route.query,
      themeColor: helper.getThemeColor()
    }
  },
  computed: {
    swiper() {
      return this.$refs['year-swiper'].swiper
    }
  },
  async created() {
    helper.title('我的收入')
    this.setCurrentInfo(this.entList[0])
    this.getWageList()
  },
  methods: {
    async getWageList() {
      let res = await this.$Roll.wageList(
        this.currentEnt.groupId,
        this.currentYear,
        this.currentType
      )
      let data = res.data
      if (!data || !Object.keys(data).length) return

      this.initOutlineWage(data)
      this.wageList = data.planList
      this.years = data.years || []
      this.$nextTick(() => {
        this.swiper.slideTo(this.years.indexOf(this.currentYear))
      })
    },
    setCurrentInfo (ent) {
      let { entId = '', recentYear = 0, groupId = '' } = ent
      this.currentEnt = ent
      this.currentYear = recentYear
      helper.saveUserInfo({ entId, groupId })
    },
    changeType (type) {
      this.currentType = type
      this.getWageList()
    },
    changeEnt (ent) {
      this.$refs['group-dropdown'].toggle()
      if (this.currentEnt.entId === ent.entId) return
      this.setCurrentInfo(ent)
      this.getWageList()
    },
    initOutlineWage(data) {
      for (let key of Object.keys(this.outlineWage)) {
        this.outlineWage[key] = data[key]
      }
    },
    changeYear() {
      if (this.currentYear !== this.years[this.swiper.activeIndex]) {
        this.currentYear = this.years[this.swiper.activeIndex]
        this.getWageList()
      }
    },
    toggle() {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    }
  }
}
</script>
