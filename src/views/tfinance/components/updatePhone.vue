<template>
  <div class="update-phone-wrap">
    <div class="content">
      <div class="title">请输入新的手机号</div>
      <input class="input" type="tel" maxlength="11" v-model="currentPhone">
      <div class="action-wrap">
        <div class="action-item cancel">取消</div>
        <div class="action-item sure" @click="sure">确定</div>
      </div>
    </div>
    <div class="mark"></div>
  </div>
</template>
<script>
import validate from 'utils/validate'
import helper from 'utils/helper'
export default {
  props: {
    phone: String
  },
  data () {
    return {
      currentPhone: ''
    }
  },
  watch: {
    phone (val) {
      this.currentPhone = val
    }
  },
  created () {
    this.currentPhone = this.phone
  },
  methods: {
    sure () {
      if (!validate.isPhone(this.currentPhone)) {
        helper.toast('请输入正确的手机号')
        return false
      }
      this.$emit('sure', this.currentPhone)
    }
  }
}
</script>