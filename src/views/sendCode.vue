<template>
  <div class="send-code-page">
    <div class="logo-wrap">
      <img src="../assets/img/logo.png" alt="" class="logo" />
    </div>
    <p class="tip">{{employeeInfo.employee_name}}{{employeeInfo.sex}}女士，欢迎您使用放薪管家<br/>已发送验证码至手机号{{employeeInfo.phone_star}}</p>
    <div class="card-form">
      <input ref="code-input" class="input code-input" :class="{ 'hidden': hidden }" type="tel" maxlength="6" v-model="verifyCode" @focus="hidden=true" @blur="hidden=false" />
      <p class="code-wrap">
        <span v-for="(code, index) in verifyCode" :key="index" class="code-item">{{code}}</span>
      </p>
      <p class="get-code-btn" :class="{'disabled': btnDisabled}">
        <span v-show="btnDisabled">再次获取,{{remainTime}}s</span>
        <span v-show="!btnDisabled" @click="getCode">再次获取</span>
      </p>
    </div>
    <div class="point">
      <i class="iconfont icon-tanhao"></i>
      <span>如以上手机号不正确<br/>请尽快联系您所在企业修改手机号</span>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'
export default {
  data () {
    return {
      employeeInfo: storage.getSession('employeeInfo', {}),
      verifyCode: '',
      codeId: '',
      responseDate: '',
      hidden: false,
      timer: null,
      remainTime: storage.getSession('remainTime', 60),
      btnDisabled: true
    }
  },
  computed: {},
  watch: {
    verifyCode (val) {
      if (val.length === 6) {
        this.$refs['code-input'].blur()
        let params = {
          open_id: storage.getSession('ID', {}).open_id,
          id_number: this.employeeInfo.id_number,
          phone: this.employeeInfo.phone,
          code: this.verifyCode,
          id_number_hash: this.employeeInfo.id_number_hash,
          phone_star: this.employeeInfo.phone_star,
          response_date: this.responseDate,
          code_id: this.codeId
        }
        this.codeId && this.Http.connect(false).post('entUser100702.json', params).then((data) => {
          if (data.ret_code === '0000') {
            storage.removeSession('remainTime')
            this.$router.replace({ name: 'feedBack' })
          } else {
            this.verifyCode = ''
          }
        })
      }
    }
  },
  created () {
    if (!storage.getSession('remainTime', 0)) {
      storage.setSession('remainTime', 60)
      this.getCode()
    }
    this.countdown()
  },
  mounted () {
  },
  methods: {
    getCode () {
      this.Http
        .connect(false)
        .post('pubMsg100302.json', { mobile: this.employeeInfo.phone, busi_type: '0' })
        .then((data) => {
          if (data.ret_code === '0000') {
            this.codeId = data.code_id
            this.responseDate = data.response_date
          }
          if (data.ret_code === '9999') {
            helper.toast('60秒内同一手机号只发送一次验证码')
          }
        })
    },
    countdown () {
      this.timer = setInterval(() => {
        this.remainTime--
        storage.setSession('remainTime', this.remainTime)
        if (!this.remainTime) {
          this.btnDisabled = false
          clearInterval(this.timer)
          this.remainTime = 60
          storage.removeSession('remainTime')
        }
      }, 1000)
    }
  },
  components: {}
}
</script>
