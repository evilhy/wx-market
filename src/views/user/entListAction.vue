<template>
  <div class="choose-ent-action">
    <div class="mask" @click="open = false" v-show="open"></div>
    <div class="action-box" :class="{ open: open }">
      <div class="phone-item" :class="{ active: currentEnt.entId === item.entId, disabled: !item.phone }" v-for="(item, index) in list" :key="index" @click="chooseEnt(item)">
        <span class="group">{{ item.entName }}</span>
        <span class="phone" v-if="item.phoneStar">{{ item.phoneStar }}</span>
        <span class="no-phone" v-else>无手机号</span>
      </div>
    </div>
  </div>
</template>

<script>
import decryptInfo from 'utils/decryptInfo'

export default {
  data() {
    return {
      list: [],
      currentEnt: {},
      open: false
    }
  },
  created() {
    this.getEntList()
  },
  methods: {
    async getEntList() {
      const res = await this.$Roll.entPhone()
      this.list = decryptInfo(res.data, 'phone', 'idNumber')
      this.initCurrentEnt()
    },
    openAction() {
      this.open = true
    },
    initCurrentEnt() {
      const list = this.list
      for (const item of list) {
        if (item.phone) {
          this.currentEnt = item
          this.$emit('select', item)
          break
        }
      }
      if (!this.currentEnt.phone) {
        this.currentEnt = list[0]
        this.$emit('select', this.currentEnt)
      }
      this.open = false
    },
    chooseEnt(item) {
      if (!item.phone) {
        return
      }
      this.currentEnt = item
      this.$emit('select', item)
      this.open = false
    }
  }
}
</script>
