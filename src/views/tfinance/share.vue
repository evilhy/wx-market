<template>
  <div class="get-id-page">
    <loading></loading>
  </div>
</template>

<script>
import loading from 'components/loading'
import { getPageQueryObject } from 'utils/assist'
export default {
  data () {
    return {
      query: {}
    }
  },
  computed: {},
  created () {
    this.query = getPageQueryObject()
    this.toPage()
  },
  methods: {
    async toPage () {
      let res = await this.$Tfinance.codeUrl()
      let url = res.data
      let { entId, productId, fxId } = this.query
      let stateStr = JSON.stringify({ entId, productId, fxId })
      window.location.replace(url.replace('STATE', stateStr))
    }
  },
  components: {
    loading
  }
}
</script>