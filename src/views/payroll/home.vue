<template>
  <div class="home-page">
    <div class="banner">
      <van-swipe class="swiper-container" v-if="imgList.length >= 1" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img, index) in imgList" :key="index" @click="clickImg(index)">
          <img :src="img.url" alt="" class="img">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="links-wrap">
      <div class="my-income" @click="enterMyIncome">
        <div class="title">我的收入</div>
        <div class="recent-one" v-if="recentInfo.createDate">最近一笔:{{recentInfo.createDate | date('Y/m/d')}}</div>
      </div>
      <div class="link-right">
        <div class="hx-manager" @click="toPage('manager')">
          <div class="title">客户经理</div>
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
      <span class="img-wrap" v-for="(item, index) in logoList" :key="index">
        <img :src="item.src" :class="item.className" />
      </span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import helper from 'utils/helper'
Vue.use(ImagePreview)

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
      hasNewMsg: '0',
      imgList: [],
      requested: false
    }
  },
  computed: {
    logoList () {
      let apppartner = helper.getUserInfo('apppartner')
      switch (apppartner) {
        case 'SJZHRB':
          return [{
            className: 'hr',
            src: require('../../assets/img/hr-gray-logo.png')
          }]
        default:
          return [
            {
              className: 'fx',
              src: require('../../assets/img/fx-gray-logo.png')
            }
          ]
      }

    }
  },
  created () {
    this.getRecentInfo()
    this.getBannerList()
  },
  methods: {
    async getBannerList () {
      this.imgList = await this.$System.getBannerList()
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
      let { link = '', url = '' } = this.imgList[index]
      if (link) {
        window.location.href = link
      } else {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }
    }
  }
}
</script>
