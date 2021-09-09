<template>
  <van-popup v-model="visible" :closeOnClickModal="false" :overlay="false" class="ewm-wrap">
    <div>
      <span class="close" @click="close">
        <i class="icon iconfont icon-Close"></i>
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
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit('close')
    }
  },
  components: {}
}
</script>
