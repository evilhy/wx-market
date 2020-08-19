<template>
  <!-- 设置并确认6位查询密码 -->
  <div class="content-wrap">
    <div class="big-title">{{titleArr[step]}}</div>
    <div class="tip">{{tipArr[step]}}</div>
    <template v-if="step === 0">
      <code-input ref="code-input" v-model="code"></code-input>
      <div class="small-tip">{{queryCodeTip}}</div>
      <button class="btn btn-next" :disabled="code.length !== 6" @click="next">确认</button>
    </template>
    <template v-if="step === 1">
      <code-input ref="recode-input" v-model="reCode"></code-input>
      <div class="small-tip">{{queryCodeTip}}</div>
      <button class="btn btn-next" :disabled="reCode.length !== 6" @click="sure">确认</button>
    </template>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
export default {
  props: {
    titleArr: Array,
    tipArr: Array
  },
  data () {
    return {
      step: 0,
      code: [],
      reCode: [],
      queryCodeTip: sysConfig.queryCodeTip
    }
  },
  created () { },
  methods: {
    next () {
      this.step++
      this.$nextTick(() => {
        this.$refs['recode-input'].open()
      })
    },
    sure () {
      this.$emit('sure', helper.getPasswordStr(this.code), helper.getPasswordStr(this.reCode))
    },
    reset () {
      this.step = 0
      this.code = []
      this.reCode = []
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