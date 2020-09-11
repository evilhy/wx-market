<template>
  <div class="bill-detail-page" :style="billDetailPageStyle">
    <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <wage-detail-item v-for="(item, index) in wageDetailList" :key="index" :wage="item"></wage-detail-item>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom-group">
      该资金由{{wageDetailList[0].grantName || wageDetailList[0].groupName}}发放
    </div>
    <div class="personal-tax" @click="toPage">返回首页</div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'
import { swiper } from 'vue-awesome-swiper'
import wageDetailItem from 'components/wageDetailItem'
export default {
  data () {
    return {
      wageDetailList: storage.getSession('bankWageList', []),
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    billDetailPageStyle() {
      let style = {}
      if (this.wageDetailList[0].skinUrl) {
        style = {
          'background': `url(${this.wageDetailList[0].skinUrl}) no-repeat center top`,
          'background-size': '100% 100%'
        }
      }
      return style
    }
  },
  created () {
    helper.title(this.wageDetailList[0].wageName)
  },
  methods: {
    toPage() {
     // this.$router.push({name: 'taxInstructions'})
      this.$router.push({name: 'home'})
    }
  },
  components: {
    swiper,
    wageDetailItem
  }
}
</script>
