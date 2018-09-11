<template>
  <div class="get-id-page">
    <div class="loading-wrap">
      <img src="../assets/img/loading.gif" alt="" class="loading-img">
      <p class="loading-text">加载中</p>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      openId: this.$route.query.openId,
      userInfo: {}
    }
  },
  computed: {},
  created () {
    this.initUserInfo()
    this.isBind()
    this.getIdMessage()
  },
  methods: {
    initUserInfo () {
      if (this.openId) {
        this.userInfo = this.$route.query
        helper.saveUserInfo(this.userInfo)
      }
    },
    isBind () {
      this
        .$Roll
        .isBind()
        .then((res) => {
          let data = res.data
          storage.setSession('bankList', data.bankList)
          if (data.bindStatus === '0') {
              this.$router.push({ name: 'bindIdCard' })
          } else {
            helper.saveUserInfo({ idNumber: data.idNumber })
            data.dataList.length && this.setSessionData(data.dataList)
            this.toPage()
          }
        })
    },
    setSessionData (dataList) {
      storage.setSession('institutionList', dataList)
      let recentDate = dataList[0].createDate
      let recentEntId = recentEntId[0].entId
      storage.removeSession(recentEntId + 'ManagerInfo')
      storage.setSession('recentDate', recentDate)
      helper.saveUserInfo({ entId: recentEntId })
    },
    toPage () {
      if (this.userInfo.entrance === 'menu') {
        storage.setSession('entrance', 'menu')
        this.$router.push({ name: 'home' })
      } else {
        if (this.userInfo.planId && this.userInfo.groupId) {
          this.$router.push({ name: 'billIndex' })
          return
        }
        if (this.userInfo.openId) {
          this.$router.push({ name: 'feedBack' })
          return
        }
        this.$router.push({ name: 'home' })
      }
    }
  },
  components: {}
}
</script>
