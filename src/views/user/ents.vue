<template>
  <div class="user-ents-page">
    <div class="ent-groups">
      <div class="group-item" v-for="(group, index) in ent.items" :key="`group-${index}`" @click="enterDetail(group)">
        <div class="label">{{ group.groupName }}</div>
        <div class="value" :class="{ gray: group.inServiceStatus !== '0' }">{{ group.inServiceStatusVal }}</div>
        <span class="arrow"></span>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'

export default {
  data() {
    return {
      ent: {}
    }
  },
  created() {
    this.getEnt()
  },
  methods: {
    async getEnt() {
      const res = await this.$Roll.empEnt()
      this.ent = res.data
    },
    enterDetail(group) {
      storage.setSession('userDetail', group)
      this.$router.push({ name: 'userDetail' })
    }
  }
}
</script>
