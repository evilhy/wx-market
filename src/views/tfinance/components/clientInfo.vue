<template>
  <div class="info-field-wrap white-box">
    <div class="line-title">预约人信息确认</div>
    <div class="field">
      <span class="label">预约人</span>
      <span class="value">{{name}}</span>
    </div>
    <div class="field">
      <span class="label">身份证</span>
      <span class="value">{{idNumber}}</span>
    </div>
    <div class="field">
      <span class="label">手机号</span>
      <span class="value">{{phone | phoneStar}}</span>
      <span class="theme-color" @click="update">修改</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    idNumber: String,
    phone: String
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    update () {
      this.$emit('update')
    }
  }
}
</script>
