<template>
  <div class="bill-detail-page">
    <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <wage-detail-item v-for="(item, index) in wageDetailList" :key="index" :wage="item"></wage-detail-item>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom-group">
      该资金由{{wageDetailList[0].groupName}}发放
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
import wageDetailItem from 'components/wageDetailItem'
export default {
  data () {
    return {
      wageDetailList: storage.getSession('bankWageList', []),
      billOtherData: {
        push_date_time: '',
        employee_feedback: '',
        employee_name: '',
        is_expire_key: '1',
        phone: '',
        sp_name: '',
        group_name: ''
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
    helper.title(this.wageDetailList[0].wageName)
    helper.pushBaiduEvent(sysConfig.baidu_event.wageDetail)
  },
  methods: {
    changeFlag () {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    },
    getBillOtherData (data) {
      for (let key of Object.keys(this.billOtherData)) {
        this.billOtherData[key] = data[key]
      }
    },
    toQuestionPage (hasQuery) {
      storage.setSession('feedback', this.billOtherData.employee_feedback)
      let query = hasQuery ? { name: this.billOtherData.employee_name, phone: this.billOtherData.phone, sp_name: this.billOtherData.sp_name } : {}
      this.$router.push({ name: 'question', query: query })
    },
    noQuestion () {
      this.Http
        .connect(true)
        .post('entUser100711.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          plan_id: this.idInfo.plan_id ? this.idInfo.plan_id : '',
          group_id: this.idInfo.group_id ? this.idInfo.group_id : '',
          employee_feedback: '0'
        }).then((data) => {
          if (data.ret_code === '0000') {
            this.billOtherData.employee_feedback = '0'
          }
        })
    },
    switchHidden () {
      this.flag = !this.flag
      !this.flag && helper.pushBaiduEvent(sysConfig.baidu_event.hiddenBill)
    }
  },
  components: {
    wageDetailItem
  }
}
</script>
