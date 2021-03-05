<template>
  <div class="wage-list-page">
    <van-dropdown-menu :active-color="themeColor">
      <van-dropdown-item :title="currentGroupName" ref="group-dropdown">
        <div class="group-list">
          <div v-for="(item, index) in groupList" :key="index" class="group-item" :class="{active: item.groupId === currentGroupId}" @click="changeGroup(item)">
            <p class="group-name">{{item.groupName}}</p>
            <i class="iconfont icon-yilizhi" v-if="item.inServiceStatus==='1'"></i>
            <i class="iconfont icon-jiaobiao" v-if="item.isRead==='0'"></i>
            <van-icon name="success" v-if="item.groupId === currentGroupId"/>
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
import TimeInstance from 'utils/time'
import collect from 'utils/collect'

export default {
  components: {
    yearWageOutline,
    wageItem,
    amtPercentLine,
    yearSwiper
  },
  data() {
    return {
      wageList: [],
      years: [],
      currentYear: 0,
      currentMonth: '',
      groupList: [],
      currentGroupId: '',
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
    },
    currentGroupName () {
      const group = collect.getItem(this.groupList, 'groupId', this.currentGroupId)
      return (group && group.groupName) || ''
    }
  },
  watch: {
    currentGroupId (groupId) {
      helper.saveUserInfo({ groupId })
    }
  },
  async created() {
    helper.title('我的收入')
    this.getQueryData()
    await this.getGroupList()
    this.getWageList()
  },
  methods: {
    getQueryData() {
      let { groupId = '', yearMonth = '' } = this.query
      this.currentGroupId = groupId
      if (yearMonth) {
        this.currentYear = Number(yearMonth.substring(0, 4))
        this.currentMonth = Number(yearMonth.substring(4))
      }
    },
    async getGroupList() {
      let res = await this.$Roll.groupList()
      this.groupList = res.data
      if (!this.currentGroupId) {
        this.setCurrentInfo(this.groupList[0])
      }
    },
    async getWageList() {
      if (!this.currentYear) {
        let group = collect.getItem(this.groupList, 'groupId', this.currentGroupId)
        this.currentYear = Number(TimeInstance.getTimeObject(group.createDate).year)
      }
      let res = await this.$Roll.wageList(
        this.currentGroupId,
        this.currentYear,
        this.currentType
      )
      let data = res.data
      if (!data || !Object.keys(data).length) return

      this.initOutlineWage(data)
      this.wageList = data.planList
      this.years = data.years
      this.$nextTick(() => {
        this.swiper.slideTo(this.years.indexOf(this.currentYear))
      })
    },
    setCurrentInfo (group) {
      this.currentGroupId = group.groupId
      this.currentYear = Number(TimeInstance.getTimeObject(group.createDate).year)
    },
    changeType (type) {
      this.currentType = type
      this.getWageList()
    },
    changeGroup (group) {
      this.$refs['group-dropdown'].toggle()
      if (this.currentGroupId === group.groupId) return
      this.setCurrentInfo(group)
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
