<template>
  <div class="public-page send-code-page">
    <div class="content-wrap">
      <div class="big-title">绑定新手机号</div>
      <div class="field-wrap mt">
        <img class="field-icon field-icon-phone" src="../../assets/img/public/field-phone.png" />
        <input class="input" type="tel" maxlength="11" placeholder="请输入手机号" v-model.trim="phone" />
      </div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" :disabled="verifyBtnDisabled" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="modifyPhone">确认</button>
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
      code: '',
      phone: ''
    }
  },
  computed: {
    verifyBtnDisabled() {
      return !validate.isPhone(this.phone)
    },
    btnDisabled() {
      return !this.code || !this.phone
    }
  },
  created() {},
  mounted() {},
  methods: {
    async sendCode() {
      if (this.verifyBtnDisabled) return
      await this.$Inside.sendCode(this.phone, '0')
    },
    async modifyPhone() {
      const { code, phone } = this
      await this.$Inside.updPhone({ code, phone })
      helper.toast('手机号更换成功')
      this.$router.replace({ name: 'user' })
    }
  },
  components: {
    verifycodeBtn
  }
}
</script>
