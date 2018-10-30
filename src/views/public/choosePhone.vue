<template>
  <div class="choose-phone-page">
   <div class="logo-wrap">
      <img src="../../assets/img/logo.png" alt="" class="logo"/>
    </div>
    <p class="tip">发现您在多个企业任职，请选择任意一项进行验证</p>
    <div class="phone-list card-form">
      <div @click="choosePhone(employee, index)" class="phone-item input" :class="{ active:  selectedIndex === index, disabled: !employee.phone }" v-for="(employee, index) in employeeList" :key="index">
        <span class="phone" v-if="employee.phoneStar">{{employee.phoneStar}}</span>
        <span class="no-phone" v-else>无手机号</span>
        <span class="count">{{employee.entName}}</span>
      </div>
    </div>
    <div class="bottom-tip">
      <i class="iconfont icon-tanhao"></i>
      <span>如以上手机号不正确<br/>请尽快联系您所在企业修改手机号</span>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'

export default {
  data () {
    return {
      employeeList: storage.getSession('employeeList', []),
      selectedIndex: -1
    }
  },
  created () {
    helper.title('身份验证')
  },
  mounted () {
  },
  methods: {
    choosePhone (item, index) {
      if (!item.phone) return false
      this.selectedIndex = index
      helper.saveUserInfo(item)
      this.sendCode()
    },
    sendCode () {
      this
        .$Inside
        .sendCode()
        .then((res) => {
          helper.saveRemainTime()
          this.$router.push({name: 'sendCode'})
        })
    }
  }
}
</script>
