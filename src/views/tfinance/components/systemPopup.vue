<template>
  <div class="system-popup">
    <div class="content-wrap">
      <img class="img" src="../../../assets/img/tfinance/system-title.png" alt="" />
      <p class="title">温馨提示</p>
      <ul class="text">
        <li class="item">本产品是华夏银行的理财产品，若您是首次购买需持本人身份证及华夏银行借记卡到柜台进行理财签约方可完成购买。</li>
        <li class="item">非首次购买用户预约完成后待产品开始认购后可直接通过手机银行、网上银行进行购买。</li>
      </ul>
      <span class="close-btn" @click="close">我知道了</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
