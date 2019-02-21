<template>
  <div class="bankcard-list-page">
    <ents-select ref="ents-select" :ent-list="entList" v-if="entList.length" @select="getCurrentBanks"></ents-select>
    <div class="bank-list">
      <bank-item :bank="item" v-for="(item, index) in banks" :key="index" @saveSuccess="getBankList"></bank-item>
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
      this.$nextTick(() => {
        this.$refs['ents-select'].selectEnt()
      })
    },
    getCurrentBanks (index = 0) {
      this.banks = this.entList[index].cards
    }
  },
  components: {
    entsSelect,
    bankItem
  }
}
</script>