<template>
  <div class="fixed-container">
    <!-- 企业切换栏 修复样式bug-->
    <home-ent-list v-if="entList.length > 1" v-model="currentEntId" :ent-list="entList" @change="getDataByEnt"> </home-ent-list>
    <div class="page home-page white" :class="{ ent: entList.length > 1 }">
      <!-- 轮播图 -->
      <home-banner ref="banner"></home-banner>
      <!-- 通知栏 -->
      <home-notice v-if="isHxBank" ref="notice" @to-page="toPage"></home-notice>
      <!-- 普通版菜单入口 -->
      <template v-if="isHxBank">
        <!-- 钱包 -->
        <wallet ref="wallet"></wallet>
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
              <div class="notice-count" v-if="managerInfo.hasManager === 1 && !isReadManager && !isReadManagerCurrent">1</div>
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
        <img class="advert" src="../../assets/img/home-advert.png" alt="" />
        <!-- 其他入口 -->
        <div class="link-wrap advert-link-wrap">
          <div class="item" @click="$refs['fxgj-mini-program-popup'].open()">
            <span class="img-wrap"><span class="tag-1">最多参与</span><img src="../../assets/img/icon-home-energy.png" alt="" /></span>
            <span class="label">能量满满</span>
          </div>
          <div class="item" @click="toOuterPage('zQUrl')">
            <span class="img-wrap"><img src="../../assets/img/icon-home-invest.png" alt="" /></span>
            <span class="label">证券投资</span>
          </div>
          <div class="item" @click="toNews">
            <span class="img-wrap"><img src="../../assets/img/icon-home-news.png" alt="" /></span>
            <span class="label">最新资讯</span>
          </div>
          <div class="item" @click="toBankSite">
            <span class="img-wrap"><img src="../../assets/img/icon-home-site.png" alt="" /></span>
            <span class="label">网点查询</span>
          </div>
        </div>
        <!-- 游戏专区 -->
        <home-game-link></home-game-link>
      </template>
      <!-- 振兴银行、宁夏银行菜单入口 -->
      <home-zx-menu ref="zx-menu" v-else @enter-payroll="enterPayroll" @to-news="toNews"></home-zx-menu>
      <!-- 底部logo -->
      <div class="bottom-logo" :class="{ 'other-bank-logo': !isHxBank }"><img :class="logo.className" :src="logo.src" alt="" /></div>
      <!-- // 后期去掉 -->
      <home-manager-dialog ref="home-manager-dialog" @getIsReadManager="isReadManager = true" @getIsReadManagerCurrent="isReadManagerCurrent = true" :manager-info="managerInfo"></home-manager-dialog>
      <fxgj-mini-program-popup ref="fxgj-mini-program-popup"> </fxgj-mini-program-popup>
      <template v-if="yearBillOpen">
        <div class="year-bill-entry" @click="$router.push({ name: 'yearBill' })">
          <img src="../../assets/img/yearBill/year-bill-entry.gif" alt="" />
        </div>
        <year-bill-popup></year-bill-popup>
      </template>
    </div>
  </div>
</template>

<script>
import fxgjMiniProgramPopup from 'components/fxgjMiniProgramPopup'
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
import sysConfig from 'utils/constant'
import url from 'utils/url'
import collect from 'utils/collect'
import homeEntList from './homeEntList'
import wallet from '../wallet/wallet'
import homeBanner from './homeBanner'
import homeNotice from './homeNotice'
import homeGameLink from './homeGameLink'
import homeZxMenu from './homeZxMenu'
import homeManagerDialog from './homeManagerDialog'
import yearBillPopup from '../yearBill/yearBillPopup'
/* import Wxapi from 'utils/wxapi'
const wxapi = new Wxapi() */
export default {
  data() {
    return {
      show: true,
      entList: [],
      currentEntId: '',
      managerInfo: {
        ownBank: 0, // 0他行卡，1是本行卡
        hasManager: 0, // 0没有客户经理，1有客户经理
        empName: '',
        managerName: '',
        branchName: '',
        officer: '',
        managerPhone: ''
      },
      isReadManager: helper.getIsReadManager(),
      isReadManagerCurrent: helper.getIsReadManagerCurrent(),
      appId: sysConfig.appId[process.env.VUE_APP_ENV],
      yearBillOpen: helper.checkYearBillOpen(),
      isHxBank: helper.isHxBank()
    }
  },
  computed: {
    logo() {
      const isHrBank = helper.isHrBank()
      if (isHrBank) {
        return {
          className: 'hr',
          src: require('../../assets/img/hr-gray-logo.png')
        }
      }
      return {
        className: 'fx',
        src: require('../../assets/img/fx-gray-logo.png')
      }
    }
  },
  mounted() {
    this.getEntList()
  },
  methods: {
    async getEntList() {
      const res = await this.$Inside.empEntList()
      const data = decryptInfo(res.data, 'entId', 'entName', 'shortEntName')
      this.entList = this.transEntList(data)
      if (this.entList.length) {
        const endId = helper.getUserInfo('entId', '')
        this.currentEntId = endId || this.entList[0].value
        this.getDataByEnt()
      }
    },
    transEntList(list = []) {
      return list.map((item) => {
        const { entId, entName, liquidation = '', version = '', subVersion = '' } = item
        return {
          value: entId,
          text: entName,
          liquidation,
          version,
          subVersion
        }
      })
    },
    getDataByEnt() {
      const { liquidation, version, subVersion } = collect.getItem(this.entList, 'value', this.currentEntId)
      helper.saveUserInfo({
        entId: this.currentEntId,
        liquidation,
        version,
        subVersion
      })
      this.isHxBank = helper.isHxBank()
      // 获取企业下的轮播图
      this.$refs.banner && this.$refs.banner.getBannerList()
      if (this.isHxBank) {
        this.$nextTick(() => {
          // 获取企业下的消息
          this.$refs.notice.getNotice()
          // 获取企业下的钱包数据
          this.$refs.wallet.getWalletData()
          // 微店上线之后需要去掉
          this.getManagerInfo()
        })
      }
    },
    async getManagerInfo() {
      const res = await this.$Manager.openingTips()
      this.managerInfo = res.data
    },
    enterPayroll() {
      if (helper.getUserInfo('ifPwd', 0)) {
        // 有密码
        if (helper.checkFreeLogin()) {
          // 近期输入过密码
          this.$router.push({ name: 'wageList' })
        } else {
          this.$router.push({
            name: 'loginByPwd',
            query: { nextPage: 'wageList' }
          })
        }
      } else {
        // 设置查询密码
        this.$router.push({ name: 'setQueryCode' })
      }
    },
    toPage(routerName, query = {}) {
      const { hasManager } = this.managerInfo
      if (routerName === 'manager' && hasManager === 1 && !this.isReadManager && !this.isReadManagerCurrent) {
        this.$refs['home-manager-dialog'].open()
        return
      }
      this.$router.push({ name: routerName, query })
    },
    toOuterPage(type) {
      let path = sysConfig[type][process.env.VUE_APP_ENV]
      /* if (type === 'zQUrl') {
        url = wxapi.getWxUrl(this.appId, url)
      } */
      if (type === 'nobleMetalUrl' || type === 'zQUrl') {
        // 贵金属/证券投资
        path = url.buildUrl(path, {
          jsessionId: helper.getUserInfo('jsessionId')
        })
      }
      window.location.href = path
    },
    toNews() {
      helper.saveNoticeInfo(5, 'news')
      this.toPage('notice')
    },
    toBankSite() {
      window.location.href = sysConfig.bankSiteUrl
    }
  },
  components: {
    homeEntList,
    wallet,
    homeBanner,
    homeNotice,
    fxgjMiniProgramPopup,
    homeGameLink,
    homeZxMenu,
    homeManagerDialog,
    yearBillPopup
  }
}
</script>
