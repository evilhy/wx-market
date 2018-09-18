<template>
  <div class="bill-index-page">
    <!-- <manager-avator></manager-avator> -->
    <div class="bill-index-main">
      <div class="fx-logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <swiper class="bill-info" :options="swiperOption">
        <wage-index-item v-for="(item, index) in bankWageList" :key="index" :wage="item" @to-detail="toDetail"></wage-index-item>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="action-wrap">
        <!-- <div class="action" @click="toPage('trend')">
          <i class="iconfont icon-chakanzoushi"></i>查看走势</div> -->
        <div class="action" @click="toDetail">
          <i class="iconfont icon-chakanxiangqing"></i>查看详情</div>
      </div>
    </div>
    <div class="bottom">
      <span class="return" @click="toPage('wageList')">返回列表</span>
    </div>
  </div>
</template>

<script>
import managerAvator from 'components/managerAvator'
import wageIndexItem from 'components/wageIndexItem'
import storage from 'utils/storage'
import helper from 'utils/helper'
export default {
  data () {
    return {
      wageSheetId: this.$route.params.wageSheetId,
      bankWageList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {},
  created () {
    this.getWageDetail()
  },
  mounted () { },
  methods: {
    getWageDetail () {
      this
        .$Roll
        .wageDetail(this.wageSheetId)
        .then((res) => {
          this.bankWageList = res.data
          helper.title(this.bankWageList[0].wageName)
        })
    },
    toDetail () {
      storage.setSession('bankWageList', this.bankWageList)
      this.$router.push({ name: 'wageDetail' })
    },
    toPage (routeName = '', query = {}) {
      this.$router.push({ name: routeName, query: query })
    }
  },
  components: {
    managerAvator,
    wageIndexItem
  }
}
</script>
