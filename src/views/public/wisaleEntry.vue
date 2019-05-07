<template>
  <div class="wisale-entry-page">
    <loading></loading>
  </div>
</template>

<script>
import loading from 'components/loading'
import sysConfig from 'src/utils/constant'

export default {
  data () {
    return {
      wisaleH5Url: sysConfig.wisale_h5_url[sysConfig.node_env]
    }
  },
  created () {
    window.location.replace(`${this.wisaleH5Url}?channel=WAGE`)
  },
  methods: {},
  components: {
    loading
  }
}
</script>