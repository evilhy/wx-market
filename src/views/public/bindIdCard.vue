<template>
  <!-- 身份绑定-输入身份证 -->
  <div class="public-page page fill-id-card-page">
    <public-logo></public-logo>
    <div class="content-wrap">
      <div class="big-title">身份验证</div>
      <div class="field-wrap mt">
        <img class="field-icon" src="../../assets/img/public/field-id-card.png" />
        <input class="input id-card-input" v-input maxlength="18" placeholder="请输入身份证号"
          v-model.trim="idCard" />
      </div>
      <button class="btn btn-next" :disabled="idCard.length < 6" @click="getPhone">下一步</button>
    </div>
  </div>
</template>

<script>
import publicLogo from 'components/publicLogo'
import storage from 'utils/storage'
import helper from 'utils/helper'
import collect from 'utils/collect'
export default {
  data () {
    return {
      idCard: ''
    }
  },
  created () { },
  methods: {
    async getPhone () {
      let res = await this.$Roll.entEmp(this.idCard)
      this.idCard = ''
      let { bindStatus, employeeList } = res.data
      let telList = collect.getValueList(employeeList, 'phone').filter(item => item)
      let telLen = telList.length
      helper.saveUserInfo({ bindStatus })
      if (telLen === 0) {
        let { idNumber, employeeName } = employeeList[0]
        helper.saveUserInfo({ idNumber, employeeName })
        this.$router.replace({ name: 'checkCardTail' })
      } else if (telLen === 1) {
        helper.saveUserInfo(collect.getItem(employeeList, 'phone', telList[0]))
        this.$router.replace({ name: 'sendCode' })
      } else {
        storage.setSession('employeeList', employeeList)
        this.$router.replace({ name: 'choosePhone' })
      }
    }
  },
  components: {
    publicLogo
  }
}
</script>
