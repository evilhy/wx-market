<template>
  <div class="address-list-page" :class="{'my-address-list': noSelect}">
    <no-data v-if="list.length < 1 && requested" text="暂无收货地址" type="exchange" />
    <template>
      <van-address-list :class="addressClasses" v-model="chosenAddressId" :list="list"
        @add="$router.push({ name: 'addNewAddress' })" @edit="onEdit" @select="onSelect">
      </van-address-list>
    </template>
  </div>
</template>

<script>
import noData from 'components/noData'
import storage from 'utils/storage'
export default {
  data () {
    return {
      orderInfo: storage.getSession('orderInfo', {
        activityId: '',
        goodsId: ''
      }),
      chosenAddressId: this.$route.query.id,
      list: [],
      defaultIndex: -1,
      requested: false
    }
  },
  computed: {
    addressClasses () {
      return `default-${this.defaultIndex}`
    },
    noSelect () {
      return !this.orderInfo.activityId
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      let res = await this.$WelfareCust.addressList()
      this.list = this.transList(res.data.content)
      this.requested = true
    },
    transList (list) {
      let result = []
      if (Array.isArray(list)) {
        list.forEach(({ addressId = '', receiveName = '', receivePhone = '', province = '', city = '', county = '', town = '', address = '', isDefault = '' }, index) => {
          result.push({
            id: addressId,
            name: receiveName,
            tel: receivePhone,
            address: `${province} ${city} ${county} ${town} ${address}`
          })
          if (isDefault === 'YES') {
            this.defaultIndex = index
          }
        })
      }
      return result
    },
    onEdit ({ id }) {
      this.$router.push({ name: 'addNewAddress', query: { id } })
    },
    onSelect ({ id }) {
      if (this.noSelect) return
      let { activityId, goodsId } = this.orderInfo
      this.$router.replace({ name: 'welfareOrderConfirm', params: { activityId }, query: { goodsId, addressId: id } })
    }
  },
  components: {
    noData
  }
}
</script>