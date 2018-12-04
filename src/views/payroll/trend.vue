<template>
  <div class="trend-page">
    <ul class="choose">
      <li :class="[currentSalaryType==='0' ? 'active' : '']" @click="changeSalaryType('0')">按发放日</li>
      <li :class="[currentSalaryType==='1' ? 'active' : '']" @click="changeSalaryType('1')">按工资日</li>
    </ul>
    <recent-month-wage :wage="recentMonthWage" :type="currentSalaryType" :real-max="realAmtMax" :real-min="realAmtMin" :sub-max="subAmtMax" :sub-min="subAmtMin"></recent-month-wage>
    <div class="chart-wrap">
      <ve-histogram height="8.4375rem" :data="chartData" :grid="grid" :judge-width="false" :settings="chartSettings" :events="chartEvents" :mark-line="markLine" :colors="colors" :mark-point="markPoint"></ve-histogram>
    </div>
    <year-swiper ref="year-swiper" :years="years" @transitionEnd="changeYear"></year-swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/tooltip'
import VeHistogram from 'v-charts/lib/histogram'
import recentMonthWage from 'components/recentMonthWage'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import yearSwiper from 'components/yearSwiper'
import filter from 'utils/filter'

export default {
  components: {
    recentMonthWage,
    yearSwiper,
    VeHistogram,
    swiper, 
    swiperSlide
  },
  data () {
    return {
      currentSalaryType: '0',
      recentMonthWage: {},
      dataList: [],
      years: [],
      currentYear: '',
      realAmtMax: 0,
      realAmtMin: 0,
      subAmtMax: 0,
      subAmtMin: 0,
      grid: {},
      chartData: {},
      chartSettings: {},
      chartEvents: {},
      tooltip: {},
      markLine: {},
      markPoint: {},
      colors: []
    }
  },
  computed: {
    swiper () {
      return this.$refs['year-swiper'].swiper
    }
  },
  created () {
    document.title('工资走势')
    this.getWageTrend(true)
  },
  methods: {
    getWageTrend (isInit = false) {
      this
        .$Roll
        .wageTrend(this.currentYear, this.currentSalaryType)
        .then((res) => {
          this.dataList = res.data.dataList
          this.years = res.data.years
          this.setSalaryData()
          isInit && this.$nextTick(() => {
            this.swiper.slideTo(this.years.indexOf(this.currentYear))
          })
        })

    },
    setSalaryData () {
      this.currentYear = this.years[this.years.length - 1]
      this.recentMonthWage = this.dataList[this.dataList.length - 1]
      let realAmtArr = []
      let subAmtArr = []
      this.dataList.forEach((item) => {
        realAmtArr.push(item.realTotalAmt)
        subAmtArr.push(item.deductTotalAmt)
        item.month = filter.monthZh(item.month)
      })
      this.realAmtMax = Math.max(...realAmtArr).toString()
      this.realAmtMin = Math.min(...realAmtArr).toString()
      this.subAmtMax = Math.max(...subAmtArr).toString()
      this.subAmtMin = Math.min(...subAmtArr).toString()
      this.setTing()
    },
    changeYear () {
      this.currentYear = this.years[this.swiper.activeIndex]
      this.getWageTrend()
    },
    setTing () {
      this.chartData = {
        columns: ['month', 'realTotalAmt', 'deductTotalAmt'],
        rows: this.dataList
      }
      this.colors = ['#FB5E5E', '#52BDBD']
      this.grid = { left: 20, right: 50 }
      this.tooltip = {
        type: 'showTip',
        position: function (pt) {
          return [pt[0], 130]
        }
      }
      this.chartSettings = {
        labelMap: {
          deductTotalAmt: '扣除金额',
          realTotalAmt: '实发金额'
        },
        metrics: ['deductTotalAmt', 'realTotalAmt'],
        dimension: ['month'],
        scale: [false, false]
      }
      this.markLine = {
        data: [
          {
            name: '平均线',
            type: 'average'
          }
        ]
      }
      this.markPoint = {
        data: [
          {
            name: '最大值',
            type: 'max'
          },
          {
            name: '最小值',
            type: 'min'
          }
        ]
      }
      var _this = this
      this.chartEvents = {
        click (e) {
          if (e.componentType === 'series') {
            _this.recentMonthWage = _this.dataList[e.dataIndex]
          }
        }
      }
    },
    changeSalaryType (index) {
      this.currentSalaryType = index
      this.currentYear = ''
      this.getWageTrend(true)
    }
  }
}
</script>
