<template>
  <van-swipe-item class="bill-item">
    <div class="bill-status error" v-if="wage.payStatus === '0'">资金未到账</div>
    <div class="bill-status success" v-if="wage.payStatus === '1'">资金已到账</div>
    <div class="bank">
      <img class="bank-logo" src="../../assets/img/icon-bank.png" />
      <div class="bank-name">{{ wage.bankName }}（{{ wage.cardNo }}）</div>
    </div>
    <div class="amt-wrap">
      <div class="amt">
        <template v-if="flag">
          <span class="value">{{ $filter.money(wage.realAmt) }}</span>
          <svg-icon svg-name="eye-show" @click.stop="changeFlag"></svg-icon>
        </template>
        <template v-if="!flag"> 
          <span class="hidden">****</span>
          <svg-icon svg-name="eye-hidden" @click.stop="changeFlag"></svg-icon>
        </template>
      </div>
    </div>
    <p class="amt-title">实发金额(元)</p>
    <div class="diff-wrap">
      <div class="label">对比上次</div>
      <div class="value" :class="wage.differRealAmt >= 0 ? 'shang' : 'xia'">
        <template v-if="flag">
          <van-icon name="down"/>
          {{ $filter.money(wage.differRealAmt) }}
        </template>
        <template v-else>
          <span class="star">****</span>
        </template>
      </div>
    </div>
  </van-swipe-item>
</template>
<script>
import storage from 'utils/storage'

export default {
  props: {
    wage: {
      type: Object
    }
  },
  data() {
    return {
      flag: storage.getSession('amtFlag', true)
    }
  },
  methods: {
    changeFlag() {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    },
    toDetail() {
      this.$emit('to-detail')
    }
  }
}
</script>
