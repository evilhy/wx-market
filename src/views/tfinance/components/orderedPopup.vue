<template>
  <popup-page title="" ref="ordered-popup" class="ordered-popup" @close="showFlag = false">
    <colleague-ordered type="all" v-if="showFlag"></colleague-ordered>
  </popup-page>
</template>
<script>
import popupPage from './popupPage'
import colleagueOrdered from './colleagueOrdered'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.$refs['ordered-popup'].show()
      this.showFlag = true
    }
  },
  components: {
    popupPage,
    colleagueOrdered
  }
}
</script>