<template>
  <div class="phone-empty-page">
    <div class="message-box">
      <p class="tip-error">
        <i class="iconfont icon-fankui"></i>无法进行身份验证!</p>
      <p class="normal">由于您尚未向所在企业提供手机号<br />请尽快联系企业职能部门补全手机号</p>
    </div>
    <button @click="exit" class="btn-green">好，我知道了</button>
  </div>
</template>

<script type="text/ecmascript-6">
import helper from 'utils/helper'
let $scope = {
  index: 1,
  goods_list: [],
  cardId: ''
}

export default {
  data () {
    return $scope
  },
  mounted () {
    document.title = '身份验证'
  },
  methods: {
    exit () {
      helper.exit()
    }
  }
}
</script>
