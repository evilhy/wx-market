<template>
  <div class="wage-list-page group-select">
    <wage-group-list :group-list="groupList" :current-group="currentGroup" :choose-group="initCurrentData"></wage-group-list>
    <year-wage-outline :wage="outlineWage" :flag="flag" @toggle="flag = !flag"></year-wage-outline>
    <ul class="bill-list">
      <wage-item :wage="item" v-for="(item, index) in wageList" :key="index"></wage-item>
    </ul>
    <!-- swiper -->
    <year-swiper ref="year-swiper" :years="years" @transitionEnd="changeYear"></year-swiper>
  </div>
</template>
<script type="text/ecmascript-6">
import wageGroupList from 'components/wageGroupList'
import yearWageOutline from 'components/yearWageOutline'
import wageItem from 'components/wageItem'
import amtPercentLine from 'components/amtPercentLine'
import yearSwiper from 'components/yearSwiper'
import helper from 'utils/helper'
import filter from 'utils/filter'
import sysConfig from 'utils/constant'
export default {
  components: {
    wageGroupList,
    yearWageOutline,
    wageItem,
    amtPercentLine,
    yearSwiper
  },
  data () {
    return {
      years: [],
      currentYear: '',
      groupList: [],
      currentGroup: {},
      outlineWage: {
        shouldTotalAmt: 0,
        deductTotalAmt: 0,
        realTotalAmt: 0
      },
      wageList: [],
      flag: false
    }
  },
  computed: {
    swiper () {
      return this.$refs['year-swiper'].swiper
    }
  },
  created () {
    helper.title('我的收入')
    this.getGroupList()
    helper.pushBaiduEvent(sysConfig.baidu_event.wageList)
  },
  methods: {
    getGroupList () {
      this
        .$Roll
        .groupList()
        .then((res) => {
          this.groupList = res.data
          this.initCurrentData(0)
        })
    },
    initCurrentData (index) {
      this.currentGroup = this.groupList[index]
      this.currentYear = filter.date(this.currentGroup.createDate, 'Y')
      helper.saveUserInfo({ groupId: this.currentGroup.groupId })
      this.getWageList(true)
    },
    getWageList (isInit = false) {
      this
        .$Roll
        .wageList(this.currentGroup.groupId, this.currentYear)
        .then((res) => {
          this.initOutlineWage(res.data)
          this.wageList = res.data.planList
          this.years = res.data.years
          isInit && this.$nextTick(() => {
            this.swiper.slideTo(this.years.indexOf(this.currentYear))
          })
        })
    },
    initOutlineWage (data) {
      for (let key of Object.keys(this.outlineWage)) {
        this.outlineWage[key] = data[key]
      }
    },
    changeYear () {
      this.currentYear = this.years[this.swiper.activeIndex]
      this.getWageList()
    }
  }
}
</script>
