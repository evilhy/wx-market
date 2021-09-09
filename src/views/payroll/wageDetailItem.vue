<template>
  <swiper-slide>
    <div class="detail-wrap">
      <!-- 银行卡相关 -->
      <div class="bank-wrap">
        <div class="bank-name">
          <img class="bank-img" src="../../assets/img/icon-bank.png" />
          <p>{{ wage.bankName }}</p>
        </div>
        <div class="bank-no">{{ wage.cardNo | bankSpace }}</div>
      </div>
      <!-- 实发总额 -->
      <div class="total-wrap">
        <p class="total-amt" v-show="flag">
          {{ wage.realAmt | money }}
          <i class="icon-ai44 iconfont" @click="changeFlag"></i>
        </p>
        <p class="total-amt" v-show="!flag">
          ****
          <i class="icon-ai47 iconfont" @click="changeFlag"></i>
        </p>
        <div class="total-title">实发金额(元)</div>
      </div>
      <!-- 详情 -->
      <div class="main-wrap">
        <!-- 应发 -->
        <div class="amt-box should">
          <div class="title">
            <p>应发金额</p>
          </div>
          <ul class="amt-list">
            <li class="amt-item" v-for="(item, index) in shouldList" :key="'real-' + index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{ wage.businessType === 1 && item.colName.indexOf(taxDesc) > -1 ? '个税缴纳' : item.colName }}</div>
              <div class="value" v-if="flag">{{ item.colValue | money }}</div>
              <div class="value" v-if="!flag">****</div>
            </li>
          </ul>
        </div>
        <!-- 扣除 -->
        <div class="amt-box sub">
          <div class="title">
            <p>扣除金额</p>
          </div>
          <ul class="amt-list">
            <li class="amt-item" v-for="(item, index) in deductList" :key="'sub-' + index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{ wage.businessType === 1 && item.colName.indexOf(taxDesc) > -1 ? '个税缴纳' : item.colName }}</div>
              <div class="value" v-if="flag">{{ item.colValue | money }}</div>
              <div class="value" v-if="!flag">****</div>
            </li>
          </ul>
        </div>
        <!-- 备注 -->
        <div class="amt-box remark">
          <div class="title">
            <p>事项说明</p>
          </div>
          <ul class="amt-list">
            <li class="amt-item" v-for="(item, index) in remarkList" :key="'remark-' + index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{ item.colName }}</div>
              <div class="value">{{ item.colValue }}</div>
            </li>
          </ul>
        </div>
        <!-- 签名 -->
        <div ref="sign-wrap" class="sign-wrap" v-if="sign">
          <p>签名回执</p>
          <img :src="sign" alt="" />
        </div>
      </div>
      <div class="action-wrap">
        <div class="btn sured" v-if="receiptStautus === 0"><i class="iconfont icon-dui"></i>已向企业回执无误</div>
        <template v-if="receiptStautus !== 0">
          <div class="btn sure" v-if="isSign" @click="openSign">确认无误</div>
          <div class="btn sure" v-else @click="receipt">确认无误</div>
        </template>
        <div class="btn question" v-if="receiptStautus === 3" @click="toQuestionPage(true)">我有疑问</div>
        <div class="btn question" v-if="receiptStautus === 1 || receiptStautus === 2">已反馈</div>
      </div>
    </div>
    <sign-dialog ref="sign-dialog" :id="wage.wageDetailId" @confirm="confirmSign"></sign-dialog>
  </swiper-slide>
</template>
<script>
import { swiperSlide } from 'vue-awesome-swiper'
import storage from 'utils/storage'
import collect from 'utils/collect'
import { typeOf } from 'utils/assist'
import helper from 'utils/helper'
import signDialog from './signDialog'

export default {
  components: { swiperSlide, signDialog },
  props: {
    wage: {
      type: Object
    }
  },
  data() {
    return {
      taxDesc: '应补/退税额',
      shouldList: [],
      deductList: [],
      remarkList: [],
      flag: storage.getSession('amtFlag', true),
      isShow0: this.wage.wageShowDTO.isShow0, // 是否展示金额为0的数据
      isSign: this.wage.wageShowDTO.isSign // 是否开通了签名
    }
  },
  computed: {
    receiptStautus() {
      return this.wage.receiptStautus
    },
    sign() {
      return this.wage.sign
    }
  },
  created() {
    this.initContentData()
  },
  methods: {
    initContentData() {
      const heads = this.wage.wageHeadDTO.heads
      heads.forEach((item) => {
        const resultObj = collect.getItem(this.wage.content, 'colNum', item.colNum[0])
        item.colValue = typeOf(resultObj) === 'object' ? resultObj.value : ''
      })
      this.shouldList = heads.filter((item) => item.type === 'SHOULD_AMT')
      this.deductList = heads.filter((item) => item.type === 'DEDUCT_AMT')
      this.remarkList = heads.filter((item) => item.type === 'REMARK' || item.type === 'UNKNOWN')
    },
    changeFlag() {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    },
    toQuestionPage() {
      this.$router.push({
        name: 'question',
        params: { detailId: this.wage.wageDetailId }
      })
    },
    async receipt() {
      await this.$Inside.receipt(this.wage.wageDetailId, 0)
      this.confirmReceipt('receiptStautus', 0)
    },
    openSign() {
      this.$refs['sign-dialog'].open()
    },
    confirmReceipt(key, value) {
      this.wage[key] = value
      helper.saveReceiptStatus(this.wage.wageDetailId, key, value)
    },
    confirmSign(base64) {
      this.confirmReceipt('receiptStautus', 0)
      this.confirmReceipt('sign', base64)
      setTimeout(() => {
        this.$refs['sign-wrap'].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }
  }
}
</script>
