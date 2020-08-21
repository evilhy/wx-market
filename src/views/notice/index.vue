<template>
  <div class="page notice-index-page">
    <van-tabs v-model="currentTab" sticky>
      <van-tab v-for="(item, index) in tabList" :key="index" :name="item.value">
        <template #title>{{item.label}}<span class="notice-count">{{item.count}}</span></template>
        <no-data text="暂无消息" name="news" v-if="data[currentTab].request && data[currentTab].list.length < 1"></no-data>
        <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="data[currentTab].loading" :finished="data[currentTab].finished"
            :finished-text="finishedText" @load="getList">
            <wage-item v-for="(item, index) in data[currentTab].list" :key="index" :item="item" @delete="beforeClose"></wage-item>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 资金动态 不能直接进 要看是否输入密码-->
    <!-- 审核动态 -->
    <!-- 最新资讯 -->
    <!-- 活动通知 -->
    <div class="oper-wrap">
      <div class="oper-item"><img src="../../assets/img/oper-hasred.png" alt="" @click="readAll">全部标记为已读</div>
      <div class="oper-item red"><img src="../../assets/img/oper-delete.png" alt="" @click="beforeDeleteAll">清空全部消息
      </div>
    </div>
  </div>
</template>

<script>
import wageItem from './noticeWageItem'
import reviewItem from './noticeReviewItem'
import newsItem from './noticeNewsItem'
import activityItem from './noticeActivityItem'
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
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
  computed: {
    noMsg () {
      let data = this.data
      return Object.keys(data).every((key) => {
        return data[key].request && !data[key].list.length
      })
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
    readAll () {
      if (this.noMsg) return false
    },
    beforeDeleteAll () {
      if (this.noMsg) return false
      Dialog.confirm({
        title: '系统提醒',
        message: '确定要清空全部消息吗',
        confirmButtonText: '确定清空',
        cancelButtonText: '我再想想'
      }).then(() => {
        this.deleteAllNotice()
      }).catch(() => { })
    },
    deleteAllNotice () {
      console.log('全部清除')
      Object.keys(this.data).forEach((key) => {
        this.$set(this.data, key, {
          list: [],
          page: 1,
          loading: false,
          finished: true,
          request: true
        })
      })
    }
  },
  components: {
    noData,
    wageItem,
    reviewItem,
    newsItem,
    activityItem
  }
}
</script>