<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import helper from 'utils/helper'

export default defineComponent({
  name: '',
  components: {},
  setup(props) {
    const route = useRoute()
    window.router = useRouter()
    // 设置主题
    helper.setTheme()
    // 修改标题
    watchEffect(() => {
      let title = route.meta ? route.meta.title : ''
      if (title) {
        helper.title(title)
      }
    })

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
