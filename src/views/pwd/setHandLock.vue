<template>
  <div class="">
    <hand-lock @notEnough="notEnough" @finished="finished"></hand-lock>
  </div>
</template>

<script>
import handLock from 'components/handLock'
export default {
  data () {
    return {}
  },
  created () {},
  methods: {
    notEnough (res) {
      console.log('不足:', res)
    },
    finished (res) {
      console.log('完成:', res)
    }
  },
  components: {
    handLock
  }
}
</script>