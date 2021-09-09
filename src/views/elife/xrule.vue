<template>
  <popup-page title="活动规则" ref="x-rule" class="x-rule-popup">
    <div class="content">
      <img src="../../assets/img/elife/elife-xrule-1.jpg" alt="" />
      <img src="../../assets/img/elife/elife-xrule-2.jpg" alt="" />
    </div>
  </popup-page>
</template>
<script>
import popupPage from '../tfinance/components/popupPage'

export default {
  data() {
    return {}
  },
  methods: {
    show() {
      this.$refs['x-rule'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>
