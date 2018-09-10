<template>
  <mt-popup v-model="show" :closeOnClickModal="false" class="copy-popup" pop-transition="popup-fade">
    <div class="tip">您的浏览器不支持此复制功能，请长按进行复制</div>
    <!-- <input type="text" :value="text" class="input" autofocus/> -->
    <p class="text">{{text}}</p>
    <div class="close-btn" @click="close">确定</div>
  </mt-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    close () {
      this.$emit('close')
    }
  },
  components: {}
}
</script>
