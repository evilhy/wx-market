<template>
  <div class="bill-detail-page" :style="billDetailPageStyle">
    <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <wage-detail-item :ref="item.wageDetailId" v-for="(item, index) in wageDetailList" :key="index" :wage="item" @sign="toSign"></wage-detail-item>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom-group">该资金由{{ wageDetailList[0].wageShowDTO.grantName || wageDetailList[0].groupName }}发放</div>
    <div class="year-bill-entry" v-if="yearBillOpen" @click="toPage('yearBill')"><img src="../../assets/img/yearBill/year-bill-entry.gif" alt="" /></div>
    <div class="personal-tax" v-else @click="toPage('home')">返回首页</div>
    <signature ref="signature" theme="#00CCCC" :cut="true" :viewport-width="640" @finish="finfishSign"></signature>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'
import { swiper } from 'vue-awesome-swiper'
import signature from 'components/signature'
import wageDetailItem from './wageDetailItem'

export default {
  data() {
    return {
      wageSheetId: this.$route.params.wageSheetId,
      wageDetailList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      yearBillOpen: helper.checkYearBillOpen(),
      index: -1,
      wageDetailId: ''
    }
  },
  computed: {
    billDetailPageStyle() {
      let style = {}
      if (this.wageDetailList[0].skinUrl) {
        style = {
          background: `url(${this.wageDetailList[0].skinUrl}) no-repeat center top`,
          'background-size': '100% 100%'
        }
      }
      return style
    }
  },
  created() {
    this.wageDetailList = storage.getSession('bankWageList', [])
    helper.title(this.wageDetailList[0].wageName)
  },
  methods: {
    toSign(wageDetailId) {
      this.wageDetailId = wageDetailId
      this.$refs.signature.open()
    },
    async finfishSign(base64) {
      await this.$Roll.saveSigned(this.wageSheetId, this.wageDetailId, base64)
      await this.$Inside.receipt(this.wageDetailId, 0)
      this.$refs[`${this.wageDetailId}`][0].confirmSign(base64)
    },
    toPage(name = '') {
      this.$router.push({ name })
    }
  },
  components: {
    swiper,
    wageDetailItem,
    signature
  }
}
</script>
