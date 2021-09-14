<template>
  <div class="withdrawal-steps">
    <div class="step-item step-item--finish">
      <div class="step-item__line"></div>
      <div class="step-item__content">
        <div class="step-item__title">提现申请已提交，等待银行处理</div>
        <div class="step-item__desc">{{ info.applyDateTime | date('m/d H:i:s') }}</div>
      </div>
    </div>
    <div class="step-item" :class="info.transStatus === 1 ? 'step-item--active' : 'step-item--finish'">
      <div class="step-item__line"></div>
      <div class="step-item__content">
        <div class="step-item__title">提现收款账户</div>
        <div class="step-item__desc">{{ info.custName }} | {{ info.openBank }}（尾号{{ info.employeeCardNo.slice(-4) }}）</div>
      </div>
    </div>
    <div class="step-item" :class="caledClass">
      <div class="step-item__line"></div>
      <div class="step-item__content">
        <div class="step-item__title">{{ info.transStatus === 1 ? '预计到账时间' : info.transStatusVal }}</div>
        <div class="step-item__desc">{{ caledTime | date('m/d H:i:s') }}</div>
        <div v-if="info.transStatus === 2 && info.failDesc" class="step-item__desc step-item__desc--error">{{ info.failDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    info: Object
  },
  data() {
    return {}
  },
  computed: {
    caledClass() {
      const result = []
      const { transStatus } = this.info
      if (transStatus !== 1) {
        result.push('step-item--active')
        if (transStatus === 2) {
          result.push('step-item--error')
        }
      }
      return result
    },
    caledTime() {
      const { transStatus, predictDateTime, payDateTime } = this.info
      return transStatus === 1 ? predictDateTime : payDateTime
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
