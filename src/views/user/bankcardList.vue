<template>
  <div class="bankcard-list-page">
    <bank-item :bank="item" v-for="(item, index) in banks" :key="index" @saveSuccess="getBankList"></bank-item>
  </div>
</template>

<script>
import bankItem from './bankItem'
import decryptInfo from 'utils/decryptInfo'
export default {
  data () {
    return {
      banks: []
    }
  },
  created () {
    this.getBankList()
  },
  methods: {
    async getBankList () {
      let res = await this.$Roll.empCard()
      let { cards, passwd, salt } = res.data
      let banks = cards.map((item) => {
        return Object.assign({}, item, { passwd, salt })
      })
      this.banks = decryptInfo(banks, 'cardNo')
    }
  },
  components: {
    bankItem
  }
}
</script>