<template>
  <div class="user-page">
    <div class="top">
      <user-avatar></user-avatar>
      <span class="user-name">{{info.name}}</span>
      <span class="authentication yes">已实名认证</span>
    <!--  <span class="authentication no">未实名认证</span>-->
    </div>
    <div class="list">
      <div class="item">
        <span class="label"><i class="iconfont icon-shenfenzheng"></i>身份证</span>
        <span class="value">{{info.idNumber}}</span>
      </div>
      <div class="item" @click="toPage('selectModifyWay', { phone: info.phone })">
        <span class="label"><i class="iconfont icon-shoujihao"></i>手机号</span>
        <span class="value">{{info.phone}}<span class="arrow"></span></span>
      </div>
      <div class="item" @click="checkQueryCode">
        <span class="label"><i class="iconfont icon-chaxunmima"></i>查询密码</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('userEnts')">
        <span class="label"><i class="iconfont icon-renzhiqiye"></i>任职企业</span>
        <span class="value"><span class="arrow"></span></span>
      </div>
      <div class="item" @click="toPage('bankcardList')">
        <span class="label"><i class="iconfont icon-yinhangqia"></i>银行卡<span class="dot" v-if="info.isNew"></span></span>
        <span class="value"><span class="arrow"></span></span>
      </div>
       <div class="item" @click="toPage('addressList')">
        <span class="label"><i class="iconfont icon-dizhiguanli"></i>地址管理</span>
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
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.getUserInfo()
    storage.removeSession('orderInfo')
  },
  methods: {
    async getUserInfo () {
      let res = await this.$Roll.emp()
      this.info = res.data
    },
    checkQueryCode () {
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        this.toPage('modifyQueryCode')
      } else {
        this.toPage('setQueryCode')
      }
    },
    toPage (name, query = {}) {
      this.$router.push({ name, query })
    }
  },
  components: {
    userAvatar
  }
}
</script>
