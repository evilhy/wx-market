<template>
  <div class="send-code-page">
    <div class="logo-wrap">
      <img src="../assets/img/logo.png" alt="" class="logo" />
    </div>
    <div class="card-form-wrap">
      <p class="tip">{{userInfo.employeeName}}，您好，欢迎您使用放薪管家工资条，<br/>验证短信已发送至您{{userInfo.phoneStar}}手机</p>
      <div class="card-form">
        <input ref="code-input" class="input code-input" :class="{ 'hidden': hidden }" type="tel" maxlength="6" v-model="code" @focus="hidden=true" @blur="hidden=false" />
        <p class="code-wrap">
          <span v-for="(codeChar, index) in code" :key="index" class="code-item">{{codeChar}}</span>
        </p>
        <p class="get-code-btn">
          <span v-if="countDownInfo.seconds > 0 && countDownInfo.seconds < 60">已发送({{countDownInfo.seconds}}s)</span>
          <span v-else @click="sendCode">再次获取</span>
        </p>
      </div>
    </div>
    <div class="point">
      <i class="iconfont icon-tanhao"></i>
      <span>如以上手机号不正确<br/>请尽快联系您所在企业修改手机号</span>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
export default {
  data () {
    return {
      userInfo: helper.getUserInfo(),
      code: '',
      hidden: false,
      countDownInfo: {
        timer: null,
        seconds: 60
      }
    }
  },
  watch: {
    code (val) {
      if (val.length === 6) {
        this.$refs['code-input'].blur()
        this.bindWX()
      }
    }
  },
  created () {
    this.checkCountDownInfo()
  },
  mounted () {
  },
  methods: {
    checkCountDownInfo () {
      let now = new Date()
      let remainTime = helper.getRemainTime()
      this.countDownInfo.seconds = parseInt((remainTime + 60 * 1000 - now.getTime()) / 1000)
      if (this.countDownInfo.seconds > 0 && this.countDownInfo.seconds < 60) {
        this.countDown()
      } else {
        this.initCountDown()
      }
    },
    bindWX () {
      this
        .$Inside
        .bindWX(this.code)
        .then(() => {
          this.initCountDown()
          this.$router.replace({ name: 'feedBack' })
        })
        .catch(() => {
          this.code = ''
        })
    },
    sendCode () {
      this
        .$Inside
        .sendCode()
        .then((res) => {
          helper.saveRemainTime()
          this.countDown()
        })
    },
    countDown () {
      clearInterval(this.countDownInfo.timer)
      this.countDownInfo.timer = setInterval(() => {
        this.countDownInfo.seconds--
        if (this.countDownInfo.seconds <= 0) {
          this.initCountDown()
        }
      }, 1000)
    },
    initCountDown () {
      clearInterval(this.countDownInfo.timer)
      this.countDownInfo = {
        timer: null,
        seconds: 60
      }
      helper.removeRemainTime()
    }
  },
  components: {}
}
</script>
