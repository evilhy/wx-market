<template>
  <swiper-slide class="bill-item">
    <div class="bill-status error" v-if="wage.payStatus === '0'">资金未到账</div>
    <div class="bill-status success" v-if="wage.payStatus === '1'">资金已到账</div>
    <div class="bank">
      <img class="bank-logo" src="../../assets/img/icon-bank.png" />
      <div class="bank-name">{{ wage.bankName }}（{{ wage.cardNo }}）</div>
    </div>
    <div class="amt-wrap">
      <div class="amt">
        <template v-if="flag">
          <span class="value">{{ wage.realAmt | money }}</span
          ><i class="icon-ai44 iconfont" @click.stop="changeFlag"></i>
        </template>
        <template v-if="!flag"> <span class="hidden">****</span><i class="icon-ai47 iconfont" @click.stop="changeFlag"></i> </template>
      </div>
    </div>
    <p class="amt-title">实发金额(元)</p>
    <div class="diff-wrap">
      <div class="label">对比上次</div>
      <div class="value" :class="wage.differRealAmt >= 0 ? 'shang' : 'xia'">
        <template v-if="flag">
          <i class="icon-jiantouxia iconfont" v-show="wage.differRealAmt < 0"></i>
          <i class="icon-jiantoushang iconfont" v-show="wage.differRealAmt >= 0"></i>
          {{ wage.differRealAmt | money }}
        </template>
        <template v-else>
          <span class="star">****</span>
        </template>
      </div>
    </div>
  </swiper-slide>
</template>
<script>
import { swiperSlide } from 'vue-awesome-swiper'
import storage from 'utils/storage'

export default {
  components: { swiperSlide },
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
