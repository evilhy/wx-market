<template>
  <!-- 设置6位查询密码 -->
  <div class="public-page set-code-page">
    <div class="content-wrap">
      <div class="big-title">验证查询密码</div>
      <div class="tip">{{employeeName}}，您好！工资条首次查询密码默认为您银行卡的后6位数字。</div>
      <code-input ref="code-input" :need-check-repeat="false" v-model="code"></code-input>
      <button class="btn btn-next" :disabled="code.length !== 6" @click="sure">确认</button>
    </div>
  </div>
</template>

<script>
import codeInput from 'components/codeInput'
import helper from 'utils/helper'
export default {
  data () {
    return {
      employeeName: helper.getUserInfo('employeeName', ''),
      code: []
    }
  },
  created () {},
  methods: {
    async sure () {
      try {
        let codeStr = helper.getPasswordStr(this.code)
        await this.$Roll.checkCard(codeStr)
        this.$router.replace({ name: 'bindTel', query: { cardTail: codeStr } })
      } catch (e) {
        this.code = []
        this.$refs['code-input'].open()
      }
    }
  },
  components: {
    codeInput
  }
}
</script>