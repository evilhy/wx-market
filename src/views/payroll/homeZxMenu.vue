<template>
  <div class="link-wrap zx-link-wrap">
    <div class="item" @click="enterPayroll">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-income.png" alt=""></span>
      <span class="label">我的收入</span>
    </div>
    <div class="item" @click="toPage('bankcardList')">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-bank.png" alt=""></span>
      <span class="label">银行卡</span>
    </div>
    <div class="item" @click="toPage('welfareList')">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-welfare.png" alt=""></span>
      <span class="label">员工福利</span>
    </div>
    <div class="item" @click="toPage('user')">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-user.png" alt=""></span>
      <span class="label">个人信息</span>
    </div>
    <div class="item" @click="pwdManage">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-password.png" alt=""></span>
      <span class="label">密码安全</span>
    </div>
    <div class="item" @click="toPage('addressList')">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-address.png" alt=""></span>
      <span class="label">地址管理</span>
    </div>
    <div class="item" @click="toPage('notice',  { type: 5, entry: 'news' })">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-news.png" alt=""></span>
      <span class="label">最新资讯</span>
    </div>
    <div class="item" @click="toPage('invoice')">
      <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-invoice.png" alt=""></span>
      <span class="label">开票报销</span>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
export default {
  data () {
    return {}
  },
  created () { },
  methods: {
    pwdManage () {
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        this.toPage('pwdManage')
      } else {
        this.toPage('setQueryCode')
      }
    },
    enterPayroll () {
      this.$emit('enter-payroll')
    },
    toPage (name, query = {}) {
      this.$router.push({ name, query })
    }
  }
}
</script>