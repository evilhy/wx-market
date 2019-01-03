<template>
  <div class="personal-page">
    <swiper class="swiper-container" :options="swiperOption" id="person">
      <swiper-slide class="swiper-slide" v-for="(item, index) in empList" :key="index">
        <ul class="item-box">
          <li class="group-name">{{item.groupName}}</li>
          <li class="row">工号<span class="value">{{item.employeeNo}}</span></li>
          <li class="row">姓名<span class="value">{{item.employeeName}}</span></li>
          <li class="row">身份证<span class="value">{{item.idNumberStar}}</span></li>
          <li class="row">手机号<span class="value">{{item.phoneStar}}</span></li>
          <li class="row">职位<span class="value">{{item.position}}</span></li>
          <li class="row">入职时间<span class="value">{{item.entryDate | date('Y-m-d')}}</span></li>
          <li class="row">在职状态<span class="value">{{item.inServiceStatus}}</span></li>
        </ul>
        <ul class="item-box" v-for="(cardItem, cardItemIndex) in item.bankCardList" :key="'bank-' + cardItemIndex">
          <li class="row">开卡银行<span class="value">{{cardItem.bankName}}</span></li>
          <li class="row">银行卡号<span class="value">{{cardItem.bankCard}}</span></li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import helper from 'utils/helper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      empList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
    helper.title('个人信息')
    this.getEmpInfo()
  },
  methods: {
    getEmpInfo () {
      this
        .$Roll
        .empInfo()
        .then((res) => {
          this.empList = res.data
        })
    }
  }
}
</script>
