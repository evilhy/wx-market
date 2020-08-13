<template>
  <div class="code-input-wrap">
    <!-- 密码输入框 -->
    <van-password-input
      :value="code"
      :mask="!visible"
      @focus="flag = true"
    />

    <!-- 数字键盘 -->
    <van-number-keyboard
      safe-area-inset-bottom
      :value="code"
      :show="flag"
      @blur="flag = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flag: false,
      code: ''
    }
  },
  watch: {
    flag (val) {
      this.$emit('toggle', val)
    }
  },
  created () {},
  mounted () {
    this.flag = true
  },
  methods: {
    onInput(key) {
      this.code = (this.code + key).slice(0, 6)
      if (this.code.length === 6) {
        this.flag = false
        this.$emit('complete', this.code)
      }
    },
    onDelete() {
      this.code = this.code.slice(0, this.code.length - 1)
    },
    clearCode () {
      this.code = ''
    }
  }
}
</script>