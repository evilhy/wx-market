<template>
  <van-popup  ref="month-popup" v-model="visible" :overlay="true" position="bottom" class="month-popup">
    <van-picker value-key="label" :columns="slots" @change="onValuesChange" v-if="visible" />       
    <div class="action-wrap">
      <span class="action-item" @click="visible = false">取消</span>
      <span class="action-item" @click="confirm">确定</span>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'month-popup',
  props: {
    month: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentMonth: 1,
      visible: false,
      slots: [{
        values: [
          { value: 1, label: '一月' },
          { value: 2, label: '二月' },
          { value: 3, label: '三月' },
          { value: 4, label: '四月' },
          { value: 5, label: '五月' },
          { value: 6, label: '六月' },
          { value: 7, label: '七月' },
          { value: 8, label: '八月' },
          { value: 9, label: '九月' },
          { value: 10, label: '十月' },
          { value: 11, label: '十一月' },
          { value: 12, label: '十二月' }
        ],
        defaultIndex: 0
      }]
    }
  },
  methods: {
    show () {
      this.visible = true
      this.currentMonth = this.month
      this.slots[0].defaultIndex = this.currentMonth - 1
    },
    onValuesChange (picker, values) {
      this.currentMonth = values[0].value
    },
    confirm () {
      this.$emit('sure', this.slots[0].values[this.currentMonth - 1])
      this.visible = false
    }
  }
}
</script>