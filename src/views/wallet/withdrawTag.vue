<template>
  <van-tag :color="color">{{ desc }}</van-tag>
</template>

<script>
export default {
  name: 'WithdrawTag',
  components: {},
  props: {
    status: Number,
    desc: String
  },
  data() {
    return {}
  },
  computed: {
    color() {
      switch (this.status) {
        case 1:
          return '#12C465'
        case 2:
        case 4:
          return '#F4415F'
        case 3:
          return '#FF9124'
        default:
          return '#A8AAB2'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
