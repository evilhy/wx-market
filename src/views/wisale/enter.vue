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
    window.location.replace(`${sysConfig.wisaleSquareUrl[process.env.NODE_ENV]}?channel=WAGE`)
  },
  methods: {}
}
</script>