<template>
  <div class="bind-id-card-page">
    <div class="logo-wrap">
      <img src="../assets/img/logo.png" alt="" class="logo" />
    </div>
    <div class="card-form">
      <input class="input id-card-input" type="text" maxlength="18" v-model="idCard" placeholder="请输入身份证绑定" />
      <button class="btn-green" :disabled="!idCard" @click="getPhone">下一步</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import helper from 'utils/helper'
import collect from 'utils/collect'
import { validIdCard } from 'utils/assist'
export default {
  data () {
    return {
      idCard: ''
    }
  },
  created () {
    helper.title('身份验证')
  },
  mounted () {
  },
  methods: {
    getPhone () {
      if (this.checkValue()) {
        this
          .$Roll
          .entEmp(this.idCard)
          .then((res) => {
            if (res.data.bindStatus === '0') {
              this.$router.replace({ name: 'idCardBinded' })
            } else {
              let employeeList = res.data.employeeList
              let telList = collect.getValueList(employeeList, 'phone').filter(item => item)
              if (telList.length === 1) {
                helper.saveUserInfo(collect.getItem(employeeList, 'phone', telList[0]))
                this.sendCode()
              } else if (telList.length > 1) {
                storage.setSession('employeeList', employeeList)
                this.$router.push({ name: 'choosePhone' })
              } else {
                this.$router.push({ name: 'phoneEmpty' })
              }
            }
          })
      }
    },
    checkValue () {
      if (!validIdCard(this.idCard)) {
        helper.toast('请输入正确的身份证号')
        return false
      } else {
        return true
      }
    },
    sendCode () {
      this
        .$Inside
        .sendCode()
        .then((res) => {
          helper.saveRemainTime()
          this.$router.push({name: 'sendCode'})
        })
    }
  }
}
</script>
