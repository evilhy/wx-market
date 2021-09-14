<template>
  <div class="product-tag" :class="color">
    {{ content }}
  </div>
</template>
<script>
export default {
  props: {
    content: String,
    color: String
  },
  data() {
    return {}
  }
}
</script>
