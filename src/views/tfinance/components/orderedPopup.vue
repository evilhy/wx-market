<template>
  <popup-page title="" ref="ordered-popup" class="ordered-popup">
    <div class="content">
      
    </div>
  </popup-page>
</template>
<script>
import popupPage from './popupPage'
export default {
  props: {
    buyStart: Number,
    buyEnd: Number
  },
  data () {
    return {}
  },
  methods: {
    show () {
      this.$refs['ordered-popup'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>