<template>
  <van-popup v-model:show="show" :closeOnClickModal="false" :overlay="false" class="ewm-wrap">
    <div>
      <span class="close" @click="close">
        <van-icon name="close" />
      </span>
      <img :src="ewmImg" alt="" class="ewm" />
      <p class="tip">长按识别二维码，添加客户经理微信</p>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    ewmImg: {
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
