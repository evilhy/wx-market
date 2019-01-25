<template>
  <div class="public-page send-code-page">
    <public-logo></public-logo>
    <div class="content-wrap">
      <div class="big-title">身份绑定</div>
      <div class="tip">{{userInfo.employeeName}}，您好！欢迎使用放薪管家工资条。</div>
      <div class="field-wrap mt">
        <img class="field-icon field-icon-phone" src="../../assets/img/public/field-phone.png" />
        <input class="input" type="tel" maxlength="11" placeholder="请输入手机号" v-model.trim="phone" />
      </div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" :disabled="verifyBtnDisabled" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="bindTel">确认</button>
    </div>
  </div>
</template>

<script>
import publicLogo from 'components/publicLogo'
import helper from 'utils/helper'
import verifycodeBtn from 'components/verifycodeBtn'
import validate from 'utils/validate'
export default {
  data () {
    return {
      userInfo: helper.getUserInfo(),
      code: '',
      phone: '',
      pwd: this.$route.query.cardTail
    }
  },
  computed: {
    verifyBtnDisabled () {
      return !validate.isPhone(this.phone)
    },
    btnDisabled () {
      return !this.code || !this.phone || !this.pwd
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async sendCode () {
      if (this.verifyBtnDisabled) return false
      await this.$Inside.sendCode(this.phone)
    },
    async bindTel () {
      let { code, phone, pwd } = this
      await this.$Inside.bindTel({ code, phone, pwd })
      this.$router.replace({ name: 'complete' })
    }
  },
  components: {
    publicLogo,
    verifycodeBtn
  }
}
</script>