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
export default {
  data () {
    return {
    }
  },
  mounted () {
    document.title = '身份验证'
  },
  methods: {
    toBindIdCard () {
      this.$router.replace({ name: 'bindIdCard' })
    }
  }
}
</script>
