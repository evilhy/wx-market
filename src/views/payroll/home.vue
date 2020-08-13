<template>
  <div class="home-page">
    <!-- 企业切换栏 -->
    <div class="business-toggle">
      <div class="logo"><img src="../../assets/img/icon-home-business.png" alt=""></div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" />
      </van-dropdown-menu>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="5000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 通知栏 -->
    <van-notice-bar class="notice-bar" :left-icon="require('../../assets/img/icon-home-business.png')" :scrollable="false">
      <van-swipe vertical :autoplay="5000" :show-indicators="false">
        <van-swipe-item>1内内容内容容内容内容内容内容内容内容内容内容内容内容内容1</van-swipe-item>
        <van-swipe-item>2内内容内容容内容内容内容内容内容内容内容内容内容内容内容12</van-swipe-item>
        <van-swipe-item>111111111111111111111111111111111111111111111111111111111111111111</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0,
      option: [
        { text: '北京开科技有限公司', value: 0 },
        { text: '北京天健原来科技股二分有限公司武汉分公司北京天健原来科技股二分有限公司武汉分公司', value: 1 },
        { text: '111111111111111111111111111111111111111111111111111111111111111111', value: 2 }
      ],
      images: [
        require('../../assets/img/home-banner1.png'),
        require('../../assets/img/home-banner3.png'),
        require('../../assets/img/home-banner4.png')
      ]
    }
  },
  methods: {
  }
}
</script>