<template>
  <div class="product-level-wrap">
    <swiper class="swiper-container" ref="level-swiper">
      <swiper-slide v-for="(product, index) in productList" :key="index">
        <div class="product-info complete">
          <div class="top-box">
            <div class="rate-box">
              <div class="label">预期收益率</div>
              <div class="text stress">5.18%</div>
            </div>
            <div class="line"></div>
            <div class="peo-box">
              <div class="label">当前收益</div>
              <div class="text">同事*{{product}}</div>
            </div>
          </div>
          <p class="bottom-box">再邀请 <span class="stress">1</span> 位同事收益可提升至 <span class="stress">5.18%</span></p>
        </div>
        <div class="product-tags">
          <tag content="产品期限190天" color="green"></tag>
          <tag content="每万元收益200.00元" color="green"></tag>
          <tag content="仅限放薪管家用户" color="green"></tag>
        </div>
      </swiper-slide>
    </swiper>
    <div class="btn prev-btn" @click="currentIndex--" v-show="currentIndex > 0">
      <span class="arrow"></span>
    </div>
    <div class="btn next-btn" @click="currentIndex++" v-show="currentIndex < (productList.length - 1)">
      <span class="arrow"></span>
    </div>
  </div>
</template>
<script>
import tag from './tag'
export default {
  data () {
    return {
      productList: ['1', '2'],
      currentIndex: 0
    }
  },
  computed: {
    swiper () {
      return this.$refs['level-swiper'].swiper
    }
  },
  watch: {
    currentIndex (val) {
      this.swiper.slideTo(val)
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    tag
  }
}
</script>