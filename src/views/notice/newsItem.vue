<template>
  <div class="notice-item">
    <div class="header">
      <div class="type"><img src="../../assets/img/icon-notice-004.png" alt="" /><span class="dot red" v-if="!item.readFlag"></span></div>
      <span class="time">{{ item.crtDateTime | date }}</span>
    </div>
    <div class="content">
      <div class="title">{{ item.newsTitle }}</div>
      <div class="detail van-multi-ellipsis--l2" v-html="item.newsContent"></div>
    </div>
    <div class="footer">
      查看资讯详情
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
  methods: {}
}
</script>
