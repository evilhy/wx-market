<template>
  <van-popup v-model:show="show" :closeOnClickModal="false" class="copy-popup" :overlay="false">
    <div class="tip">您的浏览器不支持此复制功能，请长按进行复制</div>
    <!-- <input type="text" :value="text" class="input" autofocus/> -->
    <p class="text">{{ text }}</p>
    <div class="close-btn" @click="close">确定</div>
  </van-popup>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    open () {
      this.show = true
    },
    close() {
      this.show = false
    }
  },
  components: {}
}
</script>
