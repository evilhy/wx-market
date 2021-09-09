<template>
  <div class="notice-bar" :class="{ 'no-new': !count }">
    <div class="notice-count" v-if="count">{{ count }}</div>
    <van-notice-bar :left-icon="require('../../assets/img/icon-home-notice.png')" :scrollable="false" color="#363C4D" v-if="list && list.length">
      <van-swipe vertical :autoplay="5000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in list" :key="`notice-${index}`" @click="toNotice(item)">{{ item.digest }}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>

<script>
import helper from 'utils/helper'

export default {
  data() {
    return {
      count: 0,
      list: []
    }
  },
  created() {},
  methods: {
    async getNotice() {
      const res = await this.$News.bulletInfo()
      const { list = [], unReadTotalCnt = 0 } = res.data
      this.list = list
      this.count = unReadTotalCnt
    },
    toNotice(item) {
      helper.saveNoticeInfo(item.newsType, 'notice')
      this.$emit('to-page', 'notice')
    }
  }
}
</script>
