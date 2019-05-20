import helper from 'utils/helper'
export default {
  methods: {
    postElife (data) {
      this
        .$Elife
        .postElife(data)
        .then((res) => {
          let data = res.data
          if (data.ret_code === '0000') {
            window.location.replace(data.url)
          } else {
            helper.toast(data.ret_msg)
          }
        })
    },
    postElifeX (data) {
      this
        .$Elife
        .postElifeX(data)
        .then((res) => {
          let data = res.data
          if (data.ret_code === '0000') {
            window.location.replace(data.url)
          } else {
            helper.toast(data.ret_msg)
          }
        })
    }
    /* postElifeX () {
      this.$router.replace({ name: 'elifeXResult' })
    } */
  }
}