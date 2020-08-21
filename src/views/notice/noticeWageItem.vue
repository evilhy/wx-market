<template>
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
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  methods: {
    beforeClose (obj) {
      this.$emit('delete', obj)
    }
  }
}
</script>