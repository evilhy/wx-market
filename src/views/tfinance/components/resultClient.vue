<template>
  <div class="result-client-wrap white-box">
    <div class="line-title">{{result.status === 1 ? '预约信息' : '认购信息'}}</div>
    <template v-if="result.status === 1">
      <div class="field">
        <span class="label">预约金额(元)</span>
        <span class="value">{{result.intentAmount | money}}</span>
      </div>
      <div class="field">
        <span class="label">提交时间</span>
        <span class="value">{{result.crtDateTime | date('Y/m/d H:i:s')}}</span>
      </div>
      <div class="field">
        <span class="label">预期收益(元)</span>
        <span class="value">{{result.profit | money}}</span>
      </div>
      <div class="field">
        <span class="label">预约期</span>
        <span class="value order-term">{{productInfo.intentStartDate | date('Y/m/d H:i:s')}}<br />{{productInfo.intentEndDate | date('Y/m/d H:i:s')}}</span>
      </div>
    </template>
    <template v-else>
      <div class="field">
        <span class="label">实际认购金额(元)</span>
        <span class="value">{{result.subcribeAmount | money}}</span>
      </div>
      <div class="field">
        <span class="label">认购时间</span>
        <span class="value">{{result.subcribeDateTime | date('Y/m/d H:i:s')}}</span>
      </div>
      <div class="field">
        <span class="label">预期收益(元)</span>
        <span class="value">{{result.profit | money}}</span>
      </div>
      <div class="field">
        <span class="label">到期兑付时间</span>
        <span class="value order-term">{{result.dealDateTime | date('Y/m/d H:i:s')}}</span>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    productInfo: {
      type: Object,
      default () {
        return {
          intentStartDate: 0,
          intentEndDate: 0
        }
      }
    },
    result: {
      type: Object,
      default () {
        return {
          status: 1,
          intentAmount: 0,
          crtDateTime: 0,
          subcribeAmount: 0,
          subcribeDateTime: 0,
          profit: 0,
          dealDateTime: 0
        }
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
  }
}
</script>