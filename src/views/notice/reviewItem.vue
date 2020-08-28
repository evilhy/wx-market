<template>
  <div class="notice-item">
    <div class="header">
      <div class="type">
        <img src="../../assets/img/icon-notice-002.png" alt="">
        <span class="dot red" v-if="!item.readFlag"></span>
      </div>
      <span class="time">{{item.crtDateTime | date}}</span>
    </div>
    <div class="content" v-html="item.newsContent">
    </div>
    <div class="footer" @click="toDetail">申请换卡详情
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    toDetail () {
      storage.setSession('ids', this.item.detailId)
      this.$emit('to-detail')
      this.$router.push({ name: 'bankcardHistory' })
    }
  },
  components: {
  }
}
</script>