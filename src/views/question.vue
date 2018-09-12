<template>
  <div class="question-page">
    <textarea class="question-textarea" :placeholder="placeholder" maxlength="150" v-model="content" :disabled="disabled"></textarea>
    <button class="btn btn-green" :class="{'disabled': !content||disabled}" @click="sentQuestion" :disabled="!content||disabled">提交</button>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import helper from 'utils/helper'
export default {
  data () {
    return {
      idInfo: storage.getSession('ID'),
      disabled: true,
      content: '',
      placeholder: '',
      feedback: storage.getSession('feedback', '')
    }
  },
  mounted () {
    document.title = '我有疑问'
    this.disabled = !!this.feedback
    this.dealPlaceholder()
  },
  methods: {
    dealPlaceholder () {
      let query = this.$route.query
      if (this.feedback) {
        this.placeholder = this.feedback === '0' ? '' : this.feedback
      } else {
        let name = query.name ? query.name : ''
        let phone = query.phone ? query.phone : ''
        let spName = query.sp_name ? query.sp_name : ''
        this.placeholder = `${name}(${phone})请您在此输入对${spName}的疑问，限150字。`
      }
    },
    sentQuestion () {
      this.Http.connect(true).post('entUser100711.json', {
        open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
        plan_id: this.idInfo.plan_id ? this.idInfo.plan_id : '',
        group_id: this.idInfo.group_id ? this.idInfo.group_id : '',
        employee_feedback: this.content
      }).then((data) => {
        if (data.ret_code === '0000') {
          helper.toast('提交成功')
          setTimeout(() => {
            this.$router.replace({ name: 'wageDetail' })
          }, 1000)
        }
      })
    }
  }
}
</script>
