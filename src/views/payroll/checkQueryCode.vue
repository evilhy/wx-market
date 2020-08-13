<template>
  <!-- 设置6位查询密码 -->
  <div class="public-page check-code-page">
    <user-avatar class="user-avatar"></user-avatar>
    <div class="content-wrap" :class="{'show': keyboardFlag}">
      <div class="big-title">请输入6位数密码
        <i class="iconfont" :class="[visible ? 'icon-ai44' : 'icon-ai47']" @click.stop="toggle"></i>
      </div>
      <code-input @toggle="keyboardToggle" ref="code-input" @complete="setCode" :visible="visible"></code-input>
      <div class="forget-pwd-link"><span @click="toForget">忘记密码</span></div>
    </div>
  </div>
</template>

<script>
import userAvatar from 'components/userAvatar'
import codeInput from 'components/codeInput'
export default {
  data () {
    return {
      code: '',
      visible: false,
      keyboardFlag: false
    }
  },
  created () {},
  methods: {
    setCode (val) {
      this.code = val
      this.checkCode()
    },
    async checkCode () {
      try {
        await this.$Roll.checkPwd(this.code)
        let { wageSheetId = '', hasWage = '' } = this.$route.query
        if (wageSheetId) { // 推送
          this.$router.replace({ name: 'wageIndex', params: { wageSheetId } })
        } else {  // 首页
          if (hasWage) {
            this.$router.replace({ name: 'wageList' })
          } else {
            this.$router.replace({ name: 'noWage' })
          }
        }
      } catch (e) {
        this.code = ''
        this.$refs['code-input'].clearCode()
      }
    },
    toggle () {
      this.visible = !this.visible
    },
    toForget () {
      this.$router.push({ name: 'forgetSendCode' })
    },
    keyboardToggle (val) {
      this.keyboardFlag = val
    }
  },
  components: {
    userAvatar,
    codeInput
  }
}
</script>