<template>
  <!-- 身份绑定-输入身份证 -->
  <div class="public-page page fill-id-card-page">
    <public-logo></public-logo>
    <div class="content-wrap">
      <div class="big-title">身份验证</div>
      <div class="field-wrap mt" @click="show = true">
        <img class="field-icon" src="../../assets/img/public/field-id-card.png" />
        <span class="id-card-span" :class="{placeholder: !idCard.length}">{{idCardShow}}</span>
        <van-number-keyboard :show="show" extra-key="X" @blur="show = false" @input="onInput"
          @delete="onDelete" />
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
      idCard: [],
      show: false
    }
  },
  computed: {
    idCardInput () {
      return this.idCard.join('')
    },
    idCardShow () {
      return this.idCard.length ? this.idCardInput : '请输入身份证号'
    }
  },
  created () { },
  methods: {
    onInput (value) {
      if (this.idCard.length >= 18) return
      this.idCard.push(value)
    },
    onDelete () {
      this.idCard.pop()
    },
    async getPhone () {
      let res = await this.$Roll.entEmp(this.idCardInput)
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
