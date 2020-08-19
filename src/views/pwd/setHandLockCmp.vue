<template>
  <div class="page handlock-page white">
    <div class="title">{{titleArr[step]}}</div>
    <div class="tip">{{handLockTip}}</div>
    <hand-lock v-if="step === 0" @not-enough="notEnough" @finished="setFirstPassword"></hand-lock>
    <hand-lock v-if="step === 1" @not-enough="notEnough" @finished="checkRePassword"></hand-lock>
  </div>
</template>

<script>
import handLock from 'components/handLock'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
export default {
  props: {
    titleArr: Array
  },
  data () {
    return {
      step: 0,
      firstPassword: '',
      password: '',
      handLockTip: sysConfig.handLockTip
    }
  },
  created () { },
  methods: {
    notEnough (res) {
      helper.toast('请设置至少4个连接点')
    },
    setFirstPassword (res) {
      this.firstPassword = helper.getPasswordStr(res)
      this.step++
    },
    checkRePassword (res) {
      this.password = helper.getPasswordStr(res)
      if (this.firstPassword !== this.password) {
        helper.toast('两次密码不一致')
        this.reset()
      } else {
        this.savePassword()
      }
    },
    async savePassword () {
      try {
        await this.$Password.savePassword(this.firstPassword, this.password, '1')
        helper.saveUserInfo({ handPassword: 1 })
        helper.toast('设置成功')
        this.$router.replace({ name: 'pwdManage' })
      } catch (e) {
        this.reset()
      }
    },
    reset () {
      this.step = 0
      this.firstPassword = ''
      this.password = ''
    }
  },
  components: {
    handLock
  }
}
</script>