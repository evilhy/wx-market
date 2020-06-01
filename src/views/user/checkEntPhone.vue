<template>
  <div class="public-page check-ent-phone-page">
    <div class="top">
      <div class="tip">选择您要验证的企业信息中的手机号</div>
      <div class="current-ent" @click="openAction">
        <div class="ent-name">{{currentEnt.entName}}</div>
        <div class="phone">{{currentEnt.phone || '无手机号'}}</div>
        <span class="arrow"></span>
      </div>
    </div>
    <div class="space"></div>
    <div class="bottom">
      <div class="field-wrap">
        <img class="field-icon" src="../../assets/img/public/field-code.png" />
        <input class="input" type="tel" maxlength="6" placeholder="请输入验证码" v-model.trim="code" />
        <verifycode-btn ref="verifycode-btn" :disabled="verifyBtnDisabled" :auto="false" @tap="sendCode"></verifycode-btn>
      </div>
      <button class="btn btn-next" :disabled="btnDisabled" @click="checkPhoneCode">确认</button>
    </div>
    <ent-list-action ref="ent-action" :binded-phone="bindedPhone" @select="selectEnt"></ent-list-action>
    <div class="concat-link" @click="toConcat">手机号已更换</div>
  </div>
</template>

<script>
import verifycodeBtn from 'components/verifycodeBtn'
import validate from 'utils/validate'
import entListAction from './entListAction'
import helper from 'utils/helper'
export default {
  data () {
    return {
      code: '',
      currentEnt: {
        phone: '',
        entName: '',
        entId: '',
        groupId: ''
      },
      bindedPhone: this.$route.query.phone
    }
  },
  computed: {
    verifyBtnDisabled () {
      return !validate.isPhone(this.currentEnt.phone)
    },
    btnDisabled () {
      return !validate.isCode(this.code) || this.currentEnt.phone === this.bindedPhone
    }
  },
  created () {},
  methods: {
    selectEnt (item) {
      this.currentEnt = item
    },
    async sendCode () {
      let { phone } = this.currentEnt
      if (phone === this.bindedPhone) {
        helper.toast('当前手机号与已绑定手机号相同')
        return false
      }
      this.$refs['verifycode-btn'].start()
      await this.$Inside.sendCode(phone, '0')
    },
    openAction () {
      this.$refs['ent-action'].openAction()
    },
    async checkPhoneCode () {
      let code = this.code
      let { phone } = this.currentEnt
      try {
        await this.$Inside.checkPhoneCode({ code, phone, busiType: '0' })
        this.$router.replace({ name: 'confirmModifyPhone', query: { oldPhone: this.bindedPhone, newPhone: phone } })
      } catch (e) {
        this.code = ''
      }
    },
    toConcat () {
      let entId = this.currentEnt.entId
      this.$router.push({ name: 'concatEntManager', query: { entId } })
    }
  },
  components: {
    verifycodeBtn,
    entListAction
  }
}
</script>