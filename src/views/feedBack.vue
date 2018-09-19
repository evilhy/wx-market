<template>
  <div class="feed-back-page">
    <section class="feed-msg">
      <h2 class="big-title">您的身份已绑定成功！</h2>
      <p class="small-title">请等待公众号推送您的资金明细！</p>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    setTimeout(() => {
      this.$router.push({ name: 'home' })
    }, 2000)
  },
  methods: {
  }
}
</script>
