<template>
  <div class="business-toggle">
    <div class="logo"></div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="currentValue" :options="entList" @change="change" />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    entList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  },
  created () { },
  methods: {
    change (entId) {
      this.$nextTick(() => {
        this.$emit('change', entId)
      })
    }
  }
}
</script>