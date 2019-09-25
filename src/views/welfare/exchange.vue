<template>
  <div class="exchange">
    <no-data v-if="isNoData" type="exchange" text="空空如也，没有兑换记录哦！"></no-data>
    <div class="item-wrap" v-else>
      <div class="item">
        <div class="title">
          <div class="title-l">订单编号：238490283484484</div>
          <div class="title-r">下单成功</div>
        </div>
        <go-exchange></go-exchange>
      </div>
      <div class="item">
        <div class="title">
          <div class="title-l">订单编号：238490283484484</div>
          <div class="title-r">下单成功</div>
        </div>
        <go-exchange></go-exchange>
      </div>
    </div>
  </div>
</template>

<script>
  import goExchange from 'components/goExchange'
  import noData from 'components/noData'

  export default {
    components: { goExchange, noData },
    data() {
      return {
        isNoData: false
      }
    }
  }
</script>

<style scoped>

</style>
