<template>
  <div class="notice-item">
    <div class="header">
      <div class="type">
        <img src="../../assets/img/icon-notice-001.png" alt="" />
        <span class="dot red" v-if="!item.readFlag"></span>
        <span class="name">{{ item.activityName }}</span>
      </div>
      <span class="time">{{ item.crtDateTime | date }}</span>
    </div>
    <div class="content">
      <div class="title">{{ item.newsTitle }}</div>
      <div class="detail van-multi-ellipsis--l2" v-html="item.newsContent"></div>
    </div>
    <div class="footer" @click="toDetail">
      查看活动详情
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    toDetail() {
      this.$emit('to-detail')
    }
  }
}
</script>
