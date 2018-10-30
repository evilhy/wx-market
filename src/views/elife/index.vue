<template>
  <div class="elife-index-page">
    <loading></loading>
  </div>
</template>
<script>
import loading from 'components/loading'
import { getPageQueryObject } from 'utils/assist'
import helper from '../../utils/helper'
import elife from 'mixins/elife'
export default {
  mixins: [elife],
  data () {
    return {
      query: {}
    }
  },
  created () {
    helper.clearUserInfo()
    this.query = getPageQueryObject()
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this
        .$Elife
        .getUserInfo(this.query.code)
        .then((res) => {
          let data = res.data
          helper.saveUserInfo({ jsessionId: data.jsessionId })
          if (data.phone && data.name) {
            this.postElife(data, false)
          } else {
            this.$router.replace({ name: 'elifeLogin' })
          }
        })
    }
  },
  components: {
    loading
  }
}
</script>