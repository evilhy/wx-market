<template>
  <div class="home-page">
    <div class="banner">
      <swiper class="swiper-container" :options="swiperOptions">
        <!-- slides -->
        <swiper-slide v-for="(img, index) in imgList" :key="index">
          <img :src="img" alt="" class="img" @click="viewImg(index)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="links-wrap">
      <div class="my-income" @click="enterWageList">
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
          <div class="person-info box" @click="toPage('personal')">
            <div class="title">个人信息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-logo">
      <img src="../../assets/img/hx-gray-logo.png" class="hx"/>
      <div class="line"></div>
      <img src="../../assets/img/fx-gray-logo.png" class="fx"/>
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
      imgList: [require('../../assets/img/home-banner4.png'), require('../../assets/img/home-banner3.png')]
    }
  },
  created () {
    this.getRecentInfo()
  },
  mounted () {
  },
  methods: {
    getRecentInfo () {
      this
        .$Roll
        .index()
        .then((res) => {
          if (Object.keys(res.data.bean).length) {
            this.recentInfo = res.data.bean
            helper.saveUserInfo({ entId: this.recentInfo.entId })
          }
        })
    },
    enterWageList () {
      let routeName = this.recentInfo.groupId ? 'wageList' : 'noWage'
      this.$router.push({ name: routeName })
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
