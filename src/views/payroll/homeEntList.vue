<template>
  <div class="business-toggle">
    <img class="icon" src="../../assets/img/icon-home-business.png" alt="">
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