<template>
  <!-- 设置新的6位查询密码 -->
  <div class="public-page set-code-page">
    <set-query-code :titleArr="titleArr" :tipArr="tipArr" @sure="setPwd"></set-query-code>
  </div>
</template>
<script>
import setQueryCode from './setQueryCodeCmp'
import helper from 'utils/helper'
export default {
  data () {
    return {
      titleArr: ['设置查询密码', '再次输入查询密码'],
      tipArr: ['为确保您工资条信息安全，请设置6位数字查询密码。', '请设置6位数字查询密码。']
    }
  },
  created () { },
  methods: {
    async setPwd (code) {
      await this.$Inside.setPwd(code)
      helper.saveUserInfo({ ifPwd: 1 })
      this.$router.replace({ name: 'complete' })
    }
  },
  components: {
    setQueryCode
  }
}
</script>