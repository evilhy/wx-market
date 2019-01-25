<template>
  <div class="bankcard-history-page">
    <template v-if="list.length">
      <div class="history-item" v-for="(item, index) in list" :key="index">
        <div class="time">{{item.crtDateTime | date}}</div>
        <div class="row-list">
          <div class="row">
            <div class="label">原银行卡</div>
            <div class="value">{{item.issuerNameOld}}&nbsp;&nbsp;{{item.cardNoOld | bankSpace}}</div>
          </div>
          <div class="row">
            <div class="label">修改为</div>
            <div class="value">{{item.issuerName}}&nbsp;&nbsp;{{item.cardNo | bankSpace}}</div>
          </div>
          <div class="row">
            <div class="label">所属机构</div>
            <div class="value">{{item.shortGroupName}}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-data">暂无历史记录</div>
    </template>
  </div>
</template>

<script>
import storage from 'utils/storage'
export default {
  data () {
    return {
      list: [],
      ids: storage.getSession('ids', [])
    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    async getHistory () {
      let res = await this.$Roll.empCardLog(this.ids)
      this.list = res.data
    }
  }
}
</script>