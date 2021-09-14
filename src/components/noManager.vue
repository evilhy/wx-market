<template>
  <div class="no-manager">
    <div class="step-one step" v-if="step === '1'">
      <img src="../assets/img/icon-no-manager-one.png" alt="" class="img img-step-one" />
      <p class="tip">您的企业还未分配专属的客户经理</p>
      <button class="btn btn-green" @click="assignManager">催促分配</button>
    </div>
    <div class="step-two step" v-if="step === '2'">
      <img src="../assets/img/icon-no-manager-two.png" alt="" class="img img-step-two" />
      <p class="tip">您的申请已提交，我们会尽快处理！</p>
      <button class="btn btn-gray">已提交</button>
    </div>
  </div>
</template>
<script>
import storage from 'utils/storage'
import helper from 'utils/helper'

export default {
  data() {
    return {
      step: '',
      jsessionId: helper.getUserInfo('jsessionId', '')
    }
  },
  created() {
    this.getStep()
  },
  methods: {
    getStep() {
      this.step = storage.getSession(`${this.jsessionId}-no-manager`, '1')
    },
    assignManager() {
      this.$Manager.distribute().then((res) => {
        this.step = '2'
        storage.setSession(`${this.jsessionId}-no-manager`, '2')
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 3000)
      })
    }
  }
}
</script>
