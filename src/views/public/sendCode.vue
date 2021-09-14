<template>
  <div class="public-page send-code-page">
    <div class="content-wrap">
      <div class="big-title">输入验证码</div>
      <div class="tip">
        {{ userInfo.employeeName }}，您好！欢迎使用放薪管家工资条，验证短信已发送至您 <span class="stress">{{ userInfo.phoneStar }}</span> 手机。
      </div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="bindWX">确认</button>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
import verifycodeBtn from 'components/verifycodeBtn'
import validate from 'utils/validate'

export default {
  data() {
    return {
      userInfo: helper.getUserInfo(),
      code: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!from.name) return
      vm.$refs['verifycode-btn'].start()
      vm.sendCode()
    })
  },
  computed: {
    btnDisabled() {
      return !validate.isCode(this.code)
    }
  },
  created() {},
  mounted() {},
  methods: {
    async sendCode() {
      await this.$Inside.sendCode(this.userInfo.phone, '0')
    },
    async bindWX() {
      await this.$Inside.bindWX(this.code)
      this.code = ''
      this.$router.replace({ name: 'setQueryCode' })
    }
  },
  components: {
    verifycodeBtn
  }
}
</script>
