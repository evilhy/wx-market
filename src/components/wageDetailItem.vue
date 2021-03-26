<template>
  <swiper-slide>
    <div class="detail-wrap">
      <!-- 银行卡相关 -->
      <div class="bank-wrap">
        <div class="bank-name">
          <img class="bank-img" src="../assets/img/icon-bank.png" />
          <p>{{wage.bankName}}</p>
        </div>
        <div class="bank-no">{{wage.cardNo | bankSpace}}</div>
      </div>
      <!-- 实发总额 -->
      <div class="total-wrap">
        <p class="total-amt" v-show="flag">{{wage.realAmt | money}}
          <i class="icon-ai44 iconfont" @click="changeFlag"></i>
        </p>
        <p class="total-amt" v-show="!flag">****
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
            <li class="amt-item" v-for="(item, index) in shouldList" :key="'real-'+index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{(wage.businessType === 1 && (item.colName.indexOf(taxDesc) > -1)) ? '个税缴纳' : item.colName}}</div>
              <div class="value" v-if="flag">{{item.colValue | money}}</div>
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
            <li class="amt-item" v-for="(item, index) in deductList" :key="'sub-'+index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{(wage.businessType === 1 && (item.colName.indexOf(taxDesc) > -1)) ? '个税缴纳' : item.colName}}</div>
              <div class="value" v-if="flag">{{item.colValue | money}}</div>
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
            <li class="amt-item" v-for="(item, index) in remarkList" :key="'remark-'+index" v-if="!item.hidden && (isShow0 === 1 || (isShow0 === 0 && item.colValue != 0))">
              <div class="label">{{item.colName}}</div>
              <div class="value">{{item.colValue}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="action-wrap">
        <template v-if="isReceipt === 1">
          <div class="btn sured" v-if="wage.receiptStautus === 0"><i class="iconfont icon-dui"></i>已向企业回执无误</div>
          <div class="btn sure" @click="receipt" v-else>确认无误</div>
        </template>
        <div class="btn question" v-if="wage.receiptStautus === 3" @click="toQuestionPage(true)">我有疑问</div>
        <div class="btn question" v-if="wage.receiptStautus === 1 || wage.receiptStautus === 2">已反馈</div>
      </div>
    </div>
  </swiper-slide>
</template>
<script>
import { swiperSlide } from 'vue-awesome-swiper'
import storage from 'utils/storage'
import collect from 'utils/collect'
import { typeOf } from 'utils/assist'
import helper from 'utils/helper'
export default {
  components: { swiperSlide },
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
      isShow0: 0, // 是否展示金额为0的数据
      isReceipt: 1, // 是否开启回执功能
      receiptDay: 0, // 默认回执时间天
      receiptStautus: -1, // 回执状态
      flag: storage.getSession('amtFlag', true)
    }
  },
  watch: {
    wage: {
      deep: true,
      handler(val) {
        this.initSettingData()
        this.initContentData()
      }
    }
  },
  created() {
    this.initSettingData()
    this.initContentData()
  },
  methods: {
    initSettingData() {
      this.isShow0 = this.wage.wageShowDTO.isShow0
      this.isReceipt =
        typeOf(this.wage.wageShowDTO.isReceipt) === 'number'
          ? this.wage.wageShowDTO.isReceipt
          : 1
      this.receiptDay =
        typeOf(this.wage.wageShowDTO.receiptDay) === 'number'
          ? this.wage.wageShowDTO.receiptDay
          : 0
      this.receiptStautus = this.wage.receiptStautus
    },
    initContentData() {
      let heads = this.wage.wageHeadDTO.heads
      heads.forEach((item) => {
        let resultObj = collect.getItem(
          this.wage.content,
          'colNum',
          item.colNum[0]
        )
        item.colValue = typeOf(resultObj) === 'object' ? resultObj.value : ''
      })
      this.shouldList = heads.filter((item) => item.type === 'SHOULD_AMT')
      this.deductList = heads.filter((item) => item.type === 'DEDUCT_AMT')
      this.remarkList = heads.filter(
        (item) => item.type === 'REMARK' || item.type === 'UNKNOWN'
      )
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
    receipt() {
      this.$Inside.receipt(this.wage.wageDetailId, 0).then(() => {
        this.modifyLocalWageDetail()
      })
    },
    modifyLocalWageDetail() {
      this.wage.receiptStautus = 0
      helper.saveReceiptStatus(this.wage.wageDetailId, 0)
    }
  }
}
</script>
