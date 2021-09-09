<template>
  <!-- 喜闻乐见 -->
  <div class="elife-index-page"></div>
</template>
<script>
import { getPageQueryObject } from 'utils/assist'
import elife from 'mixins/elife'
import helper from '../../utils/helper'

export default {
  mixins: [elife],
  data() {
    return {
      query: {}
    }
  },
  created() {
    this.query = getPageQueryObject()
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$Elife.getUserInfo(this.query.code).then((res) => {
        const data = res.data
        helper.saveUserInfo({ jsessionId: data.jsessionId })
        if (data.join === 1) {
          this.postElife(data)
        } else {
          const { name = '', phone = '' } = data
          this.$router.replace({ name: 'elifeLogin', query: { name, phone } })
        }
      })
    }
  },
  components: {}
}
</script>
