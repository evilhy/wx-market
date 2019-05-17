<template>
  <div class="t-finance-list-page">
  </div>
</template>
<script>
import helper from 'utils/helper'
export default {
  data () {
    return {
      proList: []
    }
  },
  created () {
    helper.clearShareInfo()
    helper.saveShareInfo({ channel: '0' })
    this.getProductList()
  },
  methods: {
    async getProductList () {
      let res = await this.$Tfinance.list()
      this.proList = res.data
      let { entId = '', productId = '' } = this.proList[0] ? this.proList[0] : {}
      this.$router.replace({name: 'tfinanceOrder', query: { entId, productId }})
    }
  },
  components: {
  }
}
</script>