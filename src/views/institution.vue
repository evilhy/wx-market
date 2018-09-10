<template>
  <div class="institution-page group-select">
    <div class="current" @click="showflag = !showflag">
      <span class="name">{{currentGroup.group_name}}</span>
      <div class="img" v-if="groupList.length > 1">
        <i class="iconfont icon-sanjiaoxing-copy" v-if="!showflag"></i>
        <i class="iconfont icon-sanjiaoxingzhankai" v-if="showflag"></i>
      </div>
    </div>
    <ul class="group-list" :class="[showflag ? 'show' : '']">
      <li v-for="(item, index) in groupList" @click="chooseGroup(item,index)" :key="index" class="group-item">
        <p class="group-name">{{item.group_name}}</p>
        <span class="recent">最近一笔：{{item.create_date | deteData}}</span>
        <i class="iconfont icon-yilizhi" v-if="item.in_service_status=='0'"></i>
        <i class="iconfont icon-jiaobiao" v-if="item.is_see_status=='0'"></i>
      </li>
    </ul>
    <div class="proportion-bg">
      <div class="proportion">
        <div class="pro-hread">
          <h2>
            <em>本年收入（入账日）</em>
            <i class="iconfont icon-wenhao" @click="popupDialog=true"></i>
          </h2>
          <i class="icon-flag iconfont" :class="[flag ? 'icon-ai44' : 'icon-ai47']" @click="flag = !flag"></i>
        </div>
        <ul class="pro-main">
          <li>
            <i>总实发</i><br>
            <span>
              <em v-show="flag">&yen;</em>
              <b v-show="flag">{{amtInfo.bank_total_amt | money(2)}}</b>
              <b class="star" v-show="!flag">****</b>
            </span>
          </li>
          <li>
            <i>总扣除</i><br>
            <span>
              <em v-show="flag">&yen;</em>
              <b v-show="flag">{{amtInfo.sub_total_amt | money(2)}}</b>
              <b class="star" v-show="!flag">****</b>
            </span>
          </li>
        </ul>
        <amt-percent-line :total="amtInfo.plus_total_amt" :real="amtInfo.bank_total_amt" :sub="amtInfo.sub_total_amt"></amt-percent-line>
        <p class="pro-last">
          总应发：
          <span>
            <em v-show="flag">&yen;</em>
            <i v-show="flag">{{amtInfo.plus_total_amt | money(2)}}</i>
            <i class="star" v-show="!flag">****</i>
          </span>
        </p>
      </div>
    </div>
    <ul class="bill-list">
      <li v-for="(item, index) in billList" @click="toBillIndex(item.plan_id)" :key="index">
        <div class="bill-date">{{item.create_date_time | date('m.d')}}</div>
        <div class="bill-main">
          <div class="item_before"></div>
          <div class="bill-left">
            <div class="bill-type">
              <i class="iconfont icon-x-1" v-if="item.sp_type_icon=='0'"></i>
              <i class="iconfont icon-x-2" v-if="item.sp_type_icon=='1'"></i>
              <i class="iconfont icon-x-" v-if="item.sp_type_icon=='2'"></i>
              <i class="iconfont icon-x-_fuzhi-copy" v-if="item.sp_type_icon=='3'"></i>
              <span>{{item.fund_type | fundType}}</span>
            </div>
            <p class="bill-name">{{item.sp_name}}</p>
          </div>
          <div class="bill-right">
            <i v-show="flag">&yen;</i>
            <span v-show="flag">{{item.total_amt}}</span>
            <span class="star" v-show="!flag">****</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- swiper -->
    <year-swiper ref="year-swiper" :years="years" @transitionEnd="changeYear"></year-swiper>
    <bill-explain :show="popupDialog" @close="popupDialog=false"></bill-explain>
  </div>
</template>
<script type="text/ecmascript-6">
import amtPercentLine from 'components/amtPercentLine'
import yearSwiper from 'components/yearSwiper'
import billExplain from 'components/billExplain'
import storage from 'utils/storage'
import collect from 'utils/collect'
import helper from 'utils/helper'
import encryption from 'utils/encryption'
import sysConfig from 'utils/constant'
export default {
  components: {
    billExplain,
    amtPercentLine,
    yearSwiper
  },
  data () {
    return {
      idInfo: storage.getSession('ID', {}),
      workKey: encryption.decrypt(storage.getSession('wKey'), storage.getSession('mKey')).aes_key,
      years: [],
      currentYear: '',
      groupList: [],
      currentGroup: {},
      billInfoObj: {},     // 所有看过的工资列表
      billList: [],
      amtInfo: { bank_total_amt: '', plus_total_amt: '', sub_total_amt: '' },
      flag: true,          // 显示隐藏工资数
      popupDialog: false,  // 弹窗说明
      showflag: false     // 下拉显示
    }
  },
  computed: {
    swiper () {
      return this.$refs['year-swiper'].swiper
    }
  },
  created () {
  },
  mounted () {
    document.title = '我的收入'
    helper.pushBaiduEvent(sysConfig.baidu_event.institution)
    this.getInstitutionList()
  },
  methods: {
    getInstitutionList () {
      this.Http.connect(true).post('entUser100705.json', {
        open_id: this.idInfo.open_id ? this.idInfo.open_id : ''
      }).then((data) => {
        if (data.ret_code === '0000') {
          this.groupList = data.data_list
          storage.setSession('institution', this.groupList)
          let groupIndex = collect.indexOf(this.groupList, 'group_id', this.idInfo.group_id)
          this.currentGroup = this.groupList[groupIndex !== -1 ? groupIndex : 0]
          this.idInfo = { open_id: this.idInfo.open_id, plan_id: this.currentGroup.plan_id, ent_id: this.currentGroup.ent_id, group_id: this.currentGroup.group_id }
          helper.saveIdInfo(this.idInfo)
          this.getBillList(true)
        }
      })
    },
    getAmtInfo (data) {
      for (let key of Object.keys(this.amtInfo)) {
        this.amtInfo[key] = data[key]
      }
    },
    changeYear () {
      this.currentYear = this.years[this.swiper.activeIndex]
      if (Object.keys(this.billInfoObj).includes(this.currentGroup.group_id + this.currentYear)) {
        this.setYearData(this.billInfoObj[this.currentGroup.group_id + this.currentYear])
      } else {
        this.getBillList()
      }
    },
    changeGroup () {
      if (Object.keys(this.billInfoObj).includes(this.currentGroup.group_id + this.currentYear)) {
        this.setYearData(this.billInfoObj[this.currentGroup.group_id + this.currentYear])
      } else {
        this.currentYear = ''
        this.getBillList(true)
      }
    },
    toBillIndex (planId) {
      helper.saveIdInfo({ plan_id: planId })
      this.$router.push({ name: 'billIndex' })
    },
    getBillList (isInit = false) {
      let params = {
        open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
        ent_id: this.currentGroup.ent_id,
        group_id: this.currentGroup.group_id,
        year: this.currentYear
      }
      this.Http.connect(true).post('entUser100703.json', params).then((data) => {
        // 保留
        if (data.ret_code === '0000') {
          data = encryption.decrypt(data, this.workKey)
          this.setYearData(data)
          this.billInfoObj[this.currentGroup.group_id + this.currentYear] = data
          isInit && this.$nextTick(() => {
            this.swiper.slideTo(this.years.indexOf(this.currentYear))
          })
        }
      })
    },
    setYearData (data) {
      this.getAmtInfo(data)
      this.years = data.years
      this.currentYear = this.currentYear ? this.currentYear : this.years[this.years.length - 1]
      this.billList = data.plan_list
    },
    chooseGroup (item) {
      this.showflag = false
      this.currentGroup = item
      helper.saveIdInfo({ plan_id: item.plan_id, ent_id: item.ent_id, group_id: item.group_id })
      this.changeGroup()
    }
  }
}
</script>
