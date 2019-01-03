<template>
  <mt-popup v-model="visible" popup-transition="popup-fade" class="explain-popup">
    <div class="header"><span class="title">{{titleInfo[type]}}</span><img class="close" src="../../assets/img/tax/icon-close.png" alt="" @click="visible=false"></div>
    <component :is="`${type}Explain`" v-if="type"></component>
  </mt-popup>
</template>
<script>
import childExplain from './child-explain'
import learnExplain from './learn-explain'
import houseLoanExplain from './houseLoan-explain'
import rentExplain from './rent-explain'
import parentExplain from './parent-explain'
import illnessExplain from './illness-explain'
export default {
  name: 'explain-popup',
  props: {
    type: String
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    titleInfo () {
      return {
        child: '子女教育',
        learn: '继续教育',
        houseLoan: '住房贷款利息',
        rent: '住房租金',
        parent: '赡养老人',
        illness: '大病医疗'
      }
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  },
  components: {
    childExplain,
    learnExplain,
    houseLoanExplain,
    rentExplain,
    parentExplain,
    illnessExplain
  }
}
</script>