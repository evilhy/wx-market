<template>
  <van-dialog class-name="sign-dialog" v-model="visible" title="请手写签署您的姓名进行确认"
    show-cancel-button get-container="#app" :before-close="beforeClose">
    <van-button plain type="danger" size="small" @click="clear">清除重写
    </van-button>
    <div class="sign-box" ref="sign-box">
      <vue-esign v-if="esignVisible" ref="esign" :width="esignW"
        :height="esignH" :isCrop="true" :lineWidth="2" lineColor="#000000" />
    </div>
  </van-dialog> 
</template>

<script>
import helper from 'utils/helper'
export default {
  name: 'SignDialog',
  components: {},
  props: {
    id: String
  },
  data() {
    return {
      wageSheetId: this.$route.params.wageSheetId,
      visible: false,
      esignVisible: false,
      esignW: 0,
      esignH: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    open() {
      this.visible = true
      setTimeout(() => {
        let rect = this.$refs['sign-box'].getBoundingClientRect() || {}
        this.esignW = parseInt(rect.width)
        this.esignH = parseInt(rect.height)
        this.esignVisible = true
      }, 300)
    },
    async beforeClose(action, done) {
      if (action === 'confirm') {
        try {
          let res = await this.$refs.esign.generate()
          this.saveSigned(res, done)
        } catch (e) {
          helper.toast('请输入姓名')
          this.clear()
          done(false)
        }
      } else {
        this.clear()
        done()
      }
    },
    async saveSigned(res, done) {
      try {
        await this.$Roll.saveSigned(this.wageSheetId, this.id, res)
        await this.$Inside.receipt(this.id, 0)
        this.$emit('confirm', res)
        done()
      } catch (e) {
        done(false)
      }
    },
    clear() {
      this.$refs.esign.reset()
    }
  }
}
</script>
