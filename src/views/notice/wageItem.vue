<template>
  <div class="notice-item">
    <div class="header">
      <div class="type"><img src="../../assets/img/icon-notice-003.png" alt=""><span class="dot red"
          v-if="!item.readFlag"></span></div>
      <span class="time">{{item.crtDateTime | date}}</span>
    </div>
    <div class="content" v-html="item.newsContent">
    </div>
    <div class="footer" @click="enterPayroll">查看资金详情
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    enterPayroll () {
      if (helper.getUserInfo('ifPwd', 0)) { // 有密码
        let wageSheetId = this.item.detailId
        if (helper.checkFreeLogin()) { // 近期输入过密码
          this.$router.push({ name: 'wageIndex', params: { wageSheetId } })
        } else {
          this.$router.push({ name: 'loginByPwd', query: { nextPage: 'wageIndex', wageSheetId } })
        }
      } else { // 设置查询密码
        this.$router.push({ name: 'setQueryCode' })
      }
    }
  }
}
</script>