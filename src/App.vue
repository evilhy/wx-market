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
    /* let arr1 = new Set()
    arr1.add(1)
    arr1.add(2)
    let arr2 = new Set()
    console.log(arr2)
    for (let i of arr2) {
      console.log(i)
    } */
    let arr1 = new Array(1, 2, 4)
    console.log(arr1)
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
