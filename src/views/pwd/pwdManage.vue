<template>
  <div class="page pwd-manage-page">
    <div class="title">手势密码</div>
    <van-cell center title="设置手势密码">
      <template #right-icon>
        <van-switch :value="checked" :inactive-value="0" :active-value="1" @input="switchToggle" />
      </template>
    </van-cell>
    <div class="title">修改密码</div>
    <van-cell v-show="checked" title="修改手势密码" is-link :to="{ name: 'checkHandLock' }" />
    <van-cell title="修改查询密码" is-link
      :to="{ name: 'checkQueryCode', params: { name: 'setNewQueryCode' }, query: { backPage: 'pwdManage' } }" />
    <div class="tip">{{queryCodeTip}}，{{handLockTip}}。</div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import sysConfig from 'utils/constant'
import helper from '../../utils/helper'
export default {
  data () {
    return {
      checked: 0, // 是否开启手势密码
      queryCodeTip: sysConfig.queryCodeTip,
      handLockTip: sysConfig.handLockTip
    }
  },
  async created () {
    this.queryHandPassword()
  },
  methods: {
    async queryHandPassword () {
      let res = await this.$Password.queryHandPassword()
      this.checked = res.data.status
    },
    switchToggle (checked) {
      if (checked) {
        this.$router.push({ name: 'checkQueryCode', params: { name: 'setHandLock' } })
      } else {
        Dialog.confirm({
          title: '系统提醒',
          message: '关闭开关后，系统将清除您已设置的手势密码',
          confirmButtonText: '确定关闭',
          cancelButtonText: '我再想想'
        }).then(() => {
          this.closeHandLock()
        }).catch(() => { })
      }
    },
    async closeHandLock (action, done) {
      await this.$Password.closeHandPassword()
      this.checked = 0
      helper.saveUserInfo({ handPassword: 0 })
    }
  }
}
</script>