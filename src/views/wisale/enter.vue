<template>
  <div class="wisale-enter-page">

  </div>
</template>

<script>
import sysConfig from 'utils/constant'
export default {
  data () {
    return {}
  },
  created () {
    window.location.replace(sysConfig.wisale_square_url[process.env.NODE_ENV])
  },
  methods: {}
}
</script>