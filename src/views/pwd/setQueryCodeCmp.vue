<template>
  <!-- 设置并确认6位查询密码 -->
  <div class="content-wrap" :class="{'show': keyboardFlag}">
    <div class="big-title">{{titleArr[step]}}
      <i class="iconfont" :class="[visible ? 'icon-ai44' : 'icon-ai47']" @click.stop="toggle"></i>
    </div>
    <div class="tip">{{tipArr[step]}}</div>
    <template v-if="step === 0">
      <code-input ref="code-input" @toggle="keyboardToggle" @complete="setCode" @delete="setCode" :visible="visible"></code-input>
      <div class="small-tip">{{queryCodeTip}}</div>
      <button class="btn btn-next" :disabled="code.length !== 6" @click="checkCode">确认</button>
    </template>
    <template v-if="step === 1">
      <code-input ref="re-code-input" @toggle="keyboardToggle" @complete="setReCode" @delete="setReCode" :visible="visible"></code-input>
      <div class="small-tip">{{queryCodeTip}}</div>
      <button class="btn btn-next" :disabled="reCode.length !== 6" @click="checkReCode">确认</button>
    </template>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import validate from 'utils/validate'
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
      code: '',
      reCode: '',
      visible: false,
      keyboardFlag: false,
      queryCodeTip: sysConfig.queryCodeTip
    }
  },
  created () { },
  methods: {
    setCode (val) {
      this.code = val
    },
    setReCode (val) {
      this.reCode = val
    },
    checkCode () {
      if (!validate.isCode(this.code)) {
        helper.toast('查询密码必须为6位的数字')
        this.code = ''
      } else {
        this.step++
      }
      this.$refs['code-input'].clearCode()
    },
    checkReCode () {
      if (this.reCode !== this.code) {
        helper.toast('两次密码不一致')
        this.step = 0
        this.code = ''
        this.reCode = ''
      } else {
        this.$emit('sure', this.code)
      }
      this.$refs['re-code-input'].clearCode()
    },
    toggle () {
      this.visible = !this.visible
    },
    keyboardToggle (val) {
      this.keyboardFlag = val
    }
  },
  components: {
    codeInput
  }
}
</script>