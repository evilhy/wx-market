<template>
  <div class="public-page modify-query-code-page">
    <div class="content-wrap">
      <div class="big-title">{{titleArr[step]}}
        <i class="iconfont" :class="[visible ? 'icon-ai44' : 'icon-ai47']" @click.stop="toggle"></i>
      </div>
      <div class="tip">{{tipArr[step]}}</div>
      <template v-if="step === 0">
        <code-input ref="code-input" @complete="setCode" :visible="visible"></code-input>
        <button class="btn btn-next" :disabled="!code" @click="checkPwd">下一步</button>
      </template>
      <template v-if="step === 1">
        <code-input ref="new-code-input" @complete="setNewCode" :visible="visible"></code-input>
        <button class="btn btn-next" :disabled="!newCode" @click="checkCode">下一步</button>
      </template>
      <template v-if="step === 2">
        <code-input ref="renew-code-input" @complete="setReNewCode" :visible="visible"></code-input>
        <button class="btn btn-next" :disabled="!reNewCode" @click="setPwd">确定修改</button>
      </template>
    </div>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import helper from 'utils/helper'
import validate from 'utils/validate'
export default {
  data () {
    return {
      step: 0,
      code: '',
      newCode: '',
      reNewCode: '',
      visible: false,
      titleArr: ['修改查询密码', '设置新查询密码', '再次输入新查询密码'],
      tipArr: ['请输入原查询密码。', '请设置6位数纯数字密码。', '请设置6位数纯数字密码。']
    }
  },
  created () { },
  methods: {
    setCode (val) {
      this.code = val
    },
    setNewCode (val) {
      this.newCode = val
    },
    setReNewCode (val) {
      this.reNewCode = val
    },
    async checkPwd () {
      try {
        await this.$Roll.checkPwd(this.code)
        this.step++
        this.$refs['code-input'].clearCode()
      } catch (e) {
        this.code = ''
        this.$refs['code-input'].clearCode()
      }
    },
    checkCode () {
      if (!validate.isCode(this.newCode)) {
        helper.toast('查询密码必须为6位的数字')
        this.newCode = ''
      } else {
        this.step++
      }
      this.$refs['new-code-input'].clearCode()
    },
    async setPwd () {
      if (!this.checkReNewCode()) return false
      await this.$Inside.setPwd(this.newCode)
      helper.toast('查询密码修改成功')
      this.$router.replace({ name: 'user' })
    },
    checkReNewCode () {
      if (this.reNewCode !== this.newCode) {
        helper.toast('两次密码不一致')
        this.step = 1
        this.$refs['renew-code-input'].clearCode()
        this.newCode = ''
        this.reNewCode = ''
        return false
      }
      return true
    },
    toggle () {
      this.visible = !this.visible
    }
  },
  components: {
    codeInput
  }
}
</script>