<template>
  <div class="bank-item" :class="{'todo' :currentBank.cardUpdStatus === 0}">
    <div class="bank-name">{{currentBank.issuerName}}<span class="list-btn" @click="toHistory"><img src="../../assets/img/user/icon-bankcard-list.png" class="icon">更换记录<span class="dot" v-if="currentBank.isNew"></span></span></div>
    <div class="bank-no" v-show="!editing">{{currentBank.cardNo | bankSpace}}
      <span class="modify-btn disabled" v-if="currentBank.cardUpdStatus === 0">申请更换</span>
      <span class="modify-btn" @click="startEdit(currentBank.cardNo)" v-else>申请更换</span>
    </div>
    <div class="bank-no editing" v-show="editing">
      <input class="input" type="tel" v-model.trim="currentBank.cardNo">
      <i class="icon iconfont icon-Close" @click="currentBank.cardNo = ''" v-if="currentBank.cardNo"></i>
    </div>
    <div class="action-wrap" v-show="editing">
      <span class="modify-btn" @click="cancelEditing">取消</span><span class="modify-btn" @click="modifySave">保存</span>
    </div>
    <div class="group" v-show="!editing">
      <span class="group-name">所属机构：{{collect.getValueList(currentBank.bankCardGroups, 'shortGroupName').join('/')}}</span>
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