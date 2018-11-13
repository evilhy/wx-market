<template>
  <div class="avator-wrap">
    <img :src="src || defaultAvator" alt="" class="img" :class="[{'border': border }, size]">
  </div>
</template>
<script>
export default {
  props: {
    src: String,
    border: Boolean,
    size: {
      type: String,
      default: 'normal',
      validator (val) {
        if (!['small', 'normal', 'large'].includes(val)) throw new RangeError('size的值必须为small、normal或large')
        return true
      }
    }
  },
  data () {
    return {
      defaultAvator: require('../../../assets/img/tfinance/avator-default.png')
    }
  }
}
</script>