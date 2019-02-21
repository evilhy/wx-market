<template>
  <div class="user-detail-page">
    <div class="box">
      <div class="title-wrap">
        <img class="icon" src="../../assets/img/user/icon-client.png" alt=""><span class="title">员工信息</span>
      </div>
      <div class="field"><span class="label">工号</span><span class="value">{{info.employeeNo}}</span></div>
      <div class="field"><span class="label">姓名</span><span class="value">{{info.employeeName}}</span></div>
      <div class="field"><span class="label">身份证</span><span class="value">{{info.idNumberStar}}</span></div>
      <div class="field"><span class="label">手机号</span><span class="value">{{info.phoneStar}}</span></div>
      <div class="field"><span class="label">职位</span><span class="value">{{info.position}}</span></div>
      <div class="field"><span class="label">入职日期</span><span class="value">{{info.entryDate | date('Y-m-d')}}</span></div>
      <div class="field"><span class="label">在职状态</span><span class="value">{{info.inServiceStatusVal}}</span></div>
    </div>
    <div class="box">
      <div class="title-wrap">
        <img class="icon" src="../../assets/img/user/icon-card.png" alt="">银行卡
      </div>
      <div class="field-2" v-for="(item, index) in info.bankCardList" :key="index">
        <div class="row"><span class="label">银行卡{{index+1}}</span><span class="value">{{item.bankCard | bankSpace}}</span></div>
        <div class="row bank-name">{{item.bankName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
export default {
  data () {
    return {
      info: { bankCardList: [] }
    }
  },
  created () {
    this.info = storage.getSession('userDetail', { bankCardList: [] })
  },
  methods: {}
}
</script>