<template>
  <div class="manager-msg-page">
    <msg-box :manager-info="managerInfo"></msg-box>
  </div>
</template>

<script>
import MsgBox from '../components/msgBox'

export default {
  props: {
    managerInfo: {
      type: Object,
      default() {
        return {
          cust_manager_name: '',
          cust_manager_id: '',
          avatar_url: ''
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    this.$parent.tabList[1].flag = '0'
  },
  methods: {},
  components: {
    MsgBox
  }
}
</script>
