<template>
  <div class="public-page send-code-page">
    <div class="content-wrap">
      <div class="big-title">修改手机号</div>
      <div class="tip">验证短信已发送至您 <span class="stress">{{phone}}</span> 手机。</div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="checkPhoneCode">确认</button>
    </div>
  </div>
</template>

<script>
import verifycodeBtn from 'components/verifycodeBtn'
import validate from 'utils/validate'
export default {
  data () {
    return {
      phone: this.$route.query.phone,
      code: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!from.name) return false
      vm.$refs['verifycode-btn'].start()
      let seconds = vm.$refs['verifycode-btn'].seconds
      if (seconds === 60) {
        vm.sendCode()
      }
    })
  },
  computed: {
    btnDisabled () {
      return !validate.isCode(this.code)
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    async sendCode () {
      await this.$Inside.sendCode(this.phone)
    },
    async checkPhoneCode () {
      let { phone, code } = this
      try {
        await this.$Inside.checkPhoneCode({ code, phone, busiType: '1', groupId: '' })
        this.$router.replace({ name: 'bindNewPhone' })
      } catch (e) {
        this.code = ''
      }
    }
  },
  components: {
    verifycodeBtn
  }
}
</script>