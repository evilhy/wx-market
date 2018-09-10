<template>
  <div class="trend-page">
    <ul class="choose">
      <li :class="[currentSalaryType==='0' ? 'choose-this' : '']" @click="changeSalaryType('0')">按发放日</li>
      <li :class="[currentSalaryType==='1' ? 'choose-this' : '']" @click="changeSalaryType('1')">按工资日</li>
    </ul>
    <div class="proportion-bg">
      <div class="proportion">
        <div class="pro-hread">
          <h2>{{recentMonthData.sp_name}}</h2>
          <span v-show="currentSalaryType==='0'">{{recentMonthData.push_date_time | date('m/d')}}</span>
          <span v-show="currentSalaryType==='1'">{{recentMonthData.push_date_time | monthZh(true)}}</span>
        </div>
        <ul class="pro-main">
          <li>
            <em>实发金额
              <template v-if="realAmtMax!==realAmtMin">
                <i class="iconfont icon-zuigao-zuoce icon-blue" v-show="realAmtMax===recentMonthData.bank_total_amt"></i>
                <i class="iconfont icon-zuidi-zuoce icon-red" v-show="realAmtMin===recentMonthData.bank_total_amt"></i>
              </template>
            </em><br>
            <span>
              <em>&yen;</em>{{recentMonthData.bank_total_amt | money(2)}}</span>
          </li>
          <li>
            <em>扣除金额
              <template v-if="subAmtMax!==subAmtMin">
                <i class="iconfont icon-zuigao-youce icon-blue" v-show="subAmtMax===recentMonthData.sub_total_amt"></i>
                <i class="iconfont icon-zuidi-youce icon-red" v-show="subAmtMin===recentMonthData.sub_total_amt"></i>
              </template>
            </em><br>
            <span>
              <em>&yen;</em>{{recentMonthData.sub_total_amt | money(2)}}</span>
          </li>
        </ul>
        <amt-percent-line :total="recentMonthData.plus_total_amt" :real="recentMonthData.bank_total_amt" :sub="recentMonthData.sub_total_amt"></amt-percent-line>
      </div>
    </div>
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
import amtPercentLine from 'components/amtPercentLine'
import yearSwiper from 'components/yearSwiper'
import storage from 'utils/storage'
import { typeOf } from 'utils/assist'
import filter from 'utils/filter'
import encryption from 'utils/encryption'

export default {
  components: {
    amtPercentLine,
    yearSwiper
  },
  data () {
    return {
      idInfo: storage.getSession('ID'),
      workKey: encryption.decrypt(storage.getSession('wKey'), storage.getSession('mKey')).aes_key,
      currentSalaryType: '0',
      billInfoObj: {},
      dataList: [],
      years: [],
      currentYear: '',
      recentMonthData: {
        sp_name: '',
        bank_total_amt: '0.00',
        plus_total_amt: '0.00',
        sub_total_amt: '0.00',
        push_date_time: '--------'
      },
      realAmtMax: '',
      realAmtMin: '',
      subAmtMax: '',
      subAmtMin: '',
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
  created () {
    document.title = '工资走势'
    this.getTrendData(true)
  },
  computed: {
    swiper () {
      return this.$refs['year-swiper'].swiper
    }
  },
  methods: {
    getTrendData (isInit = false) {
      this.Http
        .connect(true)
        .post('entUser100712.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          group_id: this.idInfo.group_id ? this.idInfo.group_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : '',
          year: this.currentYear,
          salary_type: this.currentSalaryType
        }).then((data) => {
          if (data.ret_code === '0000') {
            if (typeOf(data.data_list) !== 'array' || !data.data_list.length) return
            data = encryption.decrypt(data, this.workKey)
            this.setSalaryData(data)
            this.billInfoObj[this.currentSalaryType + this.currentYear] = data
            isInit && this.$nextTick(() => {
              this.swiper.slideTo(this.years.indexOf(this.currentYear))
            })
          }
        })
    },
    setSalaryData (data) {
      let realAmtArr = []
      let subAmtArr = []
      data.data_list.forEach((item) => {
        realAmtArr.push(item.bank_total_amt)
        subAmtArr.push(item.sub_total_amt)
        item.month = filter.monthZh(item.month)
      })
      this.realAmtMax = Math.max(...realAmtArr).toString()
      this.realAmtMin = Math.min(...realAmtArr).toString()
      this.subAmtMax = Math.max(...subAmtArr).toString()
      this.subAmtMin = Math.min(...subAmtArr).toString()
      this.dataList = data.data_list
      this.years = data.years
      this.currentYear = this.currentYear ? this.currentYear : this.years[this.years.length - 1]
      this.recentMonthData = this.dataList[this.dataList.length - 1]
      this.setTing()
    },
    changeYear () {
      this.currentYear = this.years[this.swiper.activeIndex]
      if (Object.keys(this.billInfoObj).includes(this.currentSalaryType + this.currentYear)) {
        this.setSalaryData(this.billInfoObj[this.currentSalaryType + this.currentYear])
      } else {
        this.getTrendData()
      }
    },
    setTing () {
      this.chartData = {
        columns: ['month', 'bank_total_amt', 'sub_total_amt'],
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
          sub_total_amt: '扣除金额',
          bank_total_amt: '实发金额'
        },
        metrics: ['sub_total_amt', 'bank_total_amt'],
        // stack: { '应发金额': ['sub_total_amt', 'bank_total_amt'] },
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
            _this.recentMonthData = _this.dataList[e.dataIndex]
          }
        }
      }
    },
    changeSalaryType (index) {
      this.currentSalaryType = index
      if (Object.keys(this.billInfoObj).includes(this.currentSalaryType + this.currentYear)) {
        this.setSalaryData(this.billInfoObj[this.currentSalaryType + this.currentYear])
      } else {
        this.currentYear = ''
        this.getTrendData(true)
      }
    }
  }
}
</script>
