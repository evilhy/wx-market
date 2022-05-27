<template>
  <div></div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
  components: {},
  setup(props) {
    const data = reactive({})
    const refs = reactive({})
    return {
      ...toRefs(data),
      ...toRefs(refs)
    }
  }
})
</script>

<style lang="scss" scoped></style>
