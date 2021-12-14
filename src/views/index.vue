<template>
  <div class="">
    {{$filter.money(balance)}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import test from 'apis/test.js'

export default defineComponent({
  name: '',
  components: { },
  setup (props) {
    const balance = 1093333
    test.getData()
    return {
      balance
    }
  }
})
</script>

<style lang="scss" scoped></style>