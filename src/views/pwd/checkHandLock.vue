<template>
  <div class="page handlock-page white">
    <div class="title">输入原手势密码</div>
    <div class="tip">{{handLockTip}}</div>
    <hand-lock @not-enough="notEnough" @finished="checkPassword"></hand-lock>
  </div>
</template>

<script>
import handLock from 'components/handLock'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
export default {
  data () {
    return {
      handLockTip: sysConfig.handLockTip
    }
  },
  created () { },
  methods: {
    notEnough (res) {
      // helper.toast(sysConfig.handLockUnEnoughTip)
    },
    async checkPassword (res) {
      await this.$Password.checkPassword(helper.getPasswordStr(res), '1')
      this.$router.replace({ name: 'setNewHandLock' })
    }
  },
  components: {
    handLock
  }
}
</script>