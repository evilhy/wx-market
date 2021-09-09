<template>
  <div class="public-page choose-phone-page">
    <div class="content-wrap">
      <div class="big-title">身份绑定</div>
      <div class="tip">发现您在多个企业任职，请选择任意一项进行验证。</div>
      <div class="phone-list">
        <div @click="choosePhone(employee, index)" class="phone-item" :class="{ active: selectedIndex === index }" v-for="(employee, index) in employeeList" :key="index">
          <span class="group">{{ employee.entName }}</span>
          <span class="phone" v-if="employee.phoneStar">{{ employee.phoneStar }}</span>
          <span class="no-phone" v-else>无手机号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import helper from 'utils/helper'

export default {
  data() {
    return {
      employeeList: storage.getSession('employeeList', []),
      selectedIndex: -1
    }
  },
  created() {},
  mounted() {},
  methods: {
    choosePhone(item, index) {
      this.selectedIndex = index
      helper.saveUserInfo(item)
      if (item.phone) {
        this.$router.replace({ name: 'sendCode' })
      } else {
        this.$router.replace({ name: 'checkCardTail' })
      }
    }
  },
  components: {}
}
</script>
