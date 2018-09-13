<template>
  <div class="bill-detail-page">
    <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <wage-detail-item v-for="(item, index) in wageDetailList" :key="index" :wage="item"></wage-detail-item>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom-group">
      该资金由{{wageDetailList[0].groupName}}发放
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
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
  created () {
    helper.title(this.wageDetailList[0].wageName)
    helper.pushBaiduEvent(sysConfig.baidu_event.wageDetail)
  },
  methods: {
  },
  components: {
    wageDetailItem
  }
}
</script>
