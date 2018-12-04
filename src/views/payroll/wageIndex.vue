<template>
  <div class="bill-index-page">
    <!-- <manager-avator></manager-avator> -->
    <div class="bill-index-main">
      <div class="fx-logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <swiper class="bill-info" :options="swiperOption">
        <wage-index-item v-for="(item, index) in bankWageList" :key="index" :wage="item" @to-detail="toDetail"></wage-index-item>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="action-wrap">
        <!-- <div class="action" @click="toPage('trend')">
          <i class="iconfont icon-chakanzoushi"></i>查看走势</div> -->
        <div class="action" @click="toDetail">
          <i class="iconfont icon-chakanxiangqing"></i>
          <p>查看详情</p></div>
      </div>
    </div>
    <div class="bottom">
      <div class="return" @click="toPage('home')">首页</div>
      <div class="return" @click="toPage('wageList')">我的收入</div>
    </div>
  </div>
</template>

<script>
import { swiper } from 'vue-awesome-swiper'
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
    this.isRead()
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
    isRead () {
      this
        .$Inside
        .read(this.wageSheetId)
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
    swiper,
    managerAvator,
    wageIndexItem
  }
}
</script>
