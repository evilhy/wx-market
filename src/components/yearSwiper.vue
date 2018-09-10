<template>
  <div class="year-swiper">
    <swiper class="swiper-container" :options="options" ref="mySwiper" @slideChangeTransitionEnd="end">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in years" :key="index">
        <div class="item-bg">
          <div class="span-bg">
            <span class="span">{{item}}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    years: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          slidesPerView: 5,
          slidesPerGroup: 1,
          slideToClickedSlide: true,
          centeredSlides: true
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    end () {
      this.$emit('transitionEnd')
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>


