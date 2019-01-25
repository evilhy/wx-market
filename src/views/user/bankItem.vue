<template>
  <div class="bank-item">
    <div class="bank-name">{{currentBank.issuerName}}</div>
    <div class="bank-no" v-show="!editing">{{currentBank.cardNo | bankSpace}}<span class="modify-btn" @click="startEdit(currentBank.cardNo)">修改</span></div>
    <div class="bank-no editing" v-show="editing"><input class="input" type="tel" v-model.trim="currentBank.cardNo"><span
        class="modify-btn" @click="cancelEditing">取消</span><span class="modify-btn" @click="modifySave">保存</span></div>
    <div class="group">
      <span class="group-name">所属机构：{{collect.getValueList(currentBank.bankCardGroups, 'shortGroupName').join('/')}}</span>
      <span class="list-btn" @click="toHistory"><img src="../../assets/img/user/icon-bankcard-list.png" class="icon">修改记录</span>
    </div>
  </div>
</template>

<script>
import { deepCopy } from 'utils/assist'
import helper from 'utils/helper'
import collect from 'utils/collect'
import storage from 'utils/storage'
export default {
  props: {
    bank: Object
  },
  data () {
    return {
      editing: false,
      currentBank: deepCopy(this.bank),
      tempCardNo: '',
      collect: collect
    }
  },
  watch: {
    bank (val) {
      this.editing = false
      this.currentBank = deepCopy(val)
    }
  },
  created () { },
  methods: {
    startEdit (cardNo) {
      this.editing = true
      this.tempCardNo = cardNo
    },
    cancelEditing () {
      this.editing = false
      this.currentBank.cardNo = this.tempCardNo
    },
    modifySave () {
      let currentBank = this.currentBank
      if (!currentBank.cardNo) {
        helper.toast('请输入银行卡号')
        return false
      }
      this.modifyCardNo()
    },
    async modifyCardNo () {
      let { currentBank, tempCardNo } = this
      try {
        await this.$Inside.updBankCard(currentBank)
        this.editing = false
        this.$emit('saveSuccess')
      } catch (e) {
        currentBank.cardNo = tempCardNo
      }
    },
    toHistory () {
      let ids = collect.getValueList(this.currentBank.bankCardGroups, 'id')
      storage.setSession('ids', ids)
      this.$router.push({ name: 'bankcardHistory' })
    }
  }
}
</script>