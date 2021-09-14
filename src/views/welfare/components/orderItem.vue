<template>
  <div class="item">
    <div class="title">
      <div class="title-l">{{ orderInfo.transTime | date('y/m/d h:i:s') }}</div>
      <div class="title-r">{{ statusInfo.desc }}</div>
    </div>
    <go-exchange :item="orderInfo" type="order"></go-exchange>
  </div>
</template>

<script>
import goExchange from 'components/goExchange'
import orderStatus from '../orderStatus'

export default {
  mixins: [orderStatus],
  props: {
    orderInfo: {
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
  methods: {},
  components: { goExchange }
}
</script>
