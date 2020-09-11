<template>
  <div class="no-data-wrap">
    <img :src="require(`./img/no-${name}.png`)" alt="">
    <p class="text">{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    name: {
      type: String,
      default: 'data'
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>