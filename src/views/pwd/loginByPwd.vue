<template>
  <!-- 密码登录 -->
  <div class="public-page login-by-pwd-page" :class="passwordType === '0' ? 'querycode-page' : 'handlock-page'">
    <user-avatar class="user-avatar"></user-avatar>
    <!-- 数字密码 -->
    <div class="content-wrap" v-if="passwordType === '0'">
      <div class="tip">请输入6位数密码</div>
      <code-input ref="code-input" v-model="code" @complete="complete"></code-input>
      <div class="forget-pwd-link"><span @click="toForget">忘记密码</span></div>
    </div>
    <!-- 手势密码 -->
    <div class="handlock-wrap" v-if="passwordType === '1'">
      <div class="tip">请输入手势密码</div>
      <hand-lock @not-enough="notEnough" @finished="checkHandPassword"></hand-lock>
      <div class="link"><span @click="passwordType = '0'">切换密码登录</span></div>
    </div>
  </div>
</template>

<script>
import userAvatar from 'components/userAvatar'
import codeInput from 'components/codeInput'
import handLock from 'components/handLock'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      passwordType: '',
      code: []
    }
  },
  created () {
    this.queryHandPassword()
  },
  methods: {
    async queryHandPassword () {
      let res = await this.$Password.queryHandPassword()
      this.passwordType = res.data.status.toString()
    },
    async complete () {
      try {
        let codeStr = helper.getPasswordStr(this.code)
        await this.$Password.checkPassword(codeStr, '0')
        this.goNextPage()
      } catch (e) {
        this.code = []
        this.$refs['code-input'].open()
      }
    },
    async checkHandPassword (res) {
      await this.$Password.checkPassword(helper.getPasswordStr(res), '1')
      this.goNextPage()
    },
    notEnough () {
      helper.toast(sysConfig.handLockUnEnoughTip)
    },
    goNextPage () {
      helper.saveFreePassword(this.passwordType)
      let { nextPage, wageSheetId } = this.$route.query
      if (nextPage === 'wageIndex') {
        this.$router.replace({ name: nextPage, params: { wageSheetId } })
      } else {
        if (nextPage === 'home') {
          // 显示银行卡余额
          helper.saveBalanceStatus(true)
        }
        this.$router.replace({ name: nextPage })
      }
    },
    toForget () {
      this.$router.push({ name: 'forgetSendCode' })
    }
  },
  components: {
    userAvatar,
    codeInput,
    handLock
  }
}
</script>