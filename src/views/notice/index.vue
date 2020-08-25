<template>
  <div class="page notice-index-page" :class="{'news-index-page': entry === 'news'}">
    <van-tabs v-model="currentTab" sticky @click="changeTab">
      <van-tab v-for="(item, index) in tabList" :key="index" :name="item.value">
        <template #title>{{item.label}}<span class="notice-count" v-if="item.count">{{item.count}}</span></template>
        <no-data text="暂无消息" name="news" v-if="data[currentTab].request && data[currentTab].list.length < 1"></no-data>
        <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="data[currentTab].loading" :finished="data[currentTab].finished"
            :finished-text="finishedText" @load="getList">
            <van-swipe-cell :before-close="({ instance }) => {beforeClose(instance, item.newsId)}" v-for="(item, index) in data[currentTab].list" :key="index" >
              <components :is="noticeItem" :item="item"></components>
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="oper-wrap" v-if="data[currentTab].request">
      <div class="oper-item"><img src="../../assets/img/oper-hasred.png" alt="" @click="readAll">全部标记为已读</div>
      <div class="oper-item red"><img src="../../assets/img/oper-delete.png" alt="" @click="beforeDeleteAll">清空全部消息
      </div>
    </div>
  </div>
</template>

<script>
import wageItem from './wageItem'
import reviewItem from './reviewItem'
import newsItem from './newsItem'
import activityItem from './activityItem'
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
import collect from 'utils/collect'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      currentTab: helper.getNoticeInfo().type,
      entry: helper.getNoticeInfo().entry,
      tabList: [
        {
          value: 8,
          label: '活动通知',
          count: 0
        },
        {
          value: 7,
          label: '审核动态',
          count: 0
        },
        {
          value: 6,
          label: '资金动态',
          count: 0
        },
        {
          value: 5,
          label: '最新资讯',
          count: 0
        }
      ],
      data: {
        8: {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        7: {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        6: {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        },
        5: {
          list: [],
          page: 1,
          loading: false,
          finished: false,
          request: false
        }
      },
      refreshing: false,
      finishedText: sysConfig.listFinishedText
    }
  },
  computed: {
    noMsg () {
      let data = this.data
      return Object.keys(data).every((key) => {
        return data[key].request && !data[key].list.length
      })
    },
    noticeItem () {
      switch (this.currentTab) {
        case 5:
          return 'news-item'
        case 6:
          return 'wage-item'
        case 7:
          return 'review-item'
        case 8:
          return 'activity-item'
      }
    }
  },
  created () {
    helper.title(this.entry === 'notice' ? '消息通知' : '最新资讯')
    this.entry === 'notice' && this.getUnReadCount()
  },
  methods: {
    async getUnReadCount () {
      let res = await this.$News.statisticInfo()
      let data = res.data
      if (!Array.isArray(data)) return
      this.tabList.forEach((item) => {
        let info = collect.getItem(data, 'newsType', item.value)
        if (info) {
          item.count = info.unReadCnt
        }
      })
    },
    async getList () {
      let currentTab = this.currentTab
      let page = this.data[currentTab].page
      this.data[currentTab].loading = true
      let res = await this.$News.list(page, currentTab)
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
    changeTab (name) {
      helper.saveNoticeInfo(name, this.entry)
    },
    beforeClose (instance, newsId) {
      console.log('newsId:', newsId)
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