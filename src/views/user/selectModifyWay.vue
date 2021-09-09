<template>
  <div class="select-modify-way-page">
    <div class="tip">请选择一种验证方式</div>
    <div class="select-item" @click="toPage('checkOldPhone')">
      <img class="icon" src="../../assets/img/user/icon-phone-way.png" alt="" />
      <p>
        <span>验证当前手机号</span><span class="phone">{{ phone }}</span>
      </p>
    </div>
    <div class="select-item" @click="toPage('checkEntPhone')">
      <img class="icon" src="../../assets/img/user/icon-ent-way.png" alt="" />
      <p>验证企业信息中的手机号</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: this.$route.query.phone
    }
  },
  created() {},
  methods: {
    toPage(name) {
      this.$router.replace({ name, query: { phone: this.phone } })
    }
  }
}
</script>
