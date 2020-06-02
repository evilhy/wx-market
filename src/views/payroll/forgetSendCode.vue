<template>
  <div class="public-page send-code-page">
    <div class="content-wrap">
      <div class="big-title">输入验证码</div>
      <div class="tip">{{userInfo.name}}，您好！请完成 <span class="stress">{{userInfo.phone}}</span> 手机号短信验证。</div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="checkPhoneCode">确认</button>
      <p class="change-phone-btn stress" @click="toPage('selectModifyWay', { phone: userInfo.phone })">修改手机号</p>
    </div>
  </div>
</template>

<script>
import verifycodeBtn from 'components/verifycodeBtn'
import validate from 'utils/validate'
export default {
  data () {
    return {
      userInfo: {},
      code: ''
    }
  },
  computed: {
    btnDisabled () {
      return !validate.isCode(this.code)
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
  },
  methods: {
    async getUserInfo () {
      let res = await this.$Roll.emp()
      this.userInfo = res.data
    },
    async sendCode () {
      await this.$Inside.sendCode(this.userInfo.phone)
    },
    async checkPhoneCode () {
      let { userInfo, code } = this
      try {
        await this.$Inside.checkPhoneCode({ code, phone: userInfo.phone, busiType: '1', groupId: '' })
        this.$router.replace({ name: 'setNewQueryCode' })
      } catch (e) {
        this.code = ''
      }
    },
    toPage (name, query = {}) {
      this.$router.push({ name, query })
    }
  },
  components: {
    verifycodeBtn
  }
}
</script>