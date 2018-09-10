<template>
  <div class="choose-phone-page">
   <div class="logo-wrap">
      <img src="../assets/img/logo.png" alt="" class="logo"/>
    </div>
    <p class="tip">请先选择一个手机号</p>
    <div class="phone-list card-form">
      <div @click="choosePhone(employee, index)" class="phone-item input" :class="{ active:  chooseIndex === index }" v-for="(employee, index) in employeeList" :key="index">
        <span class="phone">{{employee.phone_star}}</span>
        <span class="count">{{employee.count}}家企业在用</span>
      </div>
    </div>
    <div class="point">
      <i class="iconfont icon-tanhao"></i>
      <span>如以上手机号不正确<br/>请尽快联系您所在企业修改手机号</span>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'

export default {
  data () {
    return {
      employeeList: [],
      chooseIndex: -1
    }
  },
  created () {
    document.title = '身份验证'
    this.employeeList = storage.getSession('employeeList', []).filter(item => item.phone_star)
    helper.pushBaiduEvent(sysConfig.baidu_event.choosePhone)
  },
  mounted () {
  },
  methods: {
    choosePhone (item, index) {
      this.chooseIndex = index
      setTimeout(() => {
        storage.setSession('employeeInfo', { id_number: this.$route.query.id_number, ...item })
        helper.saveIdInfo({ id_number_hash: item.id_number_hash })
        this.$router.push({name: 'sendCode'})
      }, 500)
    }
  }
}
</script>
