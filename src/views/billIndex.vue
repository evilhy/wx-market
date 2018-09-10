<template>
  <div class="bill-index-page">
    <div class="manager-box" @click="toPage('managerDetail')" v-if="Object.keys(msgInfo).length">
      <img v-if="msgInfo.avatar_url" :src="msgInfo.avatar_url" alt="" class="pic">
      <img v-if="!msgInfo.avatar_url" src="../assets/img/manager-default-avatar.png" alt="" class="pic">
      <p class="title">咨询留言
        <span class="new-flag" v-if="msgInfo.has_new_message === '1'"></span>
      </p>
    </div>
    <div class="bill-index-main">
      <div class="fx-logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <swiper class="bill-info" :options="swiperOption">
        <swiper-slide class="bill-item" v-for="(billItem, index) in billInfo.sp_bank_list" :key="index">
          <div class="bank">
            <img class="bank-logo" :src="billItem.bank_icon" />
            <span class="bank-name">{{billItem.bank_name}}（{{billItem.bank_card_star}}）</span>
          </div>
          <div class="amt-wrap">
            <div class="amt">
              <span v-show="flag" @click="toPage('billDetail')">
                {{billItem.bank_total_amt | money(2)}}
                <i class="icon-ai44 iconfont" @click.stop="changeFlag"></i>
              </span>
              <span v-show="!flag" @click="toPage('billDetail')">
                ****
                <i class="icon-ai47 iconfont" @click.stop="changeFlag"></i>
              </span>
            </div>
          </div>
          <p class="amt-title">实发金额(元)</p>
          <div class="diff-wrap">
            <div class="label">对比上次</div>
            <div class="value" :class="Number(billItem.differ_amt) >= 0 ? 'shang' : 'xia'">
              <span>
                <i class="icon-jiantouxia iconfont" v-show="Number(billItem.differ_amt) < 0"></i>
                <i class="icon-jiantoushang iconfont" v-show="Number(billItem.differ_amt) >= 0"></i>
                {{billItem.differ_amt | money(2)}}
              </span>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="action-wrap">
        <div class="action" @click="toPage('trend')">
          <i class="iconfont icon-chakanzoushi"></i>查看走势</div>
        <div class="action" @click="toPage('billDetail')">
          <i class="iconfont icon-chakanxiangqing"></i>查看详情</div>
      </div>
    </div>
    <div class="bottom">
      <span class="time">推送时间{{billInfo.push_date_time | date('Y/m/d')}}</span>
      <span class="return" @click="toPage('institution')">返回列表</span>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import encryption from 'utils/encryption'
import sysConfig from 'utils/constant'
import { typeOf } from 'utils/assist'
export default {
  data () {
    return {
      workKey: encryption.decrypt(storage.getSession('wKey'), storage.getSession('mKey')).aes_key,
      imgBaseUrl: sysConfig.img_base_url[sysConfig.node_env],
      idInfo: storage.getSession('ID', {}),
      flag: storage.getSession('amtFlag', true),
      billInfo: {
        push_date_time: '',
        sp_bank_list: []
      },
      msgInfo: {
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {},
  created () {
    this.getMsgInfo()
    this.getBillList()
  },
  mounted () { },
  methods: {
    getMsgInfo () {
      this.Http
        .connect(true)
        .post('entUser100795.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000') {
            this.msgInfo = response.cust_manager_info
          }
        })
    },
    getBillList () {
      this.Http
        .connect(true)
        .post('entUser100704.json', {
          plan_id: this.idInfo.plan_id ? this.idInfo.plan_id : '',
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          group_id: this.idInfo.group_id ? this.idInfo.group_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000') {
            this.billInfo = encryption.decrypt(response, this.workKey)
            storage.setSession('billInfo', this.billInfo)
            if (typeOf(this.billInfo.sp_bank_list) !== 'array') return
            this.billInfo.sp_bank_list.forEach((item) => {
              item.bank_icon = this.imgBaseUrl + item.bank_icon_white
            })
          }
        })
    },
    changeFlag () {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    },
    toPage (routeName = '', query = {}) {
      this.$router.push({ name: routeName, query: query })
    }
  },
  components: {}
}
</script>
