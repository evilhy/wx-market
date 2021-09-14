<template>
  <popup-page title="专项扣除" ref="submit-detail" class="submit-detail"> </popup-page>
</template>

<script>
import popupPage from '../tfinance/components/popupPage'

export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    show() {
      this.$refs['submit-detail'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>
