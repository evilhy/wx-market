<template>
  <div class="elife-xlogin-page">
    <div class="scroll-wrap">
      <div class="input-form">
      <div class="input-wrap" :class="{'disabled': idNumberDisabled}">
        <img src="../../assets/img/elife/elife-xid.png" alt="" class="icon">
        <!-- <input v-if="idNumberDisabled" :value="star(idNumber)" type="text" disabled placeholder="请输入身份证号" class="input" maxlength="18"> -->
        <input v-model.trim="idNumber" type="text" :disabled="idNumberDisabled" placeholder="请输入身份证号" class="input" maxlength="18">
      </div>
      <div class="input-wrap">
        <img src="../../assets/img/elife/elife-xphone.png" alt="" class="icon">
        <input v-model.trim="phone" type="tel" placeholder="请输入手机号" class="input" maxlength="11">
      </div>
      <div class="input-wrap half">
        <input v-model.trim="code" type="tel" placeholder="请输入验证码" class="input" maxlength="6">
        <vcode-btn @tap="sendCode" :disabled="!validate.isPhone(phone)" class="btn"></vcode-btn>
      </div>
    </div>
    <div class="join-btn btn" @click="joinActivity">参与活动</div>
    <div class="tip-wrap">
      <div class="title-wrap"><span class="line"></span><span class="title">温馨提示</span><span class="line"></span></div>
      <ul class="tip-content">
        <li class="tip-item">本次活动仅针对华夏银行持卡客户，他行卡资产不在本统计规则内。</li>
        <li class="tip-item">本次活动最终解释权归华夏银行股份有限公司所有。</li>
      </ul>
    </div>
    </div>
    <img src="../../assets/img/elife/elife-xrule-btn.png" class="rule-btn" @click="openRule"/>
    <xrule ref="xrule"></xrule>
  </div>
</template>
<script>
import elife from 'mixins/elife'
import helper from 'utils/helper'
import filter from 'utils/filter'
import validate from 'utils/validate'
import vcodeBtn from 'components/vcodeBtn'
import xrule from './xrule'
export default {
  mixins: [elife],
  data () {
    return {
      idNumber: '',
      phone: '',
      code: '',
      idNumberDisabled: false,
      codeInfo: {
        codeId: '',
        code: ''
      },
      validate: validate,
      star: filter.star
    }
  },
  created () {
    helper.title('薪有所属 畅享福利')
    this.getQueryParams()
  },
  methods: {
    getQueryParams () {
      let { idNumber, phone } = this.$route.query
      if (idNumber && phone) {
        this.idNumberDisabled = true
        this.idNumber = idNumber
        this.phone = phone
      }
    },
    async joinActivity () {
      if (!this.checkInfo()) return
      let res = await this.$Elife.xjoin(this.idNumber, this.phone, this.code, this.codeInfo.codeId)
      this.postElifeX(res.data, false)
    },
    async sendCode () {
      helper.toast('验证码已发送，请注意查收')
      let res = await this.$Inside.sendCode(this.phone)
      this.codeInfo = res.data
    },
    checkInfo () {
      if (!validate.isIdCard(this.idNumber)) {
        helper.toast('请输入正确的身份证')
        return false
      }
      if (!validate.isPhone(this.phone)) {
        helper.toast('请输入正确的手机号')
        return false
      }
      if (!this.code || this.code !== this.codeInfo.code) {
        helper.toast('请输入正确的验证码')
        return false
      }
      return true
    },
    openRule () {
      this.$refs['xrule'].show()
    }
  },
  components: {
    vcodeBtn,
    xrule
  }
}
</script>