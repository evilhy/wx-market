<template>
  <div class="question-page">
    <textarea class="question-textarea" placeholder="请您输入您的疑问" maxlength="150" v-model="msg"></textarea>
    <button class="btn btn-green" @click="sentQuestion" :class="{'disabled': !msg }" :disabled="!msg">提交</button>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import helper from 'utils/helper'
export default {
  data () {
    return {
      detailId: this.$route.params.detailId,
      msg: '',
      feedback: storage.getSession('feedback', '')
    }
  },
  created () {
    helper.title('我有疑问')
  },
  mounted () {
  },
  methods: {
    sentQuestion () {
      this
        .$Roll
        .receipt(this.detailId, 1, this.msg)
        .then(() => {
          this.$router.replace({ name: 'wageDetail' })
        })
    }
  }
}
</script>
