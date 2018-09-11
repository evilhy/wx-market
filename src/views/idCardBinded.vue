<template>
  <div class="card-binded-page">
    <div class="message-box">
      <p class="tip-error">
        <i class="iconfont icon-Close"></i>绑定失败！</p>
      <p class="normal">该身份证已被使用！</p>
    </div>
    <button @click="toBindIdCard" class="btn-green">好，我知道了</button>
  </div>
</template>

<script>
import helper from 'utils/helper'
export default {
  data () {
    return {
    }
  },
  created () {
    helper.title('身份验证')
  },
  mounted () {
  },
  methods: {
    toBindIdCard () {
      this.$router.replace({ name: 'bindIdCard' })
    }
  }
}
</script>
