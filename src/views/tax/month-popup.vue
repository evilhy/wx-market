<template>
  <van-popup ref="month-popup" v-model:show="visible" :overlay="true" position="bottom" class="month-popup" :safe-area-inset-bottom="true">
    <van-picker ref="month-picker" show-toolbar title="选择月份" :default-index="currentMonth - 1" :columns="months" @change="onValuesChange" @confirm="onConfirm" @cancel="onCancel" />
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
  data() {
    return {
      currentMonth: 1,
      visible: false,
      months: [
        {
          values: [
            { value: 1, text: '一月' },
            { value: 2, text: '二月' },
            { value: 3, text: '三月' },
            { value: 4, text: '四月' },
            { value: 5, text: '五月' },
            { value: 6, text: '六月' },
            { value: 7, text: '七月' },
            { value: 8, text: '八月' },
            { value: 9, text: '九月' },
            { value: 10, text: '十月' },
            { value: 11, text: '十一月' },
            { value: 12, text: '十二月' }
          ]
        }
      ]
    }
  },
  methods: {
    show() {
      this.visible = true
      this.currentMonth = this.month
    },
    onValuesChange(value, index) {
      this.currentMonth = value[0].value
    },
    onConfirm() {
      this.$emit('sure', this.months[0].values[this.currentMonth - 1])
      this.visible = false
    },
    onCancel() {
      this.currentMonth = this.month
      this.visible = false
    }
  }
}
</script>
