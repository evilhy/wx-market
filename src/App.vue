<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  components: {},
  setup(props) {
    const route = useRouter()
    window.router = route

    onMounted(() => {
      document.body.addEventListener(
        'blur',
        () => {
          window.scrollTo(0, 0)
        },
        true
      )
    })
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
