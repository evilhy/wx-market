<template>
  <div class='no-data-wrap'>
    <img :src="require(`../assets/img/no-${this.type}.png`)" class="img cmp-class">
    <span class='text'>{{text}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {}
    }
  }
</script>
