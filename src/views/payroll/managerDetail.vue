<template>
  <div class="manager-detail-page">
    <manager-info-box :manager-info="managerInfo"></manager-info-box>
    <div class="msg-box-wrap">
      <msg-box :manager-info="managerInfo"></msg-box>
    </div>
  </div>
</template>

<script>
import ManagerInfoBox from 'components/managerInfoBox'
import MsgBox from 'components/msgBox'
import storage from 'utils/storage'

export default {
  components: {
    ManagerInfoBox,
    MsgBox
  },
  data() {
    return {
      idInfo: storage.getSession('ID', {}),
      managerInfo: {}
    }
  },
  created() {
    this.getManagerInfo()
  },
  mounted() {},
  methods: {
    getManagerInfo() {
      if (storage.getSession(`${this.idInfo.ent_id}ManagerInfo`, '')) {
        this.managerInfo = storage.getSession(`${this.idInfo.ent_id}ManagerInfo`)
      } else {
        this.Http.connect(true)
          .post('entUser100797.json', {
            ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
          })
          .then((response) => {
            if (response.ret_code === '0000') {
              if (Object.keys(response.cust_manager_info).length) {
                this.managerInfo = response.cust_manager_info
                storage.setSession(`${this.idInfo.ent_id}ManagerInfo`, this.managerInfo)
              }
            }
          })
      }
    }
  }
}
</script>
