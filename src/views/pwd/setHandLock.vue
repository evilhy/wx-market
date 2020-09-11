<template>
  <set-hand-lock-cmp :title-arr="titleArr"></set-hand-lock-cmp>
</template>

<script>
import setHandLockCmp from './setHandLockCmp'
export default {
  data () {
    return {
      titleArr: ['输入手势密码', '再输入一次']
    }
  },
  created () { },
  methods: {
  },
  components: {
    setHandLockCmp
  }
}
</script>