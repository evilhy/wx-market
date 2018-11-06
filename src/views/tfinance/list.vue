<template>
  <div class="t-finance-list-page">
    <loading></loading>
  </div>
</template>
<script>
import loading from 'components/loading'
export default {
  data () {
    return {
      proList: []
    }
  },
  created () {
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
    loading
  }
}
</script>