<template>
  <div class="personal-page">
    <swiper class="swiper-container" :options="swiperOption" id="person">
      <swiper-slide class="swiper-slide" v-for="(item, index) in empList" :key="index">
        <ul class="item-box">
          <li class="group-name">{{item.groupName}}</li>
          <li>工号
            <span>{{item.employeeNo}}</span>
          </li>
          <li>姓名
            <span>{{item.employeeName}}</span>
          </li>
          <li>身份证
            <span>{{item.idNumber}}</span>
          </li>
          <li>手机号
            <span>{{item.phoneStar}}</span>
          </li>
          <li>职位
            <span>{{item.position}}</span>
          </li>
          <li>入职时间
            <span>{{item.entryDate | date('Y-m-d')}}</span>
          </li>
          <li>在职状态
            <span>{{item.inServiceStatus}}</span>
          </li>
        </ul>
        <ul class="item-box" v-for="(cardItem, cardItemIndex) in item.bankCardList" :key="'bank-' + cardItemIndex">
          <li>开卡银行
            <span>{{cardItem.bankName}}</span>
          </li>
          <li>银行卡号
            <span>{{cardItem.bankCard}}</span>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
import sysConfig from 'utils/constant'
import helper from 'utils/helper'

export default {
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
          helper.pushBaiduEvent(sysConfig.baidu_event.mainMessage)
        })
    }
  }
}
</script>
