<template>
  <van-form ref="zxForm">
    <van-field
      v-model.trim="form.name"
      name="name"
      label="客户姓名"
      placeholder="客户姓名"
      :rules="[{ required: true, message: '请填写客户姓名' }]"
    />
    <van-field
      v-model.trim="form.idType"
      name="idType"
      label="证件类型"
      placeholder="证件类型"
      :rules="[{ required: true, message: '请填写证件类型' }]"
    />
    <van-field
      v-model.trim="form.idNumber"
      name="idNumber"
      label="证件号码"
      placeholder="证件号码"
      :rules="[{ required: true, message: '请填写证件号码' }]"
    />
    <van-field
      v-model.trim="form.phone"
      name="phone"
      label="客户手机号"
      placeholder="客户手机号"
      :rules="[{ required: true, message: '请填写客户手机号' }]"
    />
    <van-field
      v-model.trim="form.uid"
      name="uid"
      label="uid"
      placeholder="uid"
      :rules="[{ required: true, message: '请填写uid' }]"
    />
    <van-field
      v-model.trim="form.openId"
      name="openId"
      label="openId"
      placeholder="openId"
      :rules="[{ required: true, message: '请填写openId' }]"
    />
    <van-field
      v-model.trim="form.nickname"
      name="nickname"
      label="微信昵称"
      placeholder="微信昵称"
      :rules="[{ required: true, message: '请填写微信昵称' }]"
    />
    <van-field
      v-model.trim="form.headimgurl"
      name="headimgurl"
      label="微信头像"
      placeholder="用户微信头像"
      :rules="[{ required: true, message: '请填写微信头像' }]"
    ></van-field>
    <van-field
      v-model.trim="form.appPartner"
      name="appPartner"
      label="	合作商标识"
      placeholder="合作商标识"
    />
    <!-- <van-field v-model.trim="form.dataAuths" label="数据权限" placeholder="数据权限" /> -->
    <van-field
      v-model.trim="form.registerType"
      name="registerType"
      label="注册类型"
      placeholder="注册类型"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit">提交</van-button>
      <van-button round block type="primary" @click="reset"
        >清除默认数据</van-button
      >
    </div>
  </van-form>
</template>

<script>
import sysConfig from 'src/utils/constant'
import helper from 'utils/helper'
import { typeOf } from 'utils/assist'
let HttpEngine = (require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`)).default
export default {
  data() {
    return {
      form: {
        name:
          'abzxohrS1tb2bqpPbFV7BV6vBtiaH5uiD2Rg4YgRKjGSM+YAur/UQj9AAp0cgANUKILXi0Mamof+zP97J/Ki3YENvFrveA1NdBBE+Igv0ZZlAKE02oONzDgjsQSbcwJ2w06MmAd/VbyEB/nNGoxsENf9/4am6xKNq+M9zYXaYCw\u003d',
        idType:
          'Db1ll2c/SkHr0vHVAi57vzitkNSKqn6NPbxJ0TDNCRzGAphn6U6cPSJW7WwZDLri+iEpBum6OUIaMkMKzcitL7SZD/2rrkxTHjMjU/unJQBurqw/pTjzoIjGWR+iryliPC5kW1YOvPMjLSyZrLivcgt/nF2jxHOTvWtFvtqlRUE\u003d',
        idNumber:
          'FGMm+81gQB0YLCGI1WgrpBhtYbFKidYGS3lnoeZWYhQ0aLNXotb8NFs9fGU/lagZ5sdNjr/of50J7QNeV6fyJfNiMpUT71EBGHSuwwaDoXzx2NUbOhwxClS4OUnMRHD/+ZJugkON2hlKQdyJpiXDOo2GcUIW9h5UkfDid9X64V8\u003d',
        phone:
          'ef/KFV9uZhb3VHGu8WH4NfeJ+NeJjPCO7IM/QHedyxTHG7dsW1D1ipPzcXOhJZ2dhl2fGJGVRMJ+3rrnXuHWyoS7eMXhm9Rmyf6sLLvU6nd7rjSNO3m3WLporMwO2uV5axMgGHEeXPz+gOvYd9SG+Emy4xYZZZJPp+++CSa3LB4\u003d',
        uid:
          'g4RH4ns5/ocbEroxWDuqEk7kOM6FGfC1LUFcAde10BuPgOKMlSfDV5Phhsh9CMtk0nhM3dma8YZ84DqOLrTUhTVDtxGGIlh5WYR83uU06HK6gxxmkYXHVm5J3j1WGyKr3ImXjxMQ3iymep1KId/NnJjIhECiMUo/NNaz6ID263Y\u003d',
        openId:
          'BLwSIL+bjm8w8y0fNvc13ltmGQePAwNS7itZp2WZrP1f2Ynh7PtFUrNHQw04oeDbntvYiyqxhpsB+wG0H8rHWGVWbFJHKWatzd7looEpsOIn+ZW5JB1ILJe5y0CNwgt8whF2Hy7RUo80wJ5RXoqP7OMMI9RZKY0Rha3kTOuoLaw\u003d',
        nickname: '用户微信昵称',
        headimgurl:
          'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLGZicQDuRPCCcFEFEN72qnAgVGJ99JMmegLMTknEpaSGbVzo2aweUSCkC0reicqhpZOWABEoTqahmA/132',
        appPartner: 'NEWUP',
        dataAuths: ['NEWUP'],
        registerType: 'UUID'
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    async onSubmit() {
      const res = await this.query({ ...this.form })
      window.location.href = `${
        sysConfig.proBaseUrl[process.env.NODE_ENV]
      }token?accessToken=${res.data.accessToken}`
    },
    query(params) {
      const http = new HttpEngine()
      http.path = `${
        sysConfig.httpBaseUrl[process.env.NODE_ENV]
      }/merchant/getAccess`
      http.requestedSever = true
      http.body = { ...params }
      http.headers = {
        appid: 'wx0345ad9614fe9567',
        clientSn: '123456789987654321',
        clientDate: '20200820',
        clientTime: 1597852800000,
        signature:
          'QVBJZEdDek8vVFdOcGt4cDJnaFVpZDdsdStvOUVlcmJkWjhyc1oxOWJlVmd1OTZQb1JKdEZWR2xQZ0tRZmEra2FDcWZuWHJhbTk4d055Q3diSmFLT3oyZ0Q4WVBjUkVwMmVKVktEU0d6VjVsdXdGeGJVaStyWGFZVDEva21iVWNta3JzZCtmVjh3Y2hlTXVXN1d6ZVM0a0hCYWhxSTZzeDRpeFh3ZG1Eb2tZPQ==',
        version:
          'HucfxfT4bXNKKbl7sJKugg6j/IEtOhKDE2X6qfK9S2iolMAoumsqSu5KczALixlGxtVBdyZlyqY+1wzOJ7DzldtZZPLhQVfTzbpBY4/mYoIsd0nZKw5vFMnHp1UVYmRjcEdhTwjOOfQR9767U8aCXtlRaDNDQlWjzsx1aD+t1Cs='
      }
      http.afterRejectResponseHandler = error => {
        let errorMsg = error.message
        if (errorMsg === 'Network Error') {
          errorMsg = '网络异常'
        }
        if (errorMsg.indexOf('timeout') >= 0) {
          errorMsg = '请求超时'
        }
        let response = error.response
        if (typeOf(response) === 'object') {
          if (typeOf(response.data) === 'object') {
            errorMsg = response.data['error_msg']
          } else if (typeOf(response.data) === 'string') {
            errorMsg = response.data
          }
        }
        helper.toast(errorMsg)
      }
      return http.post()
    },
    reset() {
      this.form = {
        name: '',
        idType: '',
        idNumber: '',
        phone: '',
        uid: '',
        openId: '',
        nickname: '',
        headimgurl: '',
        appPartner: '',
        dataAuths: '',
        registerType: ''
      }
    }
  }
}
</script>
