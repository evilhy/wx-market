<template>
  <div class="welfare-item" @click="toWelfareDetail">
    <div class="top">
      <div class="name">{{ item.activityName }}</div>
      <div class="right">
        <img v-if="item.activityStatus === 3" class="finished" src="../../../assets/img/welfare/activity-finished.png" alt="" />
        <template v-else>
          <div v-if="item.unExchangeCnt">
            <span class="status orange">待领取</span><span class="num">礼品券x{{ item.unExchangeCnt }}</span>
          </div>
          <div class="status green" v-else>已领取</div>
        </template>
      </div>
    </div>
    <img v-if="item.unExchangeCnt && item.activityStatus !== 3" class="img" src="../../../assets/img/welfare/activity-bg.png" alt="" />
    <img v-else class="img" src="../../../assets/img/welfare/activity-bg-disabled.png" alt="" />
    <div class="time">兑换时间：<br />{{ $filter.date(item.startDateTime, 'y/m/d h:i:s') }} 至 {{ $filter.date(item.endDateTime, 'y/m/d h:i:s')}}</div>
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
    toWelfareDetail() {
      this.$router.push({ name: 'welfareDetail', params: { activityId: this.item.activityId } })
    }
  }
}
</script>
