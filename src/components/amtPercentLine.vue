<template>
  <div class="percent-line-wrap">
    <div class="item" :style="`width: ${realAmtPercent}`"></div>
    <div class="item" :style="`width: ${subAmtPercent}`"></div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [String, Number],
      default: ''
    },
    sub: {
      type: [String, Number],
      default: ''
    },
    real: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    realAmtPercent () {
      return (this.real / this.total) * 100 + '%'
    },
    subAmtPercent () {
      return (this.sub / this.total) * 100 + '%'
    }
  }
}
</script>
