<template>
  <div class="page home-page white" :class="{ent: entList.length > 1}">
    <!-- 企业切换栏 -->
    <home-ent-list v-if="entList.length > 1" v-model="currentEntId" :ent-list="entList" @change="getDataByEnt">
    </home-ent-list>
    <!-- 轮播图 -->
    <home-banner></home-banner>
    <!-- 通知栏 没有通知的时候margin-left变小-->
    <home-notice></home-notice>
    <!-- 普通版菜单入口 -->
    <template v-if="apppartner === 'FXGJ'">
      <!-- 钱包 -->
      <wallet ref="wallet" @to-page="toPage"></wallet>
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
      <home-game-link></home-game-link>
    </template>
    <!-- 振兴银行菜单入口 -->
    <home-zx-menu ref="zx-menu" v-if="apppartner === 'NEWUP'" @enter-payroll="enterPayroll"></home-zx-menu>
    <!-- 底部logo -->
    <div class="bottom-logo"><img :class="logo.className" :src="logo.src" alt=""></div>
    <!-- // 后期去掉 -->
    <home-manager-dialog ref="home-manager-dialog" @getIsReadManager="isReadManager = true"
      @getIsReadManagerCurrent="isReadManagerCurrent = true" :manager-info="managerInfo"></home-manager-dialog>
  </div>
</template>

<script>
import homeEntList from './homeEntList'
import wallet from 'components/wallet'
import homeBanner from './homeBanner'
import homeNotice from './homeNotice'
import homeGameLink from './homeGameLink'
import homeZxMenu from './homeZxMenu'
import homeManagerDialog from './homeManagerDialog'
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
import sysConfig from 'utils/constant'
import Wxapi from 'utils/wxapi'
const wxapi = new Wxapi()
export default {
  data () {
    return {
      entList: [],
      currentEntId: '',
      managerInfo: {},
      isReadManager: helper.getIsReadManager(),
      isReadManagerCurrent: helper.getIsReadManagerCurrent(),
      appId: sysConfig.appId[process.env.NODE_ENV],
      apppartner: helper.getUserInfo('apppartner')
    }
  },
  computed: {
    logo () {
      switch (this.apppartner) {
        case 'SJZHRB':
          return {
            className: 'hr',
            src: require('../../assets/img/hr-gray-logo.png')
          }
        default:
          return {
            className: 'fx',
            src: require('../../assets/img/fx-gray-logo.png')
          }
      }
    }
  },
  mounted () {
    this.getEntList()
  },
  methods: {
    async getEntList () {
      let res = await this.$Inside.empEntList()
      let data = decryptInfo(res.data, 'entId', 'entName', 'shortEntName')
      this.entList = this.transEntList(data)
      if (this.entList.length) {
        this.currentEntId = this.entList[0].value
        this.getDataByEnt()
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
    getDataByEnt () {
      console.log(this.currentEntId)
      helper.saveUserInfo({ entId: this.currentEntId })
      if (this.apppartner === 'FXGJ') {
        // 消息是否与企业相关 待确定todo
        // 获取企业下的钱包数据
        this.$refs['wallet'].getWalletData()
        // 微店上线之后需要去掉
        this.getManagerInfo()
      }
    },
    async getManagerInfo () {
      let res = await this.$Manager.openingTips()
      this.managerInfo = res.data
    },
    enterPayroll () {
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        if (helper.checkFreeLogin()) { // 近期输入过密码
          this.$router.push({ name: 'wageList' })
        } else {
          this.$router.push({ name: 'loginByPwd', query: { nextPage: 'wageList' } })
        }
      } else { // 设置查询密码
        this.$router.push({ name: 'setQueryCode' })
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
    }
  },
  components: {
    homeEntList,
    wallet,
    homeBanner,
    homeNotice,
    homeGameLink,
    homeZxMenu,
    homeManagerDialog
  }
}
</script>