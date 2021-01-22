<template>
  <div class="year-bill-popup">
    <van-popup v-model="showYearBillPopup" closeable @close="showYearBillPopup = false">
      <div class="wrap">
        <img @click="toPage" src="../../assets/img/yearBill/popup.png" alt="">
        <div class="not-notice" @click="notNotice">不再提醒</div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import storage from 'utils/storage'
  export default {
    data () {
      return {
        showYearBillPopup: storage.getLocal('showYearBillPopup', true)
      }
    },
    created () {

    },
    mounted () {
    },
    methods: {
      toPage() {
        storage.setLocal('showYearBillPopup', false)
        this.$router.push({name: 'yearBill'})
      },
      notNotice() {
        storage.setLocal('showYearBillPopup', false)
        this.showYearBillPopup = false
      }
    }
  }
</script>
