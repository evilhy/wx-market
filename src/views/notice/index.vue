<template>
  <div class="page notice-index-page" :class="{ 'news-index-page': entry === 'news' }">
    <van-tabs v-model="currentTab" sticky @click="changeTab">
      <van-tab v-for="(item, index) in tabList" :key="index" :name="item.value">
        <template #title
          >{{ item.label }}<span class="notice-count" v-if="item.count">{{ item.count }}</span></template
        >
        <no-data text="暂无数据" name="news" v-if="data[currentTab].request && data[currentTab].list.length < 1"></no-data>
        <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="data[currentTab].loading" :finished="data[currentTab].finished" :finished-text="finishedText" @load="getList">
            <van-swipe-cell v-for="(item, index) in data[currentTab].list" :key="index">
              <component :is="noticeItem" :item="item" @to-detail="updateRead(item)"></component>
              <template #right>
                <van-button square type="danger" text="删除" @click="beforeDelete(item.newsId)" />
              </template>
            </van-swipe-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="oper-wrap" v-if="!noMsg">
      <div class="oper-item"><img src="../../assets/img/oper-hasred.png" alt="" @click="readAll" />全部标记为已读</div>
      <div class="oper-item red"><img src="../../assets/img/oper-delete.png" alt="" @click="beforeDelete('')" />清空全部消息</div>
    </div>
    <fxgj-mini-program-popup ref="fxgj-mini-program-popup"></fxgj-mini-program-popup>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import fxgjMiniProgramPopup from 'components/fxgjMiniProgramPopup'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
import collect from 'utils/collect'
import { Dialog } from 'vant'
import activityItem from './activityItem'
import newsItem from './newsItem'
import reviewItem from './reviewItem'
import wageItem from './wageItem'

export default {
  data() {
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
    noMsg() {
      const data = this.data
      if (this.entry === 'notice') {
        return Object.keys(data).every((key) => {
          return data[key].request && !data[key].list.length
        })
      }
      const news = this.data[5]
      return news.request && !news.list.length
    },
    noticeItem() {
      switch (this.currentTab) {
        case 5:
          return 'news-item'
        case 6:
          return 'wage-item'
        case 7:
          return 'review-item'
        case 8:
          return 'activity-item'
        default:
          return 'news-item'
      }
    }
  },
  created() {
    helper.title(this.entry === 'notice' ? '消息通知' : '最新资讯')
    this.getUnReadCount()
  },
  methods: {
    async getUnReadCount() {
      if (this.entry !== 'notice') return
      const res = await this.$News.statisticInfo()
      const data = res.data
      if (!Array.isArray(data)) return
      this.tabList.forEach((item) => {
        const info = collect.getItem(data, 'newsType', item.value)
        if (info) {
          item.count = info.unReadCnt
        }
      })
    },
    async getList() {
      const currentTab = this.currentTab
      let page = this.data[currentTab].page
      this.data[currentTab].loading = true
      const res = await this.$News.list(page, currentTab)
      const { content = [], last = false } = res.data
      Object.assign(this.data[currentTab], {
        list: this.refreshing ? content : this.data[currentTab].list.concat(content),
        finished: last,
        page: ++page,
        request: true,
        loading: false
      })
      this.refreshing = false
    },
    onRefresh() {
      Object.assign(this.data[this.currentTab], {
        page: 1,
        loading: false,
        finished: false,
        request: false
      })
      this.refreshing = true
      this.getList()
    },
    changeTab(name) {
      helper.saveNoticeInfo(name, this.entry)
    },
    beforeDelete(newsId = '') {
      const msg = newsId ? '确定要删除此条消息吗' : '确定要清空全部消息吗'
      const confirmBtnText = newsId ? '确定删除' : '确定清空'
      Dialog.confirm({
        title: '系统提醒',
        message: msg,
        confirmButtonText: confirmBtnText,
        cancelButtonText: '我再想想'
      })
        .then(() => {
          this.deleteNotice(newsId)
        })
        .catch(() => {})
    },
    async deleteNotice(newsId = '') {
      await this.$News.operate(1, newsId)
      helper.toast('操作成功')
      if (newsId) {
        // 删除单个
        this.getUnReadCount()
        this.onRefresh()
      } else {
        // 删除全部
        this.clearUnReadCount()
        Object.keys(this.data).forEach((key) => {
          this.$set(this.data, Number(key), {
            list: [],
            page: 1,
            loading: false,
            finished: true,
            request: true
          })
        })
      }
    },
    async readAll() {
      await this.$News.operate(0)
      helper.toast('操作成功')
      this.clearUnReadCount()
      for (const key in this.data) {
        this.data[key].list.forEach((item) => {
          item.readFlag = true
        })
      }
    },
    clearUnReadCount() {
      this.tabList.forEach((item) => {
        item.count = 0
      })
    },
    async updateRead({ readFlag, newsId, newsType } = {}) {
      newsType === 8 && this.$refs['fxgj-mini-program-popup'].open()
      if (readFlag) return
      this.$News.operate(0, newsId)
    }
  },
  components: {
    noData,
    fxgjMiniProgramPopup,
    wageItem,
    reviewItem,
    newsItem,
    activityItem
  }
}
</script>
