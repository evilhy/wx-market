<template>
  <div class="page pwd-manage-page">
    <div class="title">手势密码</div>
    <van-cell center title="设置手势密码">
      <template #right-icon>
        <van-switch :value="checked" @input="switchToggle" />
      </template>
    </van-cell>
    <div class="title">修改密码</div>
    <van-cell v-show="checked" title="修改手势密码" is-link :to="{ name: 'modifyHandLock' }"/>
    <van-cell title="修改查询密码" is-link :to="{ name: 'checkQueryCode', params: { name: 'setNewQueryCode' }, query: { backPage: 'pwdManage' } }"/>
    <div class="tip">{{queryCodeTip}}，{{handLockTip}}。</div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      checked: false,
      queryCodeTip: sysConfig.queryCodeTip,
      handLockTip: sysConfig.handLockTip
    }
  },
  created () { },
  methods: {
    switchToggle (checked) {
      if (checked) {
        this.$router.push({ name: 'setHandLock' })
      } else {
        Dialog.confirm({
          title: '系统提醒',
          message: '关闭开关后，系统将清除您已设置的手势密码',
          confirmButtonText: '确定关闭',
          cancelButtonText: '我再想想',
          beforeClose: this.beforeCloseHandLock
        }).catch(() => {})
      }
    },
    async beforeCloseHandLock (action, done) {
      if (action === 'confirm') {
        await this.$Roll.empEnt()
        done()
        this.checked = !this.checked
      } else {
        done()
      }
    }
  }
}
</script>