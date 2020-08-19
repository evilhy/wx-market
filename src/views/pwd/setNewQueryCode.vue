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
      titleArr: ['设置新查询密码', '再次输入新查询密码'],
      tipArr: ['请设置6位数纯数字密码。', '请设置6位数纯数字密码。']
    }
  },
  created () { },
  methods: {
    async setPwd (code) {
      await this.$Inside.setPwd(code)
      helper.toast('查询密码修改成功')
      this.$router.replace({ name: this.$route.query.backPage })
    }
  },
  components: {
    setQueryCode
  }
}
</script>