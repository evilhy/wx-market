<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  components: {},
  setup(props) {
    window.router = useRouter()
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
