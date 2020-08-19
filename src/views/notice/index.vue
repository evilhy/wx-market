<template>
  <div class="page notice-index-page">
    <!-- <van-tabs v-model="currentTab" sticky>
      <van-tab v-for="(item, index) in tabList" :key="index" :name="item.value">
        <template #title>{{item.label}}<span class="notice-count">{{item.count}}</span></template>
        <no-data text="暂无消息" name="news" v-if="data[currentTab].request && data[currentTab].list.length < 1"></no-data>
        <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="data[currentTab].loading" :finished="data[currentTab].finished"
            :finished-text="finishedText" @load="getList">
            <p class="text" v-for="(item, index) in data[currentTab].list" :key="index" :item="item">{{item.goodsNo}}
            </p>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs> -->
    <!-- 资金动态 不能直接进 要看是否输入密码-->
    <div class="notice-item">
      <van-swipe-cell :before-close="beforeClose">
        <div class="header">
          <div class="type"><img src="../../assets/img/icon-notice-003.png" alt=""><span class="dot red"></span></div>
          <span class="time">2020-09-10 10:02:20</span>
        </div>
        <div class="content">
          <div class="row">
            <span class="label">收款账户：</span>
            <span class="value">华夏银行</span>
          </div>
          <div class="row">
            <span class="label">方案名称：</span>
            <span class="value">开科唯开科唯一识别4月份工资一识别4月份工资</span>
          </div>
          <div class="row">
            <span class="label">资金月份：</span>
            <span class="value">4月</span>
          </div>
          <div class="row">
            <span class="label">资金类型：</span>
            <span class="value">工资</span>
          </div>
          <div class="row">
            <span class="label">实发金额：</span>
            <span class="value">8993.00</span>
          </div>
        </div>
        <div class="footer">查看资金详情
          <van-icon name="arrow" />
        </div>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 审核动态 -->
    <div class="notice-item">
      <div class="header">
        <div class="type"><img src="../../assets/img/icon-notice-002.png" alt=""><span class="dot red"></span></div>
        <span class="time">2020-09-10 10:02:20</span>
      </div>
      <div class="content">
        <div class="row">
          <span class="label">原银行卡</span>
          <span class="value">华夏银行</span>
        </div>
        <div class="row">
          <span class="label">新银行卡</span>
          <span class="value">开科唯开科唯一识别4月份工资一识别4月份工资</span>
        </div>
        <div class="row">
          <span class="label">审批人</span>
          <span class="value">4月</span>
        </div>
        <div class="row">
          <span class="label">审批结果</span>
          <span class="value">工资</span>
        </div>
      </div>
      <div class="footer">申请换卡详情
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 最新资讯 -->
    <div class="notice-item">
      <div class="header">
        <div class="type"><img src="../../assets/img/icon-notice-004.png" alt=""><span class="dot red"></span></div>
        <span class="time">2020-09-10 10:02:20</span>
      </div>
      <div class="content">
        <div class="title">牛市来袭，您的资金该如何分配？</div>
        <div class="detail van-multi-ellipsis--l2">
          最近股市表现强劲，下手早的已经赚得盆满钵满您还在为理财的0点几的收益左右为难吗？是稳稳的幸福还在为理财的0点几的收益左右为难吗？是稳稳的幸福还在为理财的0点几的收益左右为难吗？是稳稳的幸福</div>
      </div>
      <div class="footer">查看资讯详情
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 活动通知 -->
    <div class="notice-item">
      <div class="header">
        <div class="type"><img src="../../assets/img/icon-notice-001.png" alt=""><span class="dot red"></span></div>
        <span class="time">2020-09-10 10:02:20</span>
      </div>
      <div class="content">
        <div class="title">您有3位同事报名了能量满满邀约有礼活动</div>
        <div class="detail van-multi-ellipsis--l2">要不要一起来试试？</div>
      </div>
      <div class="footer">查看活动详情
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="oper-wrap">
      <div class="oper-item"><img src="../../assets/img/oper-hasred.png" alt="">全部标记为已读</div>
      <div class="oper-item red"><img src="../../assets/img/oper-delete.png" alt="">清空全部消息</div>
    </div>
  </div>
</template>

<script>
import sysConfig from 'utils/constant'
import noData from 'components/noData/index'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      tabList: [
        {
          value: '001',
          label: '活动通知',
          count: 1
        },
        {
          value: '002',
          label: '审核动态',
          count: 0
        },
        {
          value: '003',
          label: '资金动态',
          count: 3
        },
        {
          value: '004',
          label: '最新资讯',
          count: 4
        }
      ],
      currentTab: '001',
      refreshing: false,
      data: {
        '001': {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        '002': {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        '003': {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        '004': {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        }
      },
      finishedText: sysConfig.listFinishedText
    }
  },
  created () { },
  methods: {
    async getList () {
      let currentTab = this.currentTab
      let page = this.data[currentTab].page
      this.data[currentTab].loading = true
      let res = await this.$WelfareGoods.goodsList(page)
      let { content = [], last = false } = res.data
      Object.assign(this.data[currentTab], {
        list: this.refreshing ? content : this.data[currentTab].list.concat(content),
        finished: last,
        page: ++page,
        request: true,
        loading: false
      })
      this.refreshing = false
    },
    onRefresh () {
      Object.assign(this.data[this.currentTab], {
        page: 1,
        loading: false,
        finished: false,
        request: false
      })
      this.getList()
    },
    beforeClose ({ instance }) {
      Dialog.confirm({
        title: '系统提醒',
        message: '确定要删除此条消息吗',
        confirmButtonText: '确定删除',
        cancelButtonText: '我再想想'
      }).then(() => {
        instance.close()
        this.deleteNotice()
      }).catch(() => {
        instance.close()
      })
    },
    async deleteNotice () {
      console.log('删除消息')
    },
    beforeDeleteAll () {
      
    }
  },
  components: {
    noData
  }
}
</script>