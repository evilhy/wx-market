<template>
  <div class="bankcard-edit-page">
    <div class="tip" v-if="step === '1'">请输入您本人的银行卡</div>
    <van-cell-group>
      <van-field label="持卡人姓名"  v-model="userName" readonly />
      <van-field v-if="step==='2'" label="开卡行" v-model="issuerName" readonly />
      <van-field label="银行卡号" v-model="cardNo" type="digit" placeHolder="请输入持卡人本人的银行卡" maxlength="21" clear-trigger="always" clearable :readonly="step==='2'"/>
    </van-cell-group>
    <div class="btn-box">
      <van-button :color="cardNo ? '#00CCCC' : '#A8AAB2'" v-if="step === '1'" :loading="loading.step1" loading-text="校验中..." @click="checkCardBin">下一步</van-button>
      <van-button color="#00CCCC" plain v-if="step === '2'" :loading="loading.step2" loading-text="提交中..." @click="updBankCard">申请修改</van-button>
    </div>
  </div>
</template>

<script>
  import storage from 'utils/storage'
  import helper from 'utils/helper'
export default {
  data () {
    return {
      loading: {step1: false, step2: false},
      step: '1',
      userName: '',
      issuerName: '',
      cardNo: ''
    }
  },
  created () {
    let {cardNo, userName} = storage.getSession('currentBank')
    this.cardNo = cardNo
    this.userName = userName
  },
  methods: {
    async checkCardBin () {
      try {
        this.loading.step1 = true
        let res = await this.$Roll.checkCardBin(this.cardNo)
        this.step = '2'
        this.issuerName = res.data.issuerName
      } finally {
        this.loading.step1 = false
      }
    },
    async updBankCard () {
      try {
        this.loading.step2 = true
        await this.$Inside.updBankCard(this.cardNo)
        helper.toast('提交成功')
        this.$router.push({name: 'bankcardList'})
      } finally {
        this.loading.step2 = false
      }
    }
  },
  components: {
  }
}
</script>
