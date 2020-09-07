<template>
  <div class="home-manager-dialog" v-if="Object.keys(managerInfo).length">
    <van-popup v-model="show" closeable @close="close(false)">
      <div class="wrap">
        <div class="main">
          <div class="name">尊敬的{{managerInfo.empName.substring(0,1)}}先生/女士</div>
          <div class="desc">{{introduce[managerInfo.ownBank].desc}}</div>
          <div class="single" :class="[introduce[managerInfo.ownBank].ownBank===1?'bg2':'bg1']">
            <span class="single-l">{{introduce[managerInfo.ownBank].singleLeft1}}</span>
            <span class="single-c">.</span>
            <span class="single-r">{{introduce[managerInfo.ownBank].singleRight1}}</span>
          </div>
          <div class="single" :class="[introduce[managerInfo.ownBank].ownBank===1?'bg1':'bg2']">
            <span class="single-l">{{introduce[managerInfo.ownBank].singleLeft2}}</span>
            <span class="single-c">.</span>
            <span class="single-r">{{introduce[managerInfo.ownBank].singleRight2}}</span>
          </div>
          <div class="single bg3">
            <span class="single-l">{{introduce[managerInfo.ownBank].singleLeft3}}</span>
            <span class="single-c">.</span>
            <span class="single-r">{{introduce[managerInfo.ownBank].singleRight3}}</span>
          </div>
          <div class="manager-box">
            <div class="name">{{managerInfo.managerName}} <span class="line">───</span><span>您的专属客户经理</span></div>
            <div class="branch">{{managerInfo.branchName}}</div>
            <div class="info">
              吸存码<span>{{managerInfo.officer}}</span>
              手机号<span>{{managerInfo.managerPhone}}</span>
            </div>
            <div class="phone-box">
              <a :href="`tel:${managerInfo.managerPhone}`">
                <van-icon name="phone" color="#fff"/>
              </a><br>
              <span>拨号</span>
            </div>
          </div>
        </div>
        <div class="btn" @click="close(true)">不再提醒</div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import helper from 'utils/helper'
  export default {
    props: {
      managerInfo: Object,
      default () {
        return {
          empName: ''
        }
      }
    },
    data () {
      return {
        checked: false,
        show: false,
        introduce: [
          {
            desc: '您好！为了更好地为您提供金融服务，我行真诚地邀请您开办华夏卡并开通相关服务，建议如下：',
            singleLeft1: '华夏卡',
            singleRight1: '免开卡费、免年费、每月前3笔免费',
            singleLeft2: '专属理财',
            singleRight2: '不限起购金额、不限理财期限',
            singleLeft3: '手机银行',
            singleRight3: '转账、投资、缴费、贷款'
          },
          {
            desc: '您好！感谢您使用华夏卡薪资代发，为了进一步提升代发资金收益，我行真诚地邀请您开通或体验以下服务：',
            singleLeft1: '普通基金宝',
            singleRight1: '活期类货币基金理财产品',
            singleLeft2: '华夏理财',
            singleRight2: '起购金额不限、理财期限不限',
            singleLeft3: '龙盈智投',
            singleRight3: '一键式智能化进行基金组合配置'
          }
        ]
      }
    },
    created () {

    },
    mounted () {
    },
    methods: {
      open () {
        this.show = true
      },
      close (notNotice) {
        if (notNotice) {
          helper.saveIsReadManager(true)
          this.$emit('getIsReadManager')
          this.show = false
        } else {
          helper.saveIsReadManagerCurrent(true)
          this.$emit('getIsReadManagerCurrent')
        }
      }
    }
  }
</script>
