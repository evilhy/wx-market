<template>
  <div class="user-ents-page">
    <div class="ent" v-for="(ent, index) in entList" :key="index">
      <div class="ent-header" @click="toggle(ent)">
        <p class="ent-short-name">{{ent.shortEntName}}</p>
        <p class="ent-name">{{ent.entName}}</p>
        <i class="iconfont icon-liebiaozhankai" v-show="!ent.fold"></i>
        <i class="iconfont icon-liebiaoshouqi" v-show="ent.fold"></i>
      </div>
      <div class="ent-groups" :class="{fold: ent.fold}">
        <div class="group-item" v-for="(group, index) in ent.items" :key="`group-${index}`" @click="enterDetail(group)">
          <div class="label">{{group.groupName}}</div>
          <div class="value" :class="{ gray: group.inServiceStatus !== '0' }">{{group.inServiceStatusVal}}</div>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
export default {
  data () {
    return {
      entList: []
    }
  },
  created () {
    this.getEnts()
  },
  methods: {
    async getEnts () {
      let res = await this.$Roll.empEnt()
      res.data.forEach(item => { item.fold = false })
      this.entList = res.data
    },
    toggle (ent) {
      ent.fold = !ent.fold
    },
    enterDetail (group) {
      storage.setSession('userDetail', group)
      this.$router.push({ name: 'userDetail' })
    }
  }
}
</script>