<template>
  <div class="public-page confirm-modify-phone-page">
    <div class="tip">手机号验证成功！是否确认用新手机号替换旧手机号？</div>
    <div class="phone-item old">{{ oldPhone }}<img class="tag" src="../../assets/img/user/tag-old.png" alt="" /></div>
    <i class="iconfont icon-jiantouxia"></i>
    <div class="phone-item new">{{ newPhone }}<img class="tag" src="../../assets/img/user/tag-new.png" alt="" /></div>
    <button class="btn btn-next" @click="confirm">确认</button>
  </div>
</template>

<script>
import helper from 'utils/helper'

export default {
  data() {
    return {
      oldPhone: '',
      newPhone: ''
    }
  },
  created() {
    this.getPhones()
  },
  methods: {
    getPhones() {
      const { oldPhone, newPhone } = this.$route.query
      this.oldPhone = oldPhone
      this.newPhone = newPhone
    },
    async confirm() {
      await this.$Inside.updPhone({ phone: this.newPhone })
      helper.toast('手机号更换成功')
      this.$router.replace({ name: 'user' })
    }
  }
}
</script>
