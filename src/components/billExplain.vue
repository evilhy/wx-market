<template>
  <mt-popup v-model="show" popup-transition="popup-fade" class="pop-dialog">
    <div class="content">
      <div class="main">
        <p>本年收入是按照工资/明细条发放日（资金实际入账日）汇总，即18年1月份推送的17年12月份的工资条，也算18年的收入。</p>
        <p>本年收入不包含报销和不发工资/明细条的收入。</p>
      </div>
      <button class="blue-btn" @click="close">关闭</button>
    </div>
  </mt-popup>
</template>

<script>
export default {
  props: {
    show: false
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>


