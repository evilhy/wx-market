<template>
  <div class="invoice-page group-select">
    <div class="current" @click="showGroupList">
      <span class="name">{{ currentInvoice.groupName }}</span>
      <div class="img" v-if="invoiceList.length > 1">
        <i class="iconfont icon-sanjiaoxing-copy" v-if="!flag"></i>
        <i class="iconfont icon-sanjiaoxingzhankai" v-if="flag"></i>
      </div>
    </div>
    <ul class="group-list" :class="[flag ? 'show' : '']">
      <li v-for="(item, index) in invoiceList" :key="index" @click.stop="chooseGroup(item)" class="group-item">
        <p>{{ item.groupName }}</p>
      </li>
    </ul>
    <invoice-item :invoice="currentInvoice" ref="invoice-item"></invoice-item>
    <invoice-rule></invoice-rule>
  </div>
</template>
<script type="text/ecmascript-6">
import invoiceRule from 'components/invoiceRule'
import invoiceItem from 'components/invoiceItem'

export default {
  data () {
    return {
      flag: false,
      invoiceList: [],
      currentInvoice: {}
    }
  },
  created () {
    this.getInvoiceList()
  },
  mounted () {
  },
  methods: {
    getInvoiceList () {
      this
        .$Roll
        .invoice()
        .then((res) => {
          this.invoiceList = res.data
          this.currentInvoice = this.transInvoice(this.invoiceList[0])
        })
    },
    chooseGroup (group) {
      this.currentInvoice = this.transInvoice(group)
      this.flag = false
      this.$refs['invoice-item'].flag = false
    },
    transInvoice (group) {
      const { groupPhonePrefix = '', groupPhone = '' } = group
      const fullPhone = groupPhonePrefix ? `${groupPhonePrefix}-${groupPhone}` : groupPhone
      return { ...group, fullPhone}
    },
    showGroupList () {
      if (this.invoiceList.length > 1) {
        this.flag = !this.flag
      }
    }
  },
  components: {
    invoiceRule,
    invoiceItem
  }
}
</script>
