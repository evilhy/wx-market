<template>
  <van-popup v-model:show="show" round close-on-popstate position="bottom">
    <van-area ref="van-area" :area-list="areaList" @confirm="confirm" @cancel="cancel" />
  </van-popup>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: '',
  components: {},
  data() {
    return {
      show: false,
      areaList
    }
  },
  created() {},
  mounted() {},
  methods: {
    open(code = '') {
      this.show = true
      this.$nextTick(() => {
        this.$refs['van-area'].reset(code)
      })
    },
    confirm(resultArr) {
      this.show = false
      this.$emit('select', resultArr)
    },
    cancel() {
      this.show = false
    }
  }
}
</script>
