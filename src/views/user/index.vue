<template>
  <div class="page user-page white">
    <div class="top">
      <user-avatar></user-avatar>
      <div class="user-info">
        <span class="user-name">{{ info.name }}</span>
        <van-tag v-if="isZRL" :color="attestStatusColor" size="large">{{ info.attestStatusVal }}</van-tag>
        <img v-else class="realname" src="../../assets/img/user/tag-realname.png" alt="" />
      </div>
    </div>
    <div class="list">
      <div class="item">
        <span class="label"><img src="../../assets/img/user/icon-user-idcard.png" alt="" />证件号</span>
        <span class="value">{{ info.idNumber }}</span>
      </div>
      <div class="item" @click="toPage('selectModifyWay', { phone: info.phone })">
        <span class="label"><img src="../../assets/img/user/icon-user-phone.png" alt="" />手机号</span>
        <span class="value">{{ info.phone }}<span class="arrow"></span></span>
      </div>
      <div class="item" @click="pwdManage">
        <span class="label"><img src="../../assets/img/user/icon-user-password.png" alt="" />密码安全</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('userEnts')">
        <span class="label"><img src="../../assets/img/user/icon-user-ent.png" alt="" />任职企业</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('bankcardList')">
        <span class="label"><img src="../../assets/img/user/icon-user-bank.png" alt="" />银行卡<span class="dot red" v-if="info.isNew"></span></span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('addressList')">
        <span class="label"><img src="../../assets/img/user/icon-user-address.png" alt="" />地址管理</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('invoice')">
        <span class="label"><img src="../../assets/img/user/icon-user-invoice.png" alt="" />开票报销</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" v-if="isHxBank" @click="toPage('userTheme')">
        <span class="label"><img src="../../assets/img/user/icon-user-theme.png" alt="" />主题更换</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" v-if="info.signStatus === 1 && info.taxSignId" @click="toSignPage">
        <span class="label"><img src="../../assets/img/user/icon-user-sign.png" alt="" />签约记录</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from 'components/userAvatar'
import helper from 'utils/helper'
import storage from 'utils/storage'

export default {
  data() {
    return {
      isHxBank: helper.isHxBank(),
      isZRL: helper.isZRL(),
      info: {}
    }
  },
  computed: {
    attestStatusColor() {
      const attestStatus = this.info.attestStatus
      switch (
        attestStatus // 0：未认证、1：认证中、2：认证失败、3：认证成功
      ) {
        case 0:
          return '#A8AAB2'
        case 1:
          return '#FF9124'
        case 2:
          return '#F4415F'
        case 3:
          return '#12C465'
        default:
          return '#A8AAB2'
      }
    }
  },
  created() {
    this.getUserInfo()
    storage.removeSession('orderInfo')
  },
  methods: {
    async getUserInfo() {
      const res = await this.$Roll.emp()
      this.info = res.data
    },
    pwdManage() {
      if (helper.getUserInfo('ifPwd', 0)) {
        // 有密码
        this.toPage('pwdManage')
      } else {
        this.toPage('setQueryCode')
      }
    },
    toPage(name, query = {}) {
      this.$router.push({ name, query })
    },
    async toSignPage() {
      const res = await this.$Tax.signRecord()
      window.location.href = res.data.url
    }
  },
  components: {
    userAvatar
  }
}
</script>
