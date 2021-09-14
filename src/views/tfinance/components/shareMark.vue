<template>
  <div class="share-mark mask">
    <img class="img" src="../../../assets/img/tfinance/share-tfinance-guide.png" alt="" @click="close" />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
