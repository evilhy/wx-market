<template>
  <span class="dount-down">
    {{displayTime}}
  </span>
</template>
<script>
export default {
  name: 'countDown',
  props: {
    target: {
      type: Number,
      required: true
    },
    showDay: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    clearTime: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      displayTime: '',
      currentFormat: ['d', ':', ':', '']
    }
  },
  created () {
    this.initFormat()
    this.countdown()
  },
  methods: {
    initFormat () {
      this.format.forEach((item, index) => {
        let i = this.showDay ? index : (index + 1)
        this.currentFormat[i] = item
      })
    },
    countdown () {
      let remainSeconds = Math.ceil((this.target - new Date().getTime()) / 1000)
      this.displayTime = this.calRemainTime(remainSeconds)
      if (remainSeconds > 0) {
        !this.clearTime && setTimeout(() => {
          this.countdown()
        }, 1000)
      } else {
        this.$emit('end')
      }
    },
    calRemainTime (remainSeconds = 0) {
      const timeGap = remainSeconds > 0 ? remainSeconds : 0
      const days = this.padStart(Math.floor(timeGap / 86400))
      const hours = this.padStart(Math.floor((timeGap % 86400) / 3600))
      const minutes = this.padStart(Math.floor((timeGap % 3600) / 60))
      const seconds = this.padStart(timeGap % 60)
      const format = this.currentFormat
      const timeStr = `${hours}${format[1]}${minutes}${format[2]}${seconds}${format[3]}`
      if (this.showDay) {
        return `${days}${format[0]}${timeStr}`
      } else {
        return timeStr
      }
    },
    padStart (num) {
      return num.toString().padStart(2, '0')
    }
  }
}
</script>
