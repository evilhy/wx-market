<template>
  <!-- 喜闻乐见 -->
  <div class="elife-index-page">
  </div>
</template>
<script>
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
          if (data.join === 1) {
            this.postElife(data)
          } else {
            let { name = '', phone = '' } = data 
            this.$router.replace({ name: 'elifeLogin', query: { name, phone } })
          }
        })
    }
  },
  components: {
  }
}
</script>