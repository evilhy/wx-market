<template>
  <div class="public-page complete-page">
    <i class="iconfont icon-success"></i>
    <p class="result-title">{{ title }}</p>
    <p class="result-tip">{{ tip }}</p>
    <button class="btn btn-reserve" @click="toHome">查看工资条</button>
  </div>
</template>

<script>
import helper from 'utils/helper'

export default {
  data() {
    return {
      bindStatus: helper.getUserInfo('bindStatus', '0'),
      title: '',
      tip: ''
    }
  },
  created() {
    this.setTitleTip()
  },
  methods: {
    setTitleTip() {
      if (this.bindStatus === '0') {
        this.title = '绑定成功'
        this.tip = '恭喜您！工资条绑定成功！可在【个人信息】中修改查询密码。'
      } else {
        this.title = '设置成功'
        this.tip = '恭喜您！查询密码设置成功！可在【个人信息】中修改查询密码'
      }
    },
    toHome() {
      helper.saveUserInfo({ bindStatus: '1', ifPwd: 1 })
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>
