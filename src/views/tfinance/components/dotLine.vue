<template>
  <div class="line-wrap" :class="direction">
    <template v-if="direction === 'left'">
      <span class="line"></span>
      <span class="dot"></span>
    </template>
    <template v-else>
      <span class="dot"></span>
      <span class="line"></span>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    direction: String
  },
  data() {
    return {}
  }
}
</script>
