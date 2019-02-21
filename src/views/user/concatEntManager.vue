<template>
  <div class="public-page concat-ent-manager-page">
    <div class="tip-wrap">
      <div class="tip-title">
        <i class="iconfont icon-tanhao"></i>手机号已更换无法通过短信登录怎么办？
      </div>
      <div class="tip-content">
        若您的手机号码已经更换无法接收短信，请联系企业管理员修改您的员工手机号。
      </div>
    </div>
    <div class="space"></div>
    <div class="manager-wrap">
      <div class="manager-title">联系管理员</div>
      <div class="manager-item" v-for="(item, index) in list" :key="index">
        <span class="name">{{item.name}}（{{item.position}}）</span>
        <a class="tel" :href="`tel:${item.phone}`">一键拨号</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      entId: this.$route.query.entId,
      list: []
    }
  },
  created () {
    this.getManagerList()
  },
  methods: {
    async getManagerList () {
      let res = await this.$Roll.entUser(this.entId)
      this.list = res.data
    }
  }
}
</script>