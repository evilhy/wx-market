<template>
  <div class="user-avatar">
    <img :src="headimgurl" alt="" v-if="headimgurl" />
  </div>
</template>

<script>
import helper from 'utils/helper'

export default {
  data() {
    return {
      headimgurl: helper.getUserInfo('headimgurl', '')
    }
  },
  created() {},
  methods: {}
}
</script>
