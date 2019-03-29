<template>
  <div class="home-page">
    <div class="banner">
      <swiper v-if="imgList.length >1" class="swiper-container" :options="swiperOptions" ref="mySwiper" >
        <!-- slides -->
        <swiper-slide v-for="(img, index) in imgList" :key="index">
          <img :src="img.url" alt="" class="img" @click="viewImg(index)">
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
    <img-viewer :img-list="imgList" :index="imgViewIndex" :flag="imgViewerFlag" @close="imgViewerFlag=false"></img-viewer>
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
        }
      },
      hasNewMsg: '0',
      imgViewerFlag: false,
      imgViewIndex: 0,
      imgList: []
    }
  },
  created () {
    this.getRecentInfo()
    this.getBannerList()
  },
  methods: {
    async getBannerList() {
        let res = await this.$System.getBannerList()
        this.imgList = res.data
    },
    async getRecentInfo () {
      let res = await this.$Roll.index()
      let { bean = {}, isNew = 0 } = res.data
      if (Object.keys(bean).length) {
        this.recentInfo = bean
        this.bankIsNew = isNew
        helper.saveUserInfo({ entId: this.recentInfo.entId })
      }
    },
    enterMyIncome () {
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        this.$router.push({ name: 'checkQueryCode', query: { 'hasWage': this.recentInfo.groupId || '' } })
      } else {
        this.$router.push({ name: 'setQueryCode' })
      }
    },
    toPage (routerName, query = {}) {
      this.$router.push({ name: routerName, query: query })
    },
    viewImg (index) {
      this.imgViewIndex = index
      this.imgViewerFlag = true
    }
  },
  components: {
    ImgViewer,
    swiper,
    swiperSlide
  }
}
</script>
