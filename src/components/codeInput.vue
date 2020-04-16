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
      :value="code"
      :show="flag"
      @blur="show = false"
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