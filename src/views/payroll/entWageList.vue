<template>
  <div class="fixed-container">
    <van-dropdown-menu :active-color="themeColor">
      <van-dropdown-item :title="currentEnt.entName" ref="group-dropdown">
        <div class="group-list">
          <div v-for="(item, index) in entList" :key="index" class="group-item"
            :class="{ active: item.entId === currentEnt.entId }"
            @click="changeEnt(item)">
            <p class="group-name">{{ item.entName }}</p>
            <van-icon name="success" v-if="item.entId === currentEnt.entId" />
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
import yearWageOutline from 'components/yearWageOutline'
import wageItem from 'components/wageItem'
import { Carousel, Slide } from 'vue3-carousel'
import helper from 'utils/helper'
import storage from 'utils/storage'

export default {
  components: {
    yearWageOutline,
    wageItem,
    Carousel,
    Slide
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
      themeColor: helper.getThemeColor(),
      activeIndex: 0
    }
  },
  watch: {
    activeIndex(val) {
      let year = this.years[val]
      if (year === this.currentYear) return
      this.currentYear = year
      this.getWageList()
    }
  },
  async created() {
    if (!this.entList.length) return
    this.setCurrentInfo(this.entList[0])
    await this.getWageList()
    this.$nextTick(() => {
      this.activeIndex = this.years.findIndex((year) => year === this.currentYear)
    })
  },
  methods: {
    async getWageList() {
      const res = await this.$Roll.wageList(this.currentEnt.groupId, this.currentYear, this.currentType)
      const data = res.data
      if (!data || !Object.keys(data).length) return

      this.initOutlineWage(data)
      this.wageList = data.planList
      this.years = data.years || []
    },
    setCurrentInfo(ent) {
      const { entId = '', recentYear = 0, groupId = '' } = ent
      this.currentEnt = ent
      this.currentYear = recentYear
      helper.saveUserInfo({ entId, groupId })
    },
    changeType(type) {
      this.currentType = type
      this.getWageList()
    },
    async changeEnt(ent) {
      this.$refs['group-dropdown'].toggle()
      if (this.currentEnt.entId === ent.entId) return
      this.setCurrentInfo(ent)
      await this.getWageList()
      this.$nextTick(() => {
        this.activeIndex = this.years.findIndex((year) => year === this.currentYear)
      })
    },
    initOutlineWage(data) {
      for (const key of Object.keys(this.outlineWage)) {
        this.outlineWage[key] = data[key]
      }
    },
    toggle() {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    }
  }
}
</script>
