<template>
  <van-button :class="className" type="default" :disabled="btnDisabled" @click="$emit('submit')">
    <template v-if="!flag">
      <count-down :show-day="false" :format="[':', ':', '']" :now="goodsInfo.now" :target="goodsInfo.startDateTime" @end="flag = true"></count-down>后可兑换
    </template>
    <template v-else>
      {{btnText}}
    </template>
  </van-button>
</template>

<script>
import countDown from 'components/countDown'
export default {
  props: {
    className: {
      type: String,
      default: 'btn'
    },
    goodsInfo: {
      type: Object,
      default () {
        return {
          detailImgIdSet: [],
          now: 0,
          startDateTime: 0
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flag: false
    }
  },
  computed: {
    btnDisabled () {
      let { now, endDateTime, unExchangeCnt, stockCnt } = this.goodsInfo
      return !this.flag || endDateTime < now || unExchangeCnt < 1 || stockCnt < 1 || this.disabled
    },
    btnText () {
      let { now, endDateTime, unExchangeCnt, stockCnt } = this.goodsInfo
      if (!unExchangeCnt) {
        return '已兑换'
      }
      if (endDateTime < now) {
        return '已结束'
      }
      if (!stockCnt) {
        return '已售罄'
      }
      return '立即兑换'
    }
  },
  created () {},
  methods: {
  },
  components: {
    countDown
  }
}
</script>