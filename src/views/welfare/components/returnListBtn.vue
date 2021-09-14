<template>
  <div class="return-list-btn" @click="returnList">返回列表</div>
</template>

<script>
export default {
  props: {
    activityId: String
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    returnList() {
      this.$router.replace({ name: 'welfareGoodsList', params: { activityId: this.activityId } })
    }
  }
}
</script>
