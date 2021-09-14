<template>
  <div class="proportion-bg">
    <div class="proportion">
      <div class="pro-hread">
        <!-- todo 缺字段-->
        <h2>{{ wage.spName }}</h2>
        <span v-show="type === '0'">{{ wage.pushDateTime | date('m/d') }}</span>
        <span v-show="type === '1'">{{ wage.month | monthZh(true) }}</span>
      </div>
      <ul class="pro-main">
        <li>
          <em
            >实发金额
            <template v-if="realMax !== realMin">
              <i class="iconfont icon-zuigao-zuoce icon-blue" v-show="realMax === wage.realTotalAmt"></i>
              <i class="iconfont icon-zuidi-zuoce icon-red" v-show="realMin === wage.realTotalAmt"></i>
            </template> </em
          ><br />
          <span> <em>&yen;</em>{{ wage.realTotalAmt | money }}</span>
        </li>
        <li>
          <em
            >扣除金额
            <template v-if="subMax !== subMin">
              <i class="iconfont icon-zuigao-youce icon-blue" v-show="subMax === wage.deductTotalAmt"></i>
              <i class="iconfont icon-zuidi-youce icon-red" v-show="subMin === wage.deductTotalAmt"></i>
            </template> </em
          ><br />
          <span> <em>&yen;</em>{{ wage.deductTotalAmt | money }}</span>
        </li>
      </ul>
      <amt-percent-line :total="wage.shouldTotalAmt" :real="wage.realTotalAmt" :sub="wage.deductTotalAmt"></amt-percent-line>
    </div>
  </div>
</template>
<script>
import amtPercentLine from 'components/amtPercentLine'

export default {
  props: {
    wage: {
      type: Object
    },
    type: {
      type: String,
      default: '0'
    },
    realMax: {
      type: Number
    },
    realMin: {
      type: Number
    },
    subMax: {
      type: Number
    },
    subMin: {
      type: Number
    }
  },
  data() {
    return {}
  },
  components: {
    amtPercentLine
  }
}
</script>
