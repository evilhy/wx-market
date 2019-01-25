<template>
  <div class="bankcard-list-page">
    <ents-select ref="ents-select" :ent-list="entList" v-if="entList.length" @select="getCurrentBanks"></ents-select>
    <div class="bank-list">
      <bank-item :bank="item" v-for="(item, index) in banks" :key="index" @saveSuccess="refresh"></bank-item>
    </div>
  </div>
</template>

<script>
import entsSelect from './entsSelect'
import bankItem from './bankItem'
export default {
  data () {
    return {
      entList: [],
      banks: []
    }
  },
  created () {
    this.getBankList()
  },
  methods: {
    async getBankList () {
      let res = await this.$Roll.empCard()
      this.entList = res.data
    },
    getCurrentBanks (index = 0) {
      this.banks = this.entList[index].cards
    },
    refresh () {
      this.getBankList()
      this.$refs['ents-select'].selectEnt()
    }
  },
  components: {
    entsSelect,
    bankItem
  }
}
</script>