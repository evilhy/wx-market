<template>
  <!-- 设置6位查询密码 -->
  <div class="public-page set-code-page">
    <div class="content-wrap" :class="{'show': keyboardFlag}">
      <div class="big-title">验证查询密码
        <i class="iconfont" :class="[visible ? 'icon-ai44' : 'icon-ai47']" @click.stop="toggle"></i>
      </div>
      <div class="tip">{{employeeName}}，您好！工资条首次查询密码默认为您银行卡的后6位数字。</div>
      <code-input ref="code-input" @toggle="keyboardToggle" @complete="setCode" @delete="setCode" :visible="visible"></code-input>
      <button class="btn btn-next" :disabled="code.length !== 6" @click="sure">确认</button>
    </div>
  </div>
</template>

<script>
import publicLogo from 'components/publicLogo'
import codeInput from 'components/codeInput'
import helper from 'utils/helper'
export default {
  data () {
    return {
      employeeName: helper.getUserInfo('employeeName', ''),
      code: '',
      visible: false,
      keyboardFlag: false
    }
  },
  created () {},
  methods: {
    setCode (val) {
      this.code = val
    },
    async sure () {
      try {
        await this.$Roll.checkCard(this.code)
        this.$router.replace({ name: 'bindTel', query: { cardTail: this.code } })
      } catch (e) {
        this.code = ''
        this.$refs['code-input'].clearCode()
      }
    },
    toggle () {
      this.visible = !this.visible
    },
    keyboardToggle (val) {
      this.keyboardFlag = val
    }
  },
  components: {
    publicLogo,
    codeInput
  }
}
</script>