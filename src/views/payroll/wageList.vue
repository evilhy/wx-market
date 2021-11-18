<template>
  <div class="fixed-container">
    <van-dropdown-menu :active-color="themeColor">
      <van-dropdown-item :title="currentGroupName" ref="group-dropdown">
        <div class="group-list">
          <div v-for="(item, index) in groupList" :key="index"
            class="group-item"
            :class="{ active: item.groupId === currentGroupId }"
            @click="changeGroup(item)">
            <p class="group-name">{{ item.groupName }}</p>
            <svg-icon class="svg-quit" svg-name="quit"
              v-if="item.inServiceStatus === '1'"></svg-icon>
            <svg-icon class="svg-recent" svg-name="recent"
              v-if="item.isRead === '0'"></svg-icon>
            <van-icon name="success" v-if="item.groupId === currentGroupId" />
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item v-model="currentType" :options="typeList" @change="
          (value) => {
            changeType(value)
          }
        " />
    </van-dropdown-menu>
    <div class="wage-list-page">
      <year-wage-outline :wage="outlineWage" :flag="flag" @toggle="toggle">
      </year-wage-outline>
      <ul class="bill-list">
        <wage-item :wage="item" v-for="(item, index) in wageList" :key="index"
          :flag="flag"></wage-item>
      </ul>
    </div>
    <!-- swiper -->
    <div class="year-swiper" v-if="years.length && currentYear">
      <Carousel class="swiper-container" :itemsToShow="5" v-model="activeIndex"
        :wrapAround="true">
        <Slide v-for="(year, index) in years" :key="`year-${index}`">
          <div class="item-bg">
            <div class="span-bg">
              <span class="span">{{ year }}</span>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Carousel, Slide } from 'vue3-carousel'
import yearWageOutline from 'components/yearWageOutline'
import wageItem from 'components/wageItem'
import helper from 'utils/helper'
import storage from 'utils/storage'
import TimeInstance from 'utils/time'
import collect from 'utils/collect'

export default {
  components: {
    Carousel,
    Slide,
    yearWageOutline,
    wageItem
  },
  data() {
    return {
      groupList: [],
      wageList: [],
      years: [],
      currentGroupId: '',
      currentYear: 0,
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
      themeColor: helper.getThemeColor(),
      activeIndex: 0
    }
  },
  computed: {
    currentGroupName() {
      const group = collect.getItem(this.groupList, 'groupId', this.currentGroupId)
      return (group && group.groupName) || ''
    }
  },
  watch: {
    currentGroupId(groupId) {
      helper.saveUserInfo({ groupId })
    },
    activeIndex(val) {
      let year = this.years[val]
      if (year === this.currentYear) return
      this.currentYear = year
      this.getWageList()
    }
  },
  async created() {
    await this.getGroupList()
    await this.getWageList()
    this.$nextTick(() => {
      this.activeIndex = this.years.findIndex((year) => year === this.currentYear)
    })
  },
  methods: {
    async getGroupList() {
      const res = await this.$Roll.groupList()
      this.groupList = res.data
      this.setCurrentInfo(this.groupList[0])
    },
    setCurrentInfo(group) {
      this.currentGroupId = group.groupId
      this.currentYear = Number(TimeInstance.getTimeObject(group.createDate).year)
    },
    async getWageList() {
      const res = await this.$Roll.wageList(this.currentGroupId, this.currentYear, this.currentType)
      const data = res.data
      if (!data || !Object.keys(data).length) return
      this.initOutlineWage(data)
      this.wageList = data.planList
      this.years = data.years
    },
    initOutlineWage(data) {
      for (const key of Object.keys(this.outlineWage)) {
        this.outlineWage[key] = data[key]
      }
    },
    changeType(type) {
      this.currentType = type
      this.getWageList()
    },
    async changeGroup(group) {
      this.$refs['group-dropdown'].toggle()
      if (this.currentGroupId === group.groupId) return
      this.setCurrentInfo(group)
      await this.getWageList()
      this.$nextTick(() => {
        this.activeIndex = this.years.findIndex((year) => year === this.currentYear)
      })
    },
    toggle() {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    }
  }
}
</script>
