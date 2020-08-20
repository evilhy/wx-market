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
      titleArr: ['输入新查询密码', '再输入一次'],
      tipArr: ['请设置6位数纯数字密码。', '请设置6位数纯数字密码。']
    }
  },
  created () { },
  methods: {
    async savePassword (code, reCode) {
      try {
        await this.$Password.savePassword(code, reCode, '0')
        // 清除近期登录过的密码
        helper.clearFreePassword('0')
        helper.toast('修改成功')
        this.$router.replace({ name: this.$route.query.backPage })
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