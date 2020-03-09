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
        <div class="invoice-person">
          <div class="manager-info box bot-line" @click="toPage('manager')">
            <div class="title"><span class="dot" v-if="managerInfo.hasManager === 1 && !isReadManager">1</span>客户经理
            </div>
          </div>
          <div class="welfare-info box bot-line" @click="toPage('welfareList')">
            <div class="title">员工福利</div>
          </div>
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
        <img :src="item.src" :class="item.className"/>
      </span>
    </div>
    <home-manager-dialog ref="home-manager-dialog" @getIsReadManager="getIsReadManager"
                         @getIsReadManagerCurrent="getIsReadManagerCurrent"
                         :manager-info="managerInfo"></home-manager-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {ImagePreview} from 'vant'
  import helper from 'utils/helper'
  import validate from 'utils/validate'
  import homeManagerDialog from './homeManagerDialog'
  Vue.use(ImagePreview)

  export default {
    components: {
      homeManagerDialog
    },
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
        imgList: [],
        requested: false,
        isReadManager: false,
        isReadManagerCurrent: false,
        managerInfo: {
          ownBank: 0, // 0他行卡，1是本行卡
          hasManager: 0, // 0没有客户经理，1有客户经理
          empName: '',
          managerName: '',
          branchName: '',
          officer: '',
          managerPhone: ''
        }
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
      this.getManagerInfo()
      this.getIsReadManager()
      this.getIsReadManagerCurrent()
    },
    methods: {
      getIsReadManager () {
        this.isReadManager = helper.getIsReadManager()
      },
      getIsReadManagerCurrent () {
        this.isReadManagerCurrent = helper.getIsReadManagerCurrent()
      },
      async getManagerInfo () {
        let res = await this.$Manager.openingTips()
        this.managerInfo = res.data
      },
      async getBannerList () {
        this.imgList = await this.$System.getBannerList()
      },
      async getRecentInfo () {
        let res = await this.$Roll.index()
        let {bean = {}, isNew = 0} = res.data
        if (Object.keys(bean).length) {
          this.recentInfo = bean
          this.bankIsNew = isNew
          helper.saveUserInfo({entId: this.recentInfo.entId})
        }
        this.requested = true
      },
      enterMyIncome () {
        if (!this.requested) return
        if (helper.getUserInfo('ifPwd', 0)) { // 有密码
          this.$router.push({name: 'checkQueryCode', query: {'hasWage': this.recentInfo.groupId || ''}})
        } else {
          this.$router.push({name: 'setQueryCode'})
        }
      },
      toPage (routerName, query = {}) {
        let {hasManager} = this.managerInfo
        if (routerName === 'manager' && hasManager === 1 && !this.isReadManager && !this.isReadManagerCurrent) {
          this.$refs['home-manager-dialog'].open()
          return false
        }
        this.$router.push({name: routerName, query: query})
      },
      clickImg (index) {
        let {link = '', url = ''} = this.imgList[index]
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
    }
  }
</script>
