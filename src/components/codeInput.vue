<template>
  <div class="code-input-wrap">
    <!-- 密码输入框 -->
    <van-password-input :value="dot" :focused="true" gutter="0.5em" @focus="show = true" />
    <!-- 安全密码键盘 -->
    <pwd-keyboard :show="show" type="number" :img-src="imgSrc" :hide-on-click-outside="false" @hide="show = false" @keydown="onKeydown" @delete="onDelete"></pwd-keyboard>
  </div>
</template>

<script>
import pwdKeyboard from 'components/pwdKeyboard'
export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    maxLength: {
      type: Number,
      default () {
        return 6
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      show: false,
      imgSrc: ''
    }
  },
  computed: {
    dot () {
      return '.'.repeat(this.currentValue.length)
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  },
  async mounted () {
    await this.crateNumericKeypad()
    this.open()
  },
  methods: {
    async crateNumericKeypad () {
      let res = await this.$Password.crateNumericKeypad()
      let { numberBase } = res.data
      this.imgSrc = `data:image/jpeg;base64,${numberBase}`
    },
    onKeydown (value) {
      if (this.currentValue.length === this.maxLength) return
      this.currentValue.push(value)
      if (this.currentValue.length === this.maxLength) {
        this.show = false
        this.$emit('complete')
      }
    },
    onDelete (value) {
      this.currentValue.pop()
      this.$emit('delete')
    },
    open () {
      this.show = true
    }
  },
  components: {
    pwdKeyboard
  }
}
</script>