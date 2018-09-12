<template>
  <div class="get-id-page">
    <div class="loading-wrap">
      <img src="../assets/img/loading.gif" alt="" class="loading-img">
      <p class="loading-text">加载中</p>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
export default {
  data () {
    return {
      query: this.$route.query
    }
  },
  computed: {},
  created () {
    helper.saveUserInfo({ openId: this.query.openId })
    this.isBind()
  },
  methods: {
    isBind () {
      this
        .$Roll
        .isBind()
        .then((res) => {
          let data = res.data
          if (data.bindStatus === '0') {
              this.$router.push({ name: 'bindIdCard' })
          } else {
            helper.saveUserInfo({ idNumber: data.idNumber })
            this.toPage()
          }
        })
    },
    toPage () {
      if (this.query.entrance === 'menu') {
        this.$router.push({ name: 'home' })
      } else {
        if (this.query.planId && this.query.groupId) {
          helper.saveUserInfo({ groupId: this.query.groupId })
          this.$router.push({ name: 'wageIndex', params: { planId: this.query.planId } })
          return
        }
        this.$router.push({ name: 'home' })
      }
    }
  },
  components: {}
}
</script>
