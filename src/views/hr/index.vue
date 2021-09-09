<template>
  <div class="hr-index-page"></div>
</template>

<script>
import { getPageQueryObject } from 'utils/assist'
import menuDic from './menuDic'

export default {
  data() {
    return {}
  },
  created() {
    let { url } = getPageQueryObject()
    url && window.location.replace(menuDic[url])
  },
  methods: {}
}
</script>
