<template>
  <div class="select-modify-way-page">
    <div class="select-item" @click="toPage('checkOldPhone')">
      <p class="tip">验证当前手机号</p>
      <p class="stress">{{phone}}</p>
    </div>
    <div class="select-item" @click="toPage('checkEntPhone')">
      <p class="tip">验证企业信息中的手机号</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: this.$route.query.phone
    }
  },
  created () {},
  methods: {
    toPage (name) {
      this.$router.replace({ name, query: { phone: this.phone } })
    }
  }
}
</script>