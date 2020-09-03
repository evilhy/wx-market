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
import helper from 'utils/helper'
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
    },
    needCheckRepeat: {
      type: Boolean,
      default: true
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
    },
    show (val) {
      this.toggleWrapClass(val)
    }
  },
  created () {
    this.open()
  },
  async mounted () {
    this.crateNumericKeypad()
    this.toggleWrapClass()
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
        if (this.needCheckRepeat && this.checkRepeat()) {
          this.currentValue = []
          helper.toast('请不要输入重复的数字密码')
        } else {
          this.show = false
          this.$emit('complete')
        }
      }
    },
    onDelete (value) {
      this.currentValue.pop()
      this.$emit('delete')
    },
    open () {
      this.show = true
    },
    checkRepeat () {
      let first = this.currentValue[0]
      return !!this.currentValue.every(item => item === first)
    },
    toggleWrapClass (val = true) {
      let wrap = document.querySelector('.content-wrap')
      if (wrap) {
        wrap.className = val ? 'content-wrap show' : 'content-wrap'
      }
    }
  },
  components: {
    pwdKeyboard
  }
}
</script>