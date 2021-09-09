<template>
  <van-swipe class="banner" :autoplay="5000">
    <van-swipe-item v-for="(img, index) in imgList" :key="index" @click="clickImg(index)">
      <img v-lazy="img.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import validate from 'utils/validate'

Vue.use(ImagePreview)
export default {
  data() {
    return {
      imgList: []
    }
  },
  created() {},
  methods: {
    async getBannerList() {
      this.imgList = await this.$System.getBannerList()
    },
    clickImg(index) {
      const { link = '', url = '' } = this.imgList[index]
      if (link) {
        if (validate.isUrl(link)) {
          window.location.href = link
        }
      } else {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }
    }
  }
}
</script>
