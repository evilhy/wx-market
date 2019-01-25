<template>
  <div class="choose-ent-action">
    <div class="mask" @click="open = false" v-show="open"></div>
    <div class="action-box" :class="{open: open}">
      <div class="phone-item" :class="{ active:  currentEnt.entId === item.entId, disabled: !item.phone }" v-for="(item, index) in list"
        :key="index" @click="chooseEnt(item)" >
        <span class="group">{{item.entName}}</span>
        <span class="phone" v-if="item.phone">{{item.phone}}</span>
        <span class="no-phone" v-else>无手机号</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      currentEnt: {},
      open: false
    }
  },
  created () {
    this.getEntList()
  },
  methods: {
    async getEntList () {
      let res = await this.$Roll.entPhone()
      this.list = res.data
      this.initCurrentEnt()
    },
    openAction () {
      this.open = true
    },
    initCurrentEnt () {
      let list = this.list
      for (let item of list) {
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
    chooseEnt (item) {
      if (!item.phone) { return false }
      this.currentEnt = item
      this.$emit('select', item)
      this.open = false
    }
  }
}
</script>