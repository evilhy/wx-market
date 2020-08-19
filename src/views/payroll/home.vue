<template>
  <div class="page home-page white">
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
    <!-- 通知栏 没有通知的时候margin-left变小-->
    <div class="notice-bar">
      <div class="notice-count">9</div>
      <van-notice-bar :left-icon="require('../../assets/img/icon-home-notice.png')" :scrollable="false" color="#363C4D">
        <van-swipe vertical :autoplay="5000" :show-indicators="false">
          <van-swipe-item>1内内容内容容内容内容内容内容内容内容内容内容内容内容内容1</van-swipe-item>
          <van-swipe-item>2内内容内容容内容内容内容内容内容内容内容内容内容内容内容12</van-swipe-item>
          <van-swipe-item>111111111111111111111111111111111111111111111111111111111111111111</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- 普通版菜单入口 -->
    <template>
      <!-- 钱包 -->
      <wallet></wallet>
      <!-- 主要信息入口 -->
      <div class="link-wrap">
        <div class="item">
          <span class="img-wrap income"></span>
          <span class="label">我的收入</span>
          <span class="dot red"></span>
        </div>
        <div class="item">
          <span class="img-wrap metal"><span class="tag-1">新品上市</span></span>
          <span class="label">贵金属投资</span>
        </div>
        <div class="item">
          <span class="img-wrap manager"></span>
          <span class="label">经理微店</span>
        </div>
        <div class="item">
          <span class="img-wrap user"></span>
          <span class="label">个人信息</span>
        </div>
      </div>
      <!-- 推荐专区 -->
      <div class="title">推荐专区</div>
      <img class="advert" src="../../assets/img/home-advert.png" alt="">
      <!-- 其他入口 -->
      <div class="link-wrap advert-link-wrap">
        <div class="item">
          <span class="img-wrap"><span class="tag-1">最多参与</span><img src="../../assets/img/icon-home-energy.png"
              alt=""></span>
          <span class="label">能量满满</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/icon-home-invest.png" alt=""></span>
          <span class="label">证券投资</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/icon-home-news.png" alt=""></span>
          <span class="label">最新资讯</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/icon-home-site.png" alt=""></span>
          <span class="label">网点查询</span>
        </div>
      </div>
      <!-- 游戏专区 -->
      <div class="title">休闲一刻</div>
      <div class="link-wrap game-link-wrap">
        <div class="item">
          <div class="img-wrap"><span class="tag-1">最受欢迎</span><img src="../../assets/img/game/game1.png" alt=""></div>
          <span class="label">欢乐竞技台球</span>
        </div>
        <div class="item">
          <div class="img-wrap"><img src="../../assets/img/game/game2.png" alt=""></div>
          <span class="label">街机欢乐捕鱼</span>
        </div>
        <div class="item">
          <div class="img-wrap"><img src="../../assets/img/game/game3.png" alt=""></div>
          <span class="label">三国大作战</span>
        </div>
        <div class="item">
          <div class="img-wrap"><img src="../../assets/img/game/game4.png" alt=""></div>
          <span class="label">糖果萌消消</span>
        </div>
      </div>
    </template>
    <!-- 振兴银行菜单入口 -->
    <template v-if="false">
      <div class="link-wrap zx-link-wrap">
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-income.png" alt=""></span>
          <span class="label">我的收入</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-bank.png" alt=""></span>
          <span class="label">银行卡</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-welfare.png" alt=""></span>
          <span class="label">员工福利</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-user.png" alt=""></span>
          <span class="label">个人信息</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-password.png" alt=""></span>
          <span class="label">密码安全</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-address.png" alt=""></span>
          <span class="label">地址管理</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-news.png" alt=""></span>
          <span class="label">最新资讯</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/zx/zx-icon-invoice.png" alt=""></span>
          <span class="label">开票报销</span>
        </div>
      </div>
    </template>
    <!-- 底部logo -->
    <div class="bottom-logo"><img src="../../assets/img/fx-gray-logo.png" alt=""></div>
  </div>
</template>

<script>
import wallet from 'components/wallet'
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
  },
  components: {
    wallet
  }
}
</script>