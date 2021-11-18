<template>
  <van-swipe class="banner" :autoplay="5000">
    <van-swipe-item v-for="(img, index) in imgList" :key="index"
      @click="clickImg(index)">
      <img v-lazy="img.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import validate from 'utils/validate'
import { ImagePreview } from 'vant'
export default {
  components: { [ImagePreview.Component.name]: ImagePreview.Component },
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
