<template>
<div class="ents-select-wrap">
  <div class="current-ent" @click="toggle">
    <span class="ent-name">{{current.entName}}</span>
    <i class="iconfont icon-sanjiaoxing-copy" :class="{open: open}"></i>
  </div>
  <div class="select-list" v-if="open">
    <div class="select-item" v-for="(ent, index) in entList" :key="index" @click="selectEnt(index)">{{ent.entName}}</div>
  </div>
  <div class="mask" v-show="open" @click="toggle"></div>
</div>
</template>

<script>
export default {
  props: {
    entList: Array
  },
  data () {
    return {
      current: {},
      open: false,
      selectIndex: 0
    }
  },
  created () {
    this.entList.length && this.selectEnt()
  },
  methods: {
    selectEnt (index = this.selectIndex) {
      this.selectIndex = index
      this.current = this.entList[index]
      this.$emit('select', index)
      this.open = false
    },
    toggle () {
      this.open = !this.open
    }
  }
}
</script>