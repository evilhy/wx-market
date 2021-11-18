<template>
  <van-popup v-model:show="flag" position="right" class="img-viewer-wrap">
    <swiper :options="swiperOption" ref="imgSwiper">
      <swiper-slide v-for="(item, index) in [img]" :key="index">
        <div class="swiper-zoom-container" @click="close">
          <img :src="item.url" />
        </div>
      </swiper-slide>
    </swiper>
  </van-popup>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: { swiper, swiperSlide },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    img: {
      type: Object
    }
  },
  data() {
    return {
      swiperOption: {
        zoom: true
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.imgSwiper.swiper
    }
  },
  watch: {
    flag(val) {
      this.swiper.zoom.scale > 1 && this.swiper.zoom.out()
    }
  },
  created() {},
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
