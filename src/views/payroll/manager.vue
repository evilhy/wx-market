<template>
  <div class="manager-page">
    <!-- 有客户经理 -->
    <div class="has-manager" v-if="hasManager">
      <manager-info-outline :manager-info="managerInfo"></manager-info-outline>
      <manager-contact :manager-info="managerInfo"></manager-contact>
    </div>
    <!-- 无客户经理 -->
    <no-manager v-else></no-manager>
  </div>
</template>
<script>
import managerInfoOutline from 'components/managerInfoOutline'
import managerContact from 'components/managerContact'
import noManager from 'components/noManager'
import helper from 'utils/helper'
export default {
  data () {
    return {
      managerInfo: {
        managerName: '',
        avatarUrl: ''
      },
      hasManager: true
    }
  },
  created () {
    helper.title('华夏管家')
    this.getManagerInfo()
  },
  methods: {
    getManagerInfo () {
      this
        .$Manager
        .managerInfo()
        .then((res) => {
          if (res.data.id) {
            this.managerInfo = res.data
          } else {
            this.hasManager = false
          }
        })
    }
  },
  components: {
    managerInfoOutline,
    managerContact,
    noManager
  }
}
</script>
