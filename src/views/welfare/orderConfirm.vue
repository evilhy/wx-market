<template>
  <div class="order-confirm-page">
    <div class="address-wrap">
      <div class="title"><van-icon name="location-o" />收货地址</div>
      <div class="content">
        <div class="stress" v-if="noAddress" @click="goAddNewAddress">请维护您的收货地址</div>
        <div class="stress" v-else-if="noDefaultAddress" @click="goAddressList('')">请选择您的收货地址</div>
        <div v-else class="address-detail" @click="goAddressList(selectAddress.addressId)">
          <div class="name">{{ selectAddress.receiveName }} {{ selectAddress.receivePhone }}</div>
          <div class="detail">{{ selectAddress.province }}{{ selectAddress.city }}{{ selectAddress.county }}{{ selectAddress.town }}{{ selectAddress.address }}</div>
        </div>
      </div>
    </div>
    <go-exchange :item="goodsInfo" :activity-id="activityId"></go-exchange>
    <div class="fixed-btn-wrap">
      <div>共1件礼品</div>
      <exchange-btn class-name="exchange-btn" :goods-info="goodsInfo" :disabled="disabled" @submit="confirm"> </exchange-btn>
    </div>
  </div>
</template>

<script>
import goExchange from 'components/goExchange'
import collect from 'utils/collect'
import storage from 'utils/storage'
import exchangeBtn from './components/exchangeBtn'

export default {
  data() {
    return {
      activityId: this.$route.params.activityId,
      goodsId: this.$route.query.goodsId,
      selectAddress: {
        addressId: '',
        receiveName: '',
        receivePhone: '',
        province: '',
        city: '',
        county: '',
        town: '',
        address: '',
        isDefault: ''
      },
      addressId: this.$route.query.addressId,
      noAddress: false,
      noDefaultAddress: false,
      goodsInfo: {
        now: 0,
        startDateTime: 0
      },
      loading: false
    }
  },
  computed: {
    disabled() {
      return this.loading || !this.selectAddress.addressId
    }
  },
  created() {
    this.getSelectAddress()
    this.getGoodsDetail()
  },
  methods: {
    async getSelectAddress() {
      let res = await this.$WelfareCust.addressList()
      let addressList = res.data.content || []
      if (!addressList.length) {
        this.noAddress = true
      } else if (addressList.length === 1) {
        this.selectAddress = addressList[0]
      } else {
        let selectAddress = {}
        if (this.addressId) {
          selectAddress = collect.getItem(addressList, 'addressId', this.addressId)
        } else {
          selectAddress = collect.getItem(addressList, 'isDefault', 'YES')
        }
        if (selectAddress) {
          this.selectAddress = selectAddress
        } else {
          this.noDefaultAddress = true
        }
      }
    },
    async getGoodsDetail() {
      let res = await this.$WelfareGoods.goodsDetail(this.activityId, this.goodsId)
      this.goodsInfo = res.data
    },
    goAddNewAddress() {
      this.savePageInfo()
      this.$router.push({ name: 'addNewAddress' })
    },
    goAddressList(id = '') {
      this.savePageInfo()
      this.$router.push({ name: 'addressList', query: { id } })
    },
    savePageInfo() {
      storage.setSession('orderInfo', { activityId: this.activityId, goodsId: this.goodsId })
    },
    confirm() {
      this.$dialog
        .confirm({
          message: '确认要兑换该礼品吗?',
          confirmButtonText: '确认兑换',
          cancelButtonText: '暂不兑换'
        })
        .then(() => {
          this.exhange()
        })
        .catch(() => {})
    },
    async exhange() {
      try {
        this.loading = true
        let res = await this.$WelfareCustOrder.welfareExchangeGoods(this.activityId, this.goodsId, this.selectAddress.addressId)
        this.$router.push({ name: 'welfareOrderDetail', params: { transOrderId: res.data.transOrderId } })
      } catch (e) {
        this.loading = false
      }
    }
  },
  components: {
    goExchange,
    exchangeBtn
  }
}
</script>
