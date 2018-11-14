<template>
  <!-- 薪有所属 -->
  <div class="elife-xindex-page">
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
    this.query = getPageQueryObject()
    this.getXUSer()
  },
  methods: {
    async getXUSer () {
      let res = await this.$Elife.xuser(this.query.code)
      let { jsessionId, idNumber = '', phone = '', join } = res.data
      helper.saveUserInfo({ jsessionId })
      if (join === 1) {
        this.postElifeX(res.data, false)
      } else {
        this.$router.replace({ name: 'elifeXLogin', query: { idNumber, phone } })
      }
    }
  },
  components: {
    loading
  }
}
</script>