<template>
  <div class="elife-login-page">
    <div class="input-form">
      <div class="input-wrap">
        <img src="../../assets/img/elife/elife-name.png" alt="" class="icon" />
        <span class="line"></span>
        <input v-model.trim="name" type="text" placeholder="请输入姓名" class="input" maxlength="10" />
      </div>
      <div class="input-wrap">
        <img src="../../assets/img/elife/elife-phone.png" alt="" class="icon" />
        <span class="line"></span>
        <input v-model.trim="phone" type="tel" placeholder="请输入手机号" class="input" maxlength="11" />
      </div>
    </div>
    <div class="btn" @click="joinActivity">参与活动</div>
    <div class="tip-wrap">
      <p class="title">温馨提示</p>
      <p class="content">本次活动手机号为您的身份唯一标识，请注意银行办理业务手机号与活动手机号一致，否则可能导致奖励发放错误。</p>
    </div>
  </div>
</template>
<script>
import elife from 'mixins/elife'
import helper from 'utils/helper'

export default {
  mixins: [elife],
  data() {
    return {
      name: '',
      phone: ''
    }
  },
  created() {
    this.getQueryParams()
  },
  methods: {
    getQueryParams() {
      const { name, phone } = this.$route.query
      this.name = name
      this.phone = phone
    },
    joinActivity() {
      if (!this.checkInfo()) return
      this.$Elife.joinActivity(this.name, this.phone).then((res) => {
        this.postElife(res.data)
      })
    },
    checkInfo() {
      if (!this.name) {
        helper.toast('请输入姓名')
        return false
      }
      if (!this.phone || this.phone.length !== 11 || this.phone.charAt(0) !== '1') {
        helper.toast('请输入正确的手机号')
        return false
      }
      return true
    }
  }
}
</script>
