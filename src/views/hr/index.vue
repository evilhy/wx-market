<template>
  <div class="hr-index-page">
  </div>
</template>

<script>
import menuDic from './menuDic'
import { getPageQueryObject } from 'utils/assist'
export default {
  data () {
    return {}
  },
  created () {
    let { url } = getPageQueryObject()
    url && window.location.replace(menuDic[url])
  },
  methods: {}
}
</script>