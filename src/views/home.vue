<template>
  <div class="home-page">
    <div class="banner">
      <swiper class="swiper-container">
        <!-- slides -->
        <swiper-slide v-for="(img, index) in imgList" :key="index">
          <img :src="img" alt="" class="img" @click="viewImg(index)">
        </swiper-slide>
      </swiper>
    </div>
    <div class="links-wrap">
      <div class="my-income" @click="salaryList">
        <div class="title">我的收入</div>
        <div class="recent-one" v-if="recentTime">最近一笔：{{recentTime | deteData}}</div>
      </div>
      <div class="link-right">
        <div class="hx-manager" @click="toPage('managerContact')">
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
      <img :src="bank.bank_icon_transparent" v-for="(bank, index) in bankList" :key="index" />
    </div>
    <img-viewer :img-list="imgList" :index="imgViewIndex" :flag="imgViewerFlag" @close="imgViewerFlag=false"></img-viewer>
  </div>
</template>
<script type="text/ecmascript-6">
import storage from 'utils/storage'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
import ImgViewer from 'components/imgViewer'
export default {
  data () {
    return {
      imgBaseUrl: sysConfig.img_base_url[sysConfig.node_env],
      idInfo: storage.getSession('ID', {}),
      recentTime: '',
      bankList: [],
      dataList: [],
      hasNewMsg: '0',
      imgViewerFlag: false,
      imgViewIndex: 0,
      imgList: [require('../assets/img/home-banner1.jpg')]
    }
  },
  created () {
    this.initData()
    this.getStatus()
  },
  mounted () {
  },
  methods: {
    initData () {
      this.recentTime = storage.getSession('recent_date', '')
      this.bankList = storage.getSession('bank_list', [])
      this.dataList = storage.getSession('institution', [])
      this.bankList.forEach((item) => {
        item.bank_icon_transparent = this.imgBaseUrl + item.bank_icon_transparent
      })
    },
    getStatus () {
      this.Http
        .connect(true)
        .post('entUser100707.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000' && response.ent_id) {
            helper.saveIdInfo({ ent_id: response.ent_id })
            this.idInfo = storage.getSession('ID', {})
            this.getMsgInfo()
          }
        })
    },
    salaryList () {
      if (this.dataList.length === 1) {
        if (this.dataList[0].plan_id === '' && this.dataList[0].ent_id === '' && this.dataList[0].group_id === '') {
          this.toPage('nosalary')
        } else {
          this.toPage('institution')
        }
      } else if (this.dataList.length === 0) {
        this.toPage('nosalary')
      } else {
        this.toPage('institution')
      }
    },
    toPage (routerName, query = {}) {
      this.$router.push({ name: routerName, query: query })
    },
    getMsgInfo () {
      this.Http
        .connect(true)
        .post('entUser100795.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000' && response.cust_manager_info.has_new_message) {
            this.hasNewMsg = response.cust_manager_info.has_new_message
          }
        })
    },
    viewImg (index) {
      this.imgViewIndex = index
      this.imgViewerFlag = true
    }
  },
  components: {
    ImgViewer
  }
}
</script>
