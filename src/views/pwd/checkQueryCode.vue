<template>
  <!-- 设置6位查询密码 -->
  <div class="public-page set-code-page">
    <div class="content-wrap">
      <div class="big-title">验证查询密码</div>
      <div class="tip">输入原查询密码</div>
      <code-input ref="code-input" :need-check-repeat="false" v-model="code"></code-input>
      <button class="btn btn-next" :disabled="code.length !== 6" @click="sure">下一步</button>
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
  created () { },
  methods: {
    async sure () {
      try {
        let codeStr = helper.getPasswordStr(this.code)
        await this.$Password.checkPassword(codeStr, '0')
        let { query = {}, params = {} } = this.$route
        this.$router.replace({ name: params.name, query })
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