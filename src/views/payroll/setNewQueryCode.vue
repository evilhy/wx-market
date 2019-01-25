<template>
  <!-- 设置新的6位查询密码 -->
  <div class="public-page set-code-page">
    <div class="content-wrap">
      <div class="big-title">设置新的查询密码
        <i class="icon-ai47 iconfont" @click.stop="toggle" v-show="visible"></i>
        <i class="icon-ai44 iconfont" @click.stop="toggle" v-show="!visible"></i>
      </div>
      <div class="tip">请设置6位数字查询密码。</div>
      <code-input ref="code-input" @complete="setCode" :visible="visible"></code-input>
      <button class="btn btn-next" :disabled="!code" @click="sure">确认</button>
    </div>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import validate from 'utils/validate'
import helper from 'utils/helper'
export default {
  data () {
    return {
      code: '',
      visible: true
    }
  },
  created () {},
  methods: {
    setCode (val) {
      this.code = val
    },
    async sure () {
      if (!this.checkCode()) return false
      await this.$Inside.setPwd(this.code)
      helper.toast('查询密码设置成功')
      this.$router.replace({ name: 'home' })
    },
    checkCode () {
      if (!validate.isCode(this.code)) {
        helper.toast('查询密码必须为6位的数字')
        this.code = ''
        this.$refs['code-input'].clearCode()
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