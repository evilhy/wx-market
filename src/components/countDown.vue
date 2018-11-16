<template>
  <span class="count-down">
    <template v-if="showDay">
      <span class="days" v-show="remainTimeObject.days > 0">{{remainTimeObject.days}}</span>
      <span class="unit" v-show="remainTimeObject.days > 0">{{currentFormat[0]}}</span>
      <span class="hours">{{remainTimeObject.hours}}</span>
      <span class="unit">{{currentFormat[1]}}</span>
      <span class="minutes">{{remainTimeObject.minutes}}</span>
      <span class="unit">{{currentFormat[2]}}</span>
      <span class="seconds">{{remainTimeObject.seconds}}</span>
      <span class="unit">{{currentFormat[3]}}</span>
    </template>
    <template v-else>
      <span class="hours">{{padStart(Number(remainTimeObject.days) * 24 + Number(remainTimeObject.hours))}}</span>
      <span class="unit">{{currentFormat[1]}}</span>
      <span class="minutes">{{remainTimeObject.minutes}}</span>
      <span class="unit">{{currentFormat[2]}}</span>
      <span class="seconds">{{remainTimeObject.seconds}}</span>
      <span class="unit">{{currentFormat[3]}}</span>
    </template>
  </span>
</template>
<script>
export default {
  name: 'countDown',
  props: {
    now: {
      type: Number,
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    showDay: {
      type: Boolean,
      default: true
    },
    format: {
      type: Array
    },
    clearTime: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      current: this.now,
      remainTimeObject: {
        days: '',
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      currentFormat: ['天', '时', '分', '秒']
    }
  },
  watch: {
    target () {
      this.$nextTick(() => {
        this.countdown()
      })
    },
    now (val) {
      this.current = val
    }
  },
  created () {
    this.initFormat()
    this.countdown()
  },
  methods: {
    initFormat () {
      if (!this.format || this.format.length < 3) return
      this.format.forEach((item, index) => {
        let i = this.showDay ? index : (index + 1)
        this.currentFormat[i] = item
      })
    },
    countdown () {
      if (!this.target || !this.current) return
      let remainSeconds = Math.ceil((this.target - this.current) / 1000)
      this.remainTimeObject = this.calRemainTime(remainSeconds)
      if (remainSeconds > 0) {
        !this.clearTime && setTimeout(() => {
          this.current += 1000
          this.countdown()
        }, 1000)
      } else {
        this.$emit('end')
      }
    },
    calRemainTime (remainSeconds = 0) {
      const timeGap = remainSeconds > 0 ? remainSeconds : 0
      return {
        days: Math.floor(timeGap / 86400).toString(),
        hours: this.padStart(Math.floor((timeGap % 86400) / 3600)),
        minutes: this.padStart(Math.floor((timeGap % 3600) / 60)),
        seconds: this.padStart(timeGap % 60)
      }
    },
    padStart (num) {
      return num.toString().padStart(2, '0')
    }
  }
}
</script>
