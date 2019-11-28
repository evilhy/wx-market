<template>
  <div class="phone-charge-detail">
    <div class="goods-info">
      <div class="goods-name">{{goodsInfo.goodsName}}</div>
      <div class="exchange">
        <img class="hot" src="../../../assets/img/welfare/icon-colleague.png" alt="">{{goodsInfo.exchangeCnt}}位同事曾兑换
      </div>
    </div>
    <div class="input-wrap">
      <img class="icon-phone" src="../../../assets/img/welfare/phone.png" alt="">
      <input class="input" v-input type="tel" v-model.trim="phone" maxlength="11" placeholder="请输入手机号">
    </div>
    <exchange-btn :goods-info="goodsInfo" :disabled="btnDisabled" @submit="showConfirm"></exchange-btn>
    <div class="detail-img-wrap">
      <img v-for="(id, index) in goodsInfo.descImgIdSet" :key="index" v-lazy="`${imgBaseUrl}/${id}`">
      <img src="../../../assets/img/welfare/virtual-goods-tip.png" alt="">
    </div>
  </div>
</template>

<script>
import exchangeBtn from './exchangeBtn'
import sysConfig from 'utils/constant'
import validate from 'utils/validate'
export default {
  props: {
    activityId: String,
    goodsInfo: {
      type: Object,
      default () {
        return {
          descImgIdSet: []
        }
      }
    }
  },
  data () {
    return {
      imgBaseUrl: sysConfig.wisales_img_url[process.env.NODE_ENV],
      phone: '',
      loading: false
    }
  },
  computed: {
    btnDisabled () {
      return !validate.isPhone(this.phone) || this.loading
    }
  },
  created () { },
  methods: {
    showConfirm () {
      this.$dialog
        .confirm({
          message: '确认要兑换该礼品吗?',
          confirmButtonText: '确认兑换',
          cancelButtonText: '暂不兑换'
        })
        .then(() => {
          this.exchangeGoods()
        })
        .catch(() => { })
    },
    async exchangeGoods () {
      try {
        this.loading = true
        let res = await this.$WelfareCustOrder.welfareExchangePhone(this.activityId, this.goodsInfo.goodsId, this.phone)
        this.$router.push({ name: 'welfareOrderDetail', params: { transOrderId: res.data.transOrderId } })
      } catch (e) {
        this.loading = false
      }
    }
  },
  components: {
    exchangeBtn
  }
}
</script>