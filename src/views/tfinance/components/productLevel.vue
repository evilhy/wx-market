<template>
  <div class="product-level-wrap">
    <swiper class="swiper-container" ref="level-swiper">
      <swiper-slide v-for="(mark, index) in markList" :key="index">
        <div class="product-info" :class="orderNum >= mark.minPeople ? 'complete': 'uncomplete'">
          <div class="top-box">
            <div class="rate-box">
              <div class="label">预期收益率</div>
              <div class="text stress">{{mark.levelRate}}%</div>
            </div>
            <div class="line"></div>
            <div class="peo-box">
              <div class="label" v-if="mark.nowMark === 1">当前档位</div>
              <div class="label" v-else>{{levelZh[currentIndex]}}</div>
              <div class="text">同事*{{mark.minPeople}}</div>
            </div>
          </div>
          <!-- todo -->
          <p class="bottom-box" v-if="orderNum >= markList[markList.length - 1].minPeople">
            已有<span class="stress">{{orderNum}}</span>位同事完成预约，收益已达最高档位<span class="stress">{{markList[markList.length - 1].levelRate}}%</span>
          </p>
          <p class="bottom-box" v-else>已有<span class="stress">{{orderNum}}</span>位同事完成预约，再邀请<span class="stress">{{orderNum >= markList[currentIndex].minPeople ? (markList[currentIndex + 1].minPeople - orderNum) : (markList[currentIndex].minPeople - orderNum)}}</span>位同事收益可提升至<span class="stress">{{orderNum >= markList[currentIndex].minPeople ? markList[currentIndex + 1].levelRate : markList[currentIndex].levelRate }}%</span></p>
        </div>
        <div class="product-tags">
          <tag :content="`产品期限${term}天`" color="green"></tag>
          <tag :content="`万元收益${mark.amt}元`" color="green"></tag>
          <tag content="仅限放薪管家用户" color="green"></tag>
        </div>
      </swiper-slide>
    </swiper>
    <div class="btn prev-btn" @click="currentIndex--" v-show="currentIndex > 0">
      <span class="arrow"></span>
    </div>
    <div class="btn next-btn" @click="currentIndex++" v-show="currentIndex < (markList.length - 1)">
      <span class="arrow"></span>
    </div>
  </div>
</template>
<script>
import tag from './tag'
export default {
  props: {
    markList: Array,
    orderNum: Number,
    term: Number
  },
  data () {
    return {
      currentIndex: 0,
      levelZh: ['第一档', '第二档', '第三档']
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
    },
    orderNum (val) {
      let index = 0
      this.markList.forEach((item, i) => {
        if (val >= item.minPeople) {
          index = i
        }
      })
      this.currentIndex = index
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