<template>
  <div class="wallet-wrap">
    <div class="wallet-content">
      <div class="header">放薪钱包<van-icon v-if="type === 'outer'" name="arrow" color="white"/></div>
      <div class="main">
        <div class="col money"><span class="value">12.60</span><span class="label"><span class="text">钱包余额(元)</span><i class="icon-ai44 iconfont"></i></span></div>
        <div class="col bank-card">
          <div class="item bank">
            <span class="value">2<span class="label">张</span></span>
            <span class="label">银行卡</span>
          </div>
          <div class="item card">
            <span class="value">12<span class="label">张</span><span class="dot white"></span></span>
            <span class="label">福利卡券</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'outer'
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>