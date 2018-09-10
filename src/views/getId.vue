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
    }
  },
  computed: {},
  created () {
    this.$route.query.open_id && helper.saveIdInfo(this.$route.query)
    this.getIdMessage()
  },
  mounted () {
  },
  methods: {
    getIdMessage () {
      let ID = storage.getSession('ID', {})
      this.Http
        .connect(false)
        .post('entUser100705.json', { open_id: ID.open_id ? ID.open_id : '' })
        .then((data) => {
          if (data.ret_code === '0000') {
            storage.setSession('bank_list', data.bank_list)
            if (data.bind_status === '0') { // 未绑定
              this.$router.push({ name: 'bindIdCard' })
            } else {
              helper.saveIdInfo({ id_number_hash: data.id_number_hash })
              if (data.data_list.length > 0) {
                this.setSessionData(data.data_list)
              }
              this.getOtherInfo()
            }
          }
        })
    },
    setSessionData (dataList) {
      storage.setSession('institution', dataList)
      let recentDate = ''
      let recentEntId = ''
      dataList.forEach((item) => {
        if (Number(item.create_date) > Number(recentDate)) {
          recentDate = item.create_date
          recentEntId = item.ent_id
        }
      })
      storage.removeSession(recentEntId + 'ManagerInfo')
      storage.setSession('recent_date', recentDate)
      helper.saveIdInfo({ ent_id: recentEntId })
    },
    getOtherInfo () {
      let query = this.$route.query
      if (query.entrance === 'menu') {
        storage.setSession('entrance', 'menu')
        this.getKey('home')
      } else {
        if (query.plan_id && query.group_id) {
          this.getKey('billIndex')
        } else {
          if (query.open_id) {
            this.$router.push({ name: 'feedBack' })
          } else {
            this.getKey('home')
          }
        }
      }
    },
    getKey (routerName) {
      let ID = storage.getSession('ID', {})
      let openId = ID.open_id ? ID.open_id : ''
      this.Http
        .connect(false)
        .post(sysConfig.main_key_url, { head_osnumber: openId })
        .then((data) => {
          if (data.ret_code === '0000') {
            let mainKey = data.base_key
            this.Http
              .connect(false)
              .post(sysConfig.work_key_url, { head_osnumber: openId })
              .then((item) => {
                if (item.ret_code === '0000') {
                  storage.setSession('mKey', mainKey)
                  storage.setSession('wKey', item)
                  this.$router.push({ name: routerName })
                }
              })
          }
        })
    }
  },
  components: {}
}
</script>
