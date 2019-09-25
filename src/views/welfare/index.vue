<template>
  <div class="welfare-index">
    <div class="goods-desc">礼品任选x1</div>
    <div class="main">
      <img class="img1" src="../../assets/img/welfare/activity-s1.png" alt="">
      <div class="wish">今天是你的生日，公司全体同事祝愿你，在生活中，充满乐趣，充满快乐；在工作中，充满动力，充满激情。</div>
      <img class="img2" src="../../assets/img/welfare/activity-s2.png" alt="">
      <div class="btn active" @click="toPage('welfareGoodsList')">兑换礼品</div>
      <!--    <div class="btn active-no">已兑换</div>
          <div class="btn active-no">活动已结束</div>-->
      <div class="record" @click="toPage('welfareExchange')">兑换记录<span class="arrow"></span></div>
      <div></div>
    </div>
    <div class="footer">
      本福利由
      <div class="company">{{entNameShort}}</div>
      提供
    </div>
  </div>
</template>
z
<script>
  export default {
    name: 'index',
    computed: {
      entNameShort() {
        return this.entName.length > 16 ? `${this.entName.substring(0, 15)}...` : this.entName
      }
    },
    data() {
      return {
        entName: '北京开科唯识技术有限公司'
      }
    },
    methods: {
      toPage(routerName) {
        this.$router.push({ name: routerName })
      }
    }
  }
</script>

<style scoped>

</style>
