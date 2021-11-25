<template>
  <!-- 设置并确认6位查询密码 -->
  <div class="content-wrap">
    <div class="big-title">{{ titleArr[step] }}</div>
    <div class="tip">{{ tipArr[step] }}</div>
    <code-input ref="code-input" v-model="code"></code-input>
    <div class="small-tip">{{ queryCodeTip }}</div>
    <button class="btn btn-next" @click="sure">确认</button>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import { deepCopy } from 'utils/assist.js'

export default {
  props: {
    titleArr: Array,
    tipArr: Array
  },
  emits: ['sure'],
  data() {
    return {
      step: 0,
      code: [],
      firstCode: [],
      reCode: [],
      queryCodeTip: sysConfig.queryCodeTip
    }
  },
  created() {},
  methods: {
    sure() {
      if (this.step === 0) {
        this.firstCode = deepCopy(this.code)
        this.step = 1
        this.code = []
        this.$nextTick(() => {
          this.$refs['code-input'].open()
        })
      } else {
        this.reCode = deepCopy(this.code)
        this.$emit('sure', helper.getPasswordStr(this.firstCode), helper.getPasswordStr(this.reCode))
        this.init()
      }
    },
    init() {
      this.step = 0
      this.code = []
      this.firstCode = []
      this.reCode = []
    },
    reset() {
      this.init()
      this.$nextTick(() => {
        this.$refs['code-input'].open()
      })
    }
  },
  components: {
    codeInput
  }
}
</script>
