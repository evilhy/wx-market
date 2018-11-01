<template>
  <mt-popup
      v-model="flag" position="right" class="popup-page">
        <mt-header :title="title" class="protocol-title">
          <span></span>
        </mt-header>
        <div class="content-wrap">
          <slot></slot>
        </div>
  </mt-popup>
</template>
<script>
  export default {
    props: {
      title: String
    },
    data () {
      return {
        flag: false
      }
    },
    methods: {
      show () {
        this.flag = true
      }
    }
  }
</script>