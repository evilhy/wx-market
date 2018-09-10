<template>
  <div class="personal-page">
    <swiper class="swiper-container" :options="swiperOption" id="person">
      <swiper-slide class="swiper-slide" v-for="(item, index) in dataList" :key="index">
        <ul class="item-box">
          <li class="group-name">{{item.group_name}}</li>
          <li>工号
            <span>{{item.employee_no}}</span>
          </li>
          <li>姓名
            <span>{{item.employee_name}}</span>
          </li>
          <li>身份证
            <span>{{item.id_number_star}}</span>
          </li>
          <li>手机号
            <span>{{item.phone_star}}</span>
          </li>
          <li>职位
            <span>{{item.position}}</span>
          </li>
          <li>入职时间
            <span>{{item.entry_date | date('Y-m-d')}}</span>
          </li>
          <li>在职状态
            <span>{{item.in_service_status | serviceStatus}}</span>
          </li>
        </ul>
        <ul class="item-box" v-for="(cardItem, cardItemIndex) in item.bank_card_list" :key="'bank-' + cardItemIndex">
          <li>开卡银行
            <span>{{cardItem.bank_name}}</span>
          </li>
          <li>银行卡号
            <span>{{cardItem.bank_card}}</span>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import sysConfig from 'utils/constant'
import storage from 'utils/storage'
import helper from 'utils/helper'

export default {
  data () {
    return {
      idInfo: storage.getSession('ID'),
      dataList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
  },
  mounted () {
    document.title = '个人信息'
    this.getPersonal()
  },
  methods: {
    getPersonal () {
      this.Http
        .connect(true)
        .post('entUser100708.json', { open_id: this.idInfo.open_id ? this.idInfo.open_id : '' })
        .then((data) => {
          if (data.ret_code === '0000') {
            helper.pushBaiduEvent(sysConfig.baidu_event.mainMessage)
            this.dataList = data.employee_list
          }
        })
    }
  }
}
</script>
