<template>
  <!-- 设置新的6位查询密码 -->
  <div class="public-page set-code-page">
    <set-query-code ref="set-query-code" :titleArr="titleArr" :tipArr="tipArr" @sure="savePassword"></set-query-code>
  </div>
</template>
<script>
import setQueryCode from './setQueryCodeCmp'
import helper from 'utils/helper'
export default {
  data () {
    return {
      titleArr: ['设置查询密码', '再设置一次'],
      tipArr: ['为确保您工资条信息安全，请设置6位数字查询密码。', '请设置6位数字查询密码。']
    }
  },
  created () { },
  methods: {
    async savePassword (code, reCode) {
      try {
        await this.$Password.savePassword(code, reCode, '0')
        helper.saveUserInfo({ ifPwd: 1 })
        this.$router.replace({ name: 'complete' })
      } catch (e) {
        this.$refs['set-query-code'].reset()
      }
    }
  },
  components: {
    setQueryCode
  }
}
</script>