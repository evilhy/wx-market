<template>
  <div class="home-page">
    <div class="banner">
      <swiper v-if="imgList.length >= 1" class="swiper-container" :options="swiperOptions" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(img, index) in imgList" :key="index">
          <img :src="img.url" alt="" class="img">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" v-if="imgList.length >1"></div>
      </swiper>
    </div>
    <div class="links-wrap">
      <div class="my-income" @click="enterMyIncome">
        <div class="title">我的收入</div>
        <div class="recent-one" v-if="recentInfo.createDate">最近一笔:{{recentInfo.createDate | date('Y/m/d')}}</div>
      </div>
      <div class="link-right">
        <div class="hx-manager" @click="toPage('manager')">
          <div class="title">华夏管家</div>
          <span class="news-flag" v-if="hasNewMsg === '1'">新消息</span>
        </div>
        <div class="invoice-person">
          <div class="invoice-info box" @click="toPage('invoice')">
            <div class="title">发票管家</div>
          </div>
          <div class="person-info box" @click="toPage('user')">
            <div class="title"><span class="dot" v-if="bankIsNew"></span>个人信息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-logo">
      <img src="../../assets/img/hx-gray-logo.png" class="hx" />
      <div class="line"></div>
      <img src="../../assets/img/fx-gray-logo.png" class="fx" />
    </div>
    <img-viewer :img="currentImg" :flag="imgViewerFlag" @close="imgViewerFlag=false"></img-viewer>
  </div>
</template>
<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import helper from 'utils/helper'
import ImgViewer from 'components/imgViewer'
export default {
  data () {
    return {
      recentInfo: {
        entId: '',
        groupId: '',
        groupName: '',
        createDate: 0,
        isRead: ''
      },
      bankIsNew: 0, // 银行卡变更
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          click: () => {
            this.clickImg()
          }
        }
      },
      hasNewMsg: '0',
      imgViewerFlag: false,
      currentImg: {
        url: ''
      },
      imgList: [],
      requested: false
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
    this.getRecentInfo()
    this.getBannerList()
  },
  methods: {
    async getBannerList () {
      let res = await this.$System.getBannerList()
      if (res.data.length) {
        this.imgList = res.data
      } else {
        this.imgList = [{
          url: require('../../assets/img/home-banner8.png')
        }, {
          url: require('../../assets/img/home-banner6.png')
        }, {
          url: require('../../assets/img/home-banner3.png')
        }]
      }
    },
    async getRecentInfo () {
      let res = await this.$Roll.index()
      let { bean = {}, isNew = 0 } = res.data
      if (Object.keys(bean).length) {
        this.recentInfo = bean
        this.bankIsNew = isNew
        helper.saveUserInfo({ entId: this.recentInfo.entId })
      }
      this.requested = true
    },
    enterMyIncome () {
      if (!this.requested) return
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        this.$router.push({ name: 'checkQueryCode', query: { 'hasWage': this.recentInfo.groupId || '' } })
      } else {
        this.$router.push({ name: 'setQueryCode' })
      }
    },
    toPage (routerName, query = {}) {
      this.$router.push({ name: routerName, query: query })
    },
    clickImg (index) {
      this.currentImg = this.imgList[this.swiper.realIndex]
      if (this.currentImg.link) {
        window.location.href = this.currentImg.link
      } else {
        this.imgViewerFlag = true
      }
    }
  },
  components: {
    ImgViewer,
    swiper,
    swiperSlide
  }
}
</script>
