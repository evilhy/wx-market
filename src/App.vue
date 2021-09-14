<template>
  <div id="app">
    <vertical-screen-tip></vertical-screen-tip>
    <router-view />
  </div>
</template>

<script>
import verticalScreenTip from 'components/verticalScreenTip'
import helper from 'utils/helper'

export default {
  name: 'app',
  data() {
    return {
      theme: helper.getTheme()
    }
  },
  watch: {
    $route({ meta }) {
      let title = meta.title || '放薪管家'
      helper.title(title)
    }
  },
  created() {
    window.router = this.$router
    helper.setTheme(this.theme)
  },
  mounted() {
    document.body.addEventListener(
      'blur',
      () => {
        window.scrollTo(0, 0)
      },
      true
    )
  },
  methods: {},
  components: {
    verticalScreenTip
  }
}
</script>
