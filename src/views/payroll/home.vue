<template>
  <div class="page home-page white" :class="{ent: entList.length > 1}">
    <!-- 企业切换栏 -->
    <div class="business-toggle" v-if="entList.length > 1">
      <div class="logo"><img src="../../assets/img/icon-home-business.png" alt=""></div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="currentEntId" :options="entList" />
      </van-dropdown-menu>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="5000">
      <van-swipe-item v-for="(img, index) in imgList" :key="index" @click="clickImg(index)">
        <img v-lazy="img.url">
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
      <wallet @to-page="toPage"></wallet>
      <!-- 主要信息入口 -->
      <div class="link-wrap">
        <div class="item" @click="enterPayroll">
          <span class="img-wrap income"></span>
          <span class="label">我的收入</span>
        </div>
        <div class="item">
          <span class="img-wrap metal" @click="toOuterPage('nobleMetalUrl')"><span class="tag-1">新品上市</span></span>
          <span class="label">贵金属投资</span>
        </div>
        <div class="item">
          <span class="img-wrap manager" @click="toPage('manager')">
            <div class="notice-count" v-if="managerInfo.hasManager === 1 && !isReadManager && !isReadManagerCurrent">1
            </div>
          </span>
          <span class="label">客户经理</span>
        </div>
        <div class="item" @click="toPage('user')">
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
        <div class="item" @click="toOuterPage('zQUrl')">
          <span class="img-wrap"><img src="../../assets/img/icon-home-invest.png" alt=""></span>
          <span class="label">证券投资</span>
        </div>
        <div class="item">
          <span class="img-wrap"><img src="../../assets/img/icon-home-news.png" alt=""></span>
          <span class="label">最新资讯</span>
        </div>
        <div class="item" @click="toBankSite">
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
    <!-- // 后期去掉 -->
    <home-manager-dialog ref="home-manager-dialog" @getIsReadManager="isReadManager = true"
      @getIsReadManagerCurrent="isReadManagerCurrent = true" :manager-info="managerInfo"></home-manager-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import wallet from 'components/wallet'
import homeManagerDialog from './homeManagerDialog'
import { ImagePreview } from 'vant'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import validate from 'utils/validate'
import Wxapi from 'utils/wxapi'
const wxapi = new Wxapi()
Vue.use(ImagePreview)
export default {
  data () {
    return {
      entList: [],
      hasWage: false,
      currentEntId: '',
      imgList: [],
      managerInfo: {},
      isReadManager: helper.getIsReadManager(),
      isReadManagerCurrent: helper.getIsReadManagerCurrent(),
      appId: sysConfig.appId[process.env.NODE_ENV]
    }
  },
  created () {
    this.getEntList()
    this.getBannerList()
    // 微店上线之后需要去掉
    this.getManagerInfo()
  },
  watch: {
    currentEntId (val) {
      helper.saveUserInfo({ entId: val })
    }
  },
  methods: {
    async getEntList () {
      let res = await this.$Inside.empEntList()
      let { entList = [], newPay = false } = res.data
      this.entList = this.transEntList(entList)
      this.hasWage = newPay
      if (this.entList.length) {
        this.currentEntId = this.entList[0].value
      }
    },
    transEntList (list = []) {
      return list.map(item => {
        let { entId, entName } = item
        return {
          value: entId,
          text: entName
        }
      })
    },
    async getBannerList () {
      this.imgList = await this.$System.getBannerList()
    },
    async getManagerInfo () {
      let res = await this.$Manager.openingTips()
      this.managerInfo = res.data
    },
    enterPayroll () {
      if (this.hasWage) { // 有工资
        if (helper.getUserInfo('ifPwd', 0)) { // 有密码
          if (helper.checkFreeLogin()) { // 近期输入过密码
            this.$router.push({ name: 'wageList' })
          } else {
            this.$router.push({ name: 'loginByPwd', query: { nextPage: 'wageList' } })
          }
        } else { // 设置查询密码
          this.$router.push({ name: 'setQueryCode' })
        }
      } else { // 无工资
        this.$router.push({ name: 'noWage' })
      }
    },
    toPage (routerName, query = {}) {
      let { hasManager } = this.managerInfo
      if (routerName === 'manager' && hasManager === 1 && !this.isReadManager && !this.isReadManagerCurrent) {
        this.$refs['home-manager-dialog'].open()
        return false
      }
      this.$router.push({ name: routerName, query: query })
    },
    toOuterPage (type) {
      let url = sysConfig[type][process.env.NODE_ENV]
      if (type === 'zQUrl') {
        url = wxapi.getWxUrl(this.appId, url)
      }
      window.location.href = url
    },
    toBankSite () {
      window.location.href = sysConfig.bankSiteUrl
    },
    clickImg (index) {
      let { link = '', url = '' } = this.imgList[index]
      if (link) {
        if (validate.isUrl(link)) {
          window.location.href = link
        }
      } else {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }
    }
  },
  components: {
    wallet,
    homeManagerDialog
  }
}
</script>