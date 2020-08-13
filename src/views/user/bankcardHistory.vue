<template>
  <div class="bankcard-history-page">
    <template v-if="list.length">
      <bank-history-item v-for="(item, index) in list" :key="index" :item="item"></bank-history-item>
    </template>
    <template v-if="requested && !list.length">
      <div class="no-data">暂无历史记录</div>
    </template>
  </div>
</template>

<script>
import storage from 'utils/storage'
import bankHistoryItem from './bankcardHistoryItem'
export default {
  data () {
    return {
      list: [],
      ids: storage.getSession('ids', []),
      requested: false
    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    async getHistory () {
      try {
        let res = await this.$Roll.empCardLog(this.ids)
        this.list = res.data
      } finally {
        this.requested = true
      }
    }
  },
  components: {
    bankHistoryItem
  }
}
</script>