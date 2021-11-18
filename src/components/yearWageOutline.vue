<template>
  <div>
    <div class="proportion-bg">
      <div class="proportion">
        <div class="pro-hread" center-v>
          <h2 center-v>
            <em>本年收入（入账日）</em>
            <span class="icon-wrap" extend-click>
              <van-icon name="question" @click="openExplainPopup"/>
            </span>
          </h2>
          <span class="icon-wrap">
            <svg-icon :svg-name="flag ? 'eye-show' : 'eye-hidden'" fill="#ccc" @click="toggle"></svg-icon>
          </span>
        </div>
        <ul class="pro-main">
          <li>
            <i>总实发</i><br />
            <span>
              <em v-show="flag">&yen;</em>
              <b v-show="flag">{{ $filter.money(wage.realTotalAmt) }}</b>
              <b class="star" v-show="!flag">****</b>
            </span>
          </li>
          <li>
            <i>总扣除</i><br />
            <span>
              <em v-show="flag">&yen;</em>
              <b v-show="flag">{{ $filter.money(wage.deductTotalAmt) }}</b>
              <b class="star" v-show="!flag">****</b>
            </span>
          </li>
        </ul>
        <amt-percent-line :total="wage.shouldTotalAmt" :real="wage.realTotalAmt" :sub="wage.deductTotalAmt"></amt-percent-line>
        <p class="pro-last">
          总应发：
          <span>
            <em v-show="flag">&yen;</em>
            <i v-show="flag">{{ $filter.money(wage.shouldTotalAmt) }}</i>
            <i class="star" v-show="!flag">****</i>
          </span>
        </p>
      </div>
    </div>
    <bill-explain ref="bill-explain"></bill-explain>
  </div>
</template>
<script>
import billExplain from 'components/billExplain'
import amtPercentLine from 'components/amtPercentLine'

export default {
  props: {
    wage: {
      type: Object
    },
    flag: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    openExplainPopup() {
      this.$refs['bill-explain'].show()
    }
  },
  components: {
    billExplain,
    amtPercentLine
  }
}
</script>
