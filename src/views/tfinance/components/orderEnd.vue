<template>
  <div class="order-end-wrap" :class="{'next-img-wrap': nextImageUrl}">
    <img class="next-img" v-if="nextImageUrl" :src="nextImageUrl" alt="">
    <template v-else>
      <img class="img" :src="defaultEndImg" alt="">
      <p class="tip-l"> 很抱歉，该活动已结束！</p>
      <p class="tip-s">下次记得提早参加哦~</p>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    nextImageUrl: String
  },
  data () {
    return {
      defaultEndImg: require('../../../assets/img/tfinance/order-end.png')
    }
  },
  computed: {
  }
}
</script>

