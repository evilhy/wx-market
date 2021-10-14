<template>
  <div class="page sign-attest-page">
    <no-data v-if="!signingList.length" name="sign" text="暂时没有需要签署的协议哦！"></no-data>
  </div>
</template>

<script>
import storage from 'utils/storage'
import noData from 'components/noData'
export default {
  name: '',
  components: { noData },
  data() {
    return {
      signParams: {},
      signingList: []
    }
  },
  created() {
    this.signParams = storage.getSession('signParams', {})
    this.getSigningList()
  },
  mounted() {},
  methods: {
    async getSigningList() {
      let res = await this.$Tax.signingList(this.signParams)
      this.signingList = res.data
    }
  }
}
</script>
