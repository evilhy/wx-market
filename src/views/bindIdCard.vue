<template>
  <div class="bind-id-card-page">
    <div class="logo-wrap">
      <img src="../assets/img/logo.png" alt="" class="logo"/>
    </div>
    <div class="card-form">
      <input class="input id-card-input" type="text" maxlength="18" v-model="cardId" placeholder="请输入身份证绑定" />
      <button class="btn-green" :disabled="!cardId" @click="getPhone">下一步</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import helper from 'utils/helper'
import collect from 'utils/collect'
import { typeOf, validIdCard } from 'utils/assist'
export default {
  data () {
    return {
      cardId: ''
    }
  },
  created () {
  },
  mounted () {
    document.title = '身份验证'
  },
  methods: {
    getPhone () {
      if (!validIdCard(this.cardId)) {
        helper.toast('请输入正确的身份证号')
        return
      }
      this.Http
        .connect(false)
        .post('entUser100701.json', { id_number: this.cardId })
        .then((data) => {
          if (data.ret_code === '0000') {
            if (data.is_bind_id_number) {    // 此身份证已经被绑定了(别的微信号)
              this.$router.replace({ name: 'idCardBinded' })
            } else {
              let employeeList = data.employee_list    // 此身份证对应的多个公司,其中手机号可能为空
              if (typeOf(employeeList) !== 'array' || !employeeList.length) return false

              let telList = collect.getValueList(employeeList, 'phone_star').filter(item => item)
              if (telList.length === 1) {  // 发送验证码
                let employeeInfo = collect.getItem(employeeList, 'phone_star', telList[0])
                storage.setSession('employeeInfo', { id_number: this.cardId, ...employeeInfo })
                helper.saveIdInfo({ id_number_hash: employeeInfo.id_number_hash })
                this.$router.push({ name: 'sendCode' })
              } else if (telList.length > 1) {   // 选择手机号
                storage.setSession('employeeList', data.employee_list)
                this.$router.push({ name: 'choosePhone', query: { id_number: this.cardId } })
              } else {     // 提示手机号为空
                this.$router.push({ name: 'phoneEmpty' })
              }
            }
          }
        })
    }
  }
}
</script>
