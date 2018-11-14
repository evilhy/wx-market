import helper from 'utils/helper'
export default {
  methods: {
    postElife (data, loading = true) {
      this
        .$Elife
        .postElife(data, loading)
        .then((res) => {
          let data = res.data
          if (data.ret_code === '0000') {
            window.location.replace(data.url)
          } else {
            helper.toast(data.ret_msg)
          }
        })
    },
    postElifeX (data, loading = true) {
      this.$router.replace({ name: 'elifeXResult' })
    }
  }
}