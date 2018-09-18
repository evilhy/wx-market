<template>
  <div class="wage-list-page group-select">
    <wage-list-select :group-list="groupList" :current-group="currentGroup" :current-type="currentType" @choose="initCurrentData"></wage-list-select>
    <year-wage-outline :wage="outlineWage" :flag="flag" @toggle="toggle"></year-wage-outline>
    <ul class="bill-list">
      <wage-item :wage="item" v-for="(item, index) in wageList" :key="index" :flag="flag"></wage-item>
    </ul>
    <!-- swiper -->
    <year-swiper ref="year-swiper" :years="years" @transitionEnd="changeYear"></year-swiper>
  </div>
</template>
<script type="text/ecmascript-6">
import wageListSelect from 'components/wageListSelect'
import yearWageOutline from 'components/yearWageOutline'
import wageItem from 'components/wageItem'
import amtPercentLine from 'components/amtPercentLine'
import yearSwiper from 'components/yearSwiper'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import storage from 'utils/storage'
import filter from 'utils/filter'
export default {
  components: {
    wageListSelect,
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
      currentType: '1',
      outlineWage: {
        shouldTotalAmt: 0,
        deductTotalAmt: 0,
        realTotalAmt: 0
      },
      wageList: [],
      flag: storage.getSession('amtFlag', true)
    }
  },
  computed: {
    swiper () {
      return this.$refs['year-swiper'].swiper
    }
  },
  created () {
    helper.title('我的收入')
    helper.pushBaiduEvent(sysConfig.baidu_event.wageList)
    this.getGroupList()
  },
  methods: {
    getGroupList () {
      this
        .$Roll
        .groupList()
        .then((res) => {
          this.groupList = res.data
          this.initCurrentData(this.groupList[0])
        })
    },
    initCurrentData (group, type = this.currentType) {
      this.currentGroup = group
      this.currentType = type
      this.currentYear = Number(filter.date(group.createDate, 'Y'))
      helper.saveUserInfo({ groupId: this.currentGroup.groupId })
      this.getWageList(true)
    },
    getWageList (isInit = false) {
      this
        .$Roll
        .wageList(this.currentGroup.groupId, this.currentYear, this.currentType)
        .then((res) => {
          this.initOutlineWage(res.data)
          this.wageList = res.data.planList
          this.years = res.data.years
          this.currentYear = this.years[this.years.length - 1]
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
      if (this.currentYear !== this.years[this.swiper.activeIndex]) {
        this.currentYear = this.years[this.swiper.activeIndex]
        this.getWageList()
      }
    },
    toggle () {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    }
  }
}
</script>
