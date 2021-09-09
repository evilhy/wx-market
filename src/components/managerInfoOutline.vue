<template>
  <div class="outline-info-wrap">
    <div class="manager-img">
      <img :src="managerInfo.avatarUrl" alt="" v-if="managerInfo.avatarUrl" class="img" />
      <img src="../assets/img/manager-default-avatar.png" alt="" class="img" v-if="!managerInfo.avatarUrl" />
    </div>
    <div class="manager-name">{{ managerInfo.managerName }}</div>
  </div>
</template>
<script>
export default {
  props: {
    managerInfo: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>
