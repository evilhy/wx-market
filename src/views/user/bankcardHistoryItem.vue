<template>
  <div class="history-item" :class="itemClass">
    <div class="time">{{item.crtDateTime | date}}
      <span class="tag"><span class="text">{{item.updStatusVal}}</span></span>
    </div>
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
    <div class="reject-reason" v-if="item.updStatus === 2">{{item.updDesc}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      statusClass: ['todo', 'success', 'reject']
    }
  },
  computed: {
    itemClass () {
      return this.statusClass[this.item.updStatus]
    }
  },
  created () { },
  methods: {}
}
</script>